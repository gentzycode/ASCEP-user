import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-center gap-3">
              {props.variant === "success" && (
                <div className="text-[#31D0AA] text-xl bg-[#31D0AA]/20 rounded-full p-2">
                  <FaCheckCircle />
                </div>
              )}
              {props.variant === "error" && (
                <div className="p-2 text-xl text-red-500 rounded-full bg-red-500/20">
                  <MdError />
                </div>
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
