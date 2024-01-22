import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useLogin } from "@/api/auth";
import { FormCard } from "@/components/Auth";
import { FormInput, IconWrapper } from "@/components/custom";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAppContext } from "@/contexts/AppContext";
import { CloseCircle } from "iconsax-react";

interface LoginModalProp {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProp> = ({ isOpen, onClose }) => {
  const { onLoginModalClose, refetchUser } = useAppContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutateAsync: login, isLoading } = useLogin();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await login(values);
    refetchUser();
    onLoginModalClose();
  }

  const handleForgetPassword = () => {
    onLoginModalClose();
    navigate("/auth/forgot-password");
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-[600px] w-[98%] !px-4">
        <IconWrapper
          className="absolute top-2 right-2 bg-transparent cursor-pointer"
          onClick={onClose}
        >
          <CloseCircle size={35} />
        </IconWrapper>
        <FormCard className=" !max-w-none !p-2">
          <div className="space-y-7 mb-7">
            <h2 className="text-[30px] text-center text-dark">
              Welcome back 😊
            </h2>
            <p className="font-medium text-center text-text">
              Hey, 👋🏼 Enter your details below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              <FormInput
                name="username"
                label="Username"
                control={control}
                placeholder="Enter username"
                errors={errors}
              />
              <FormInput
                name="password"
                label="Password"
                control={control}
                placeholder="Enter Password"
                errors={errors}
                type="password"
              />

              <div
                className="font-semibold cursor-pointer text-end"
                onClick={handleForgetPassword}
              >
                Forgot Password?
              </div>

              <Button
                isLoading={isLoading}
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                Login
              </Button>

              <div className="flex items-center justify-center w-full gap-1 text-xs text-center">
                <p>Don’t have an account? </p>
                <Link to="/auth/signup" className="font-bold">
                  Signup now
                </Link>
              </div>
            </form>
          </Form>
        </FormCard>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginModal;
