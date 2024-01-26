import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import baseUrl from "./baseUrl";
import { loginSchema, signupSchema } from "@/schemas/AuthSchema";
import { z } from "zod";
import { useAuthContext } from "@/providers/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { useForgotPasswordContext } from "@/providers/ForgotPasswordProvider";
import { useSettingsContext } from "@/providers/SettingsProvider";
import config from "@/utils/config";

export const useRegister = () => {
  const navigate = useNavigate();
  // const { setEmail, email } = useAuthContext();

  let email = "";

  return useMutation(
    (values: z.infer<typeof signupSchema>) => {
      email = values.email;
      return axios
        .post(`${baseUrl}/user/register`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        localStorage.setItem(config.key.register_email, email);
        localStorage.setItem(config.key.timeout, res.data.timeLimit);
        navigate("/auth/otp", {
          // state: { email, timeLimit: res.data.timeLimit },
        });
      },
    }
  );
};

export const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    (values: z.infer<typeof loginSchema>) => {
      return axios
        .post(`${baseUrl}/user/login`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        if (res.code === "VERIFY-EMAIL") {
          navigate("/auth/otp", {
            state: { email: res.data.email, timeLimit: res.data.timeLimit },
          });
          //
        } else if (res.code === "2FA_REQUIRED") {
          navigate("/auth/2fa-login", {
            state: res.data,
          });
        } else {
          login(res.data);
          queryClient.invalidateQueries("user-profile");
        }
      },
    }
  );
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation(
    (values: OTPPayload) =>
      axios
        .post(`${baseUrl}/user/verify-email`, values)
        .then((res) => res.data),
    {
      onSuccess: () => {
        toast({
          title: "Success!",
          variant: "success",
          description: `Email verification successful`,
        });
        navigate("/auth/login");
      },
    }
  );
};

export const useChangePassword = () => {
  const { toast } = useToast();

  return useMutation(
    (values: ChangePasswordPayload) =>
      axios
        .patch(`${baseUrl}/user/change-password`, values)
        .then((res) => res.data),
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password has been changed",
          variant: "success",
        });
      },
    }
  );
};

export const useResendOTP = (email: string | null) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useQuery(
    ["resend-otp", email],
    () => {
      return axios
        .get(`${baseUrl}/user/resend-email-verification/${email}`)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        navigate("/auth/otp", {
          state: { email, timeLimit: res.data.timeLimit },
        });
        toast({
          title: "Success!",
          variant: "success",
          description: `Your OTP has been sent to ${email}`,
        });
      },
      enabled: !!email,
      retry: false,
    }
  );
};

export const useForgotPassword = (email: string | null) => {
  const { next, setResetPasswordData, resetPasswordData } =
    useForgotPasswordContext();

  return useQuery(
    ["forgot-password", email],
    () => {
      return axios
        .get(`${baseUrl}/user/forgot-password/${email}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        if (email) {
          setResetPasswordData({ ...resetPasswordData, email });
          next();
        }
      },
      enabled: !!email,
      retry: false,
    }
  );
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation(
    (values: ForgotPasswordCredentials) =>
      axios
        .post(`${baseUrl}/user/reset-password`, values)
        .then((res) => res.data),
    {
      onSuccess: () => {
        toast({
          title: "Success!",
          variant: "success",
          description: `Password reset successful`,
        });
        navigate("/auth/login");
      },
    }
  );
};

export const useGetUserProfile = () => {
  const { logout } = useAuthContext();
  return useQuery(
    ["user-profile"],
    (): Promise<UserData> => {
      return axios
        .get(`${baseUrl}/user/profile`)
        .then((res) => res.data.data[0]);
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        if (error?.response?.status === 401) {
          logout();
        }
      },
    }
  );
};

export const useUpdateProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: FormData) => {
      return axios
        .post(`${baseUrl}/user/update-profile`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user-profile");
        toast({
          title: "Success!",
          variant: "success",
          description: `Profile update successful`,
        });
      },
    }
  );
};

export const useEnable2fa = () => {
  const queryClient = useQueryClient();
  const { setActiveOption, setTimeLimit } = useSettingsContext();
  const { toast } = useToast();
  return useMutation(
    (values: TwoFactorAuthForm) => {
      return axios
        .put(`${baseUrl}/user/enable-2fa/${values?.type}/${values?.email}`, {})
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("user-profile");
        toast({
          title: "Success!",
          variant: "success",
          description: `A 2FA token has been sent to your email`,
        });
        setTimeLimit(res?.data?.timeLimit);
        setActiveOption("Verify 2FA OTP");
      },
    }
  );
};

export const useResend2faToken = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return axios
        .put(`${baseUrl}/user/resend-2fa-token/email`, {})
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user-profile");
        toast({
          title: "Success!",
          variant: "success",
          description: `A 2FA token has been sent to your email`,
        });
      },
    }
  );
};

export const useVerify2faToken = () => {
  const { toast } = useToast();
  const { setActiveOption } = useSettingsContext();
  const queryClient = useQueryClient();

  return useMutation(
    (values: string) => {
      return axios
        .put(`${baseUrl}/user/verify-2fa/${values}`, {})
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user-profile");
        setActiveOption("User Profile");
        toast({
          title: "Success!",
          variant: "success",
          description: `2FA Enabled`,
        });
      },
    }
  );
};

export const useDisable2fa = () => {
  const queryClient = useQueryClient();
  const { setActiveOption, setTimeLimit } = useSettingsContext();
  const { toast } = useToast();
  return useMutation(
    () => {
      return axios
        .put(`${baseUrl}/user/disable-2fa/`, {})
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("user-profile");
        toast({
          title: "Success!",
          variant: "success",
          description: `An OTP has been sent to your email`,
        });
        setTimeLimit(res?.data?.timeLimit);
        setActiveOption("Verify 2FA OTP");
      },
    }
  );
};

export const useVerifyDisable2faToken = () => {
  const { toast } = useToast();
  const { setActiveOption } = useSettingsContext();
  const queryClient = useQueryClient();

  return useMutation(
    (values: string) => {
      return axios
        .put(`${baseUrl}/user/disable-2fa/${values}`, {})
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user-profile");
        setActiveOption("User Profile");
        toast({
          title: "Success!",
          variant: "success",
          description: `2FA Disabled`,
        });
      },
    }
  );
};

export const useLogin2fa = () => {
  const { login } = useAuthContext();

  const { state } = useLocation();

  return useMutation(
    (values: TwoFALoginPayload) => {
      return axios
        .post(`${baseUrl}/user/twofa-login/`, values, {
          headers: { "x-2fa-session-id": state["x-2fa-session-id"] },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        login(res.data);
      },
    }
  );
};
