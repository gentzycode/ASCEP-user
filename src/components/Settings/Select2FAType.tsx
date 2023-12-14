import { useState } from "react";
import { Button } from "../ui/button";
import { useDisable2fa, useGetUserProfile } from "@/api/auth";

interface Select2FATypeProps {
  next: (args: number) => void;
}

export default function Select2FAType({ next }: Select2FATypeProps) {
  const [selected, setSelected] = useState<
    "email" | "authenticator app" | null
  >(null);
  const { data } = useGetUserProfile();

  const { mutate: disable, isLoading } = useDisable2fa();
  return (
    <div className="space-y-6 h-fit ">
      {data?.twoFA?.verified ? (
        <>
          <p className="text-sm text-dark">
            Two factor authentication is turned on{" "}
          </p>

          <div className="flex items-center justify-end">
            <Button
              onClick={() => disable()}
              className="px-20"
              isLoading={isLoading}
            >
              Disable 2FA
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-dark">
            Enable two step authentication to secure your account from unwanted
            access
          </p>
          <div className="flex gap-4">
            <Button
              className={`w-full ${
                selected === "email" ? "border-2 border-primary/50" : ""
              }`}
              variant="secondary"
              onClick={() => setSelected("email")}
            >
              Email Authentication
            </Button>

            <Button
              className={`w-full ${
                selected === "authenticator app"
                  ? "border-2 border-primary/50"
                  : ""
              }`}
              variant="secondary"
              onClick={() => setSelected("authenticator app")}
            >
              Authenticator App
            </Button>
          </div>

          <p className="text-sm text-subtle_text">
            A mail will be sent to your mail box fro validation
          </p>

          <div className="flex items-center justify-end">
            <Button
              disabled={selected === null}
              onClick={() => next(2)}
              className="px-20"
            >
              Enable 2FA
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
