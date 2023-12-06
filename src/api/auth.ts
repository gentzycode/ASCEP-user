import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { loginSchema, signupSchema } from "@/schemas/AuthSchema";
import { z } from "zod";
import { useAuthContext } from "@/providers/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { useForgotPasswordContext } from "@/providers/ForgotPasswordProvider";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setEmail, email } = useAuthContext();

  return useMutation(
    (values: z.infer<typeof signupSchema>) => {
      setEmail(values.email);
      return axios
        .post(`${baseUrl}/user/register`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        navigate("/auth/otp", {
          state: { email, timeLimit: res.data.timeLimit },
        });
      },
    }
  );
};

export const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

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
        } else login(res.data);
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
