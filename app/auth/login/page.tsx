import LoginForm from "@/components/forms/login-form";


interface LoginProps {
  searchParams: {
    callbackUrl: string
  }
}

export default function Login({ searchParams: {
  callbackUrl }
}: LoginProps) {
  return (
    <div className="w-full min-h-100vh flex justify-center items-center">
      <div className="min-w-[350px] max-w-[500px]">
        <p className="text-2xl text-bold py-3">Login</p>
        <LoginForm callbackUrl={callbackUrl || "/"} />
      </div>
    </div>

  );
}