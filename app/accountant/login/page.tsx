import { AuthForm } from "@/components/auth-form"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { signup?: string; error?: string; oauth_success?: string; message?: string }
}) {
  const initialMode = searchParams.signup ? "signup" : "login"
  const errorMessage = searchParams.error
  const successMessage = searchParams.oauth_success && searchParams.message ? searchParams.message : null

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{
      backgroundImage: `
        linear-gradient(rgba(2, 55, 124, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(2, 55, 124, 0.06) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px'
    }}>
      <div className="w-full max-w-4xl">
        <AuthForm initialMode={initialMode} initialError={errorMessage} initialSuccess={successMessage} />
      </div>
    </div>
  )
}

