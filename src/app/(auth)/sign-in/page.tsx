import { SignInForm } from "@/components/auth/sign-in-form"
import Link from "next/link"


export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Welcome back</h1>
          <p className="text-muted-foreground text-balance">Sign in to your account to continue</p>
        </div>

        <SignInForm />

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
