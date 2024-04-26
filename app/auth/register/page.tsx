'use client'
import RegisterForm from "@/components/forms/register-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RegisterProps {
  callbackUrl: string,
}

export default function Register({ callbackUrl }: RegisterProps) {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (session)
      router.push('/')
  })

  return (
    <div className="w-100 h-100 flex justify-center items-center">
      <div className="min-w-[350px] max-w-[500px] border shadow-sm p-5">
        <p className="text-2xl text-bold py-3">Create Account</p>
        <RegisterForm
          callbackUrl={callbackUrl || "/"}
        />
      </div>
    </div>
  );
}