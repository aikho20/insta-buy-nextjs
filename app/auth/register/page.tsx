import RegisterForm from "@/components/forms/register-form";
import { signUpWithCredentials } from "@/lib/actions/auth.actions";

interface RegisterProps {
  callbackUrl: string,
}

export default function Register({ callbackUrl }: RegisterProps) {
  return (
    <div className="w-full min-h-100vh flex justify-center items-center">
      <div className="min-w-[350px] max-w-[500px]">
        <p className="text-2xl text-bold py-3">Create Account</p>
        <RegisterForm
          callbackUrl={callbackUrl || "/"}
          signUpWithCredentials={signUpWithCredentials}
        />
      </div>
    </div>
  );
}