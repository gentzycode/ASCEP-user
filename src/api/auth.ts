import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { signupSchema } from "@/schemas/AuthSchema";
import { z } from "zod";
import { useAuthContext } from "@/providers/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

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
