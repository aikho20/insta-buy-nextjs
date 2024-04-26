'use client'
import LoginForm from "@/components/forms/login-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface LoginProps {
  searchParams: {
    callbackUrl: string
  }
}

export default function Login({ searchParams: {
  callbackUrl }
}: LoginProps) {

  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (session)
      router.push('/')
  })

  return (
    <div className="w-full min-h-100vh flex justify-center items-center">
      <div className="min-w-[350px] max-w-[500px] border shadow-sm p-5">
        <p className="text-2xl text-bold py-3">Login</p>
        <LoginForm callbackUrl={callbackUrl || "/"} />
      </div>
    </div>

  );
}