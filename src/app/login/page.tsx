import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="container-app py-12 md:py-20 flex items-center justify-center min-h-[calc(100dvh-57px)]">
      <Suspense>
        <AuthForm mode="login" />
      </Suspense>
    </div>
  );
}
