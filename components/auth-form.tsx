"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export function AuthForm({
  className,
  initialMode = "login",
  initialError,
  initialSuccess,
  ...props
}: React.ComponentProps<"div"> & { 
  initialMode?: "login" | "signup"
  initialError?: string | null
  initialSuccess?: string | null
}) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const supabase = createClient()

  // Show error or success message from URL query params (e.g., from OAuth callback)
  useEffect(() => {
    if (initialError) {
      toast.error(decodeURIComponent(initialError))
      // Clean up URL
      router.replace('/login', { scroll: false })
    }
    if (initialSuccess) {
      toast.success(decodeURIComponent(initialSuccess))
      // Clean up URL
      router.replace('/login', { scroll: false })
    }
  }, [initialError, initialSuccess, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (mode === "signup") {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "Voornaam is verplicht"
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Achternaam is verplicht"
      }
      if (!formData.password) {
        newErrors.password = "Wachtwoord is verplicht"
      } else if (formData.password.length < 6) {
        newErrors.password = "Wachtwoord moet minimaal 6 tekens lang zijn"
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Bevestig je wachtwoord"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Wachtwoorden komen niet overeen"
      }
    }

    if (!formData.email) {
      newErrors.email = "E-mailadres is verplicht"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ongeldig e-mailadres"
    }

    if (mode === "login" && !formData.password) {
      newErrors.password = "Wachtwoord is verplicht"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      if (mode === "signup") {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Dit e-mailadres is al geregistreerd. Probeer in te loggen.")
            setMode("login")
          } else {
            toast.error(error.message || "Er is een fout opgetreden bij het registreren")
          }
          setLoading(false)
          return
        }

        if (data.user) {
          toast.success(
            "Registratie succesvol! Controleer je e-mail om je account te bevestigen.",
            {
              duration: 5000,
            }
          )
          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
        }
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Ongeldig e-mailadres of wachtwoord")
          } else if (error.message.includes("Email not confirmed")) {
            toast.error("Bevestig eerst je e-mailadres voordat je inlogt")
          } else {
            toast.error(error.message || "Er is een fout opgetreden bij het inloggen")
          }
          setLoading(false)
          return
        }

        if (data.user) {
          toast.success("Succesvol ingelogd!")
          router.push("/start")
          router.refresh()
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      toast.error("Er is een onverwachte fout opgetreden")
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: "google") => {
    setOauthLoading(provider)
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?mode=${mode}`,
        },
      })

      if (error) {
        toast.error(`Fout bij Google authenticatie: ${error.message}`)
        setOauthLoading(null)
      }
      // Note: If successful, the user will be redirected to the OAuth provider
      // and then back to /auth/callback, so we don't need to handle success here
    } catch (error) {
      console.error(`OAuth error (${provider}):`, error)
      toast.error(`Er is een fout opgetreden bij het inloggen met Google`)
      setOauthLoading(null)
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-2">
              <Image
                src="/icon-blauw.svg"
                alt="Saldoo Icon"
                width={140}
                height={140}
                priority
              />
            </div>
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">
                  {mode === "login" ? "Welkom terug" : "Maak je account"}
                </h1>
                <p className="text-muted-foreground text-balance">
                  {mode === "login"
                    ? "Log in met je Saldoo account."
                    : "Registreer hier je Saldoo account."}
                </p>
              </div>
              {mode === "signup" && (
                <Field className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel htmlFor="firstName">Voornaam</FieldLabel>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Jan"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      disabled={loading}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <FieldLabel htmlFor="lastName">Achternaam</FieldLabel>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Janssen"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      disabled={loading}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="email">E-mailadres</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@voorbeeld.be"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  disabled={loading}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </Field>
              <Field>
                {mode === "login" ? (
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Wachtwoord</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Wachtwoord vergeten?
                    </a>
                  </div>
                ) : (
                  <FieldLabel htmlFor="password">Wachtwoord</FieldLabel>
                )}
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  disabled={loading}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </Field>
              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Bevestig wachtwoord</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    disabled={loading}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                  )}
                </Field>
              )}
              <Field>
                <Button
                  type="submit"
                  style={{ backgroundColor: "rgba(2, 55, 124, 0.75)" }}
                  className="hover:opacity-90 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === "login" ? "Inloggen..." : "Registreren..."}
                    </>
                  ) : (
                    mode === "login" ? "Inloggen" : "Registreren"
                  )}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Of ga verder met
              </FieldSeparator>
              <Field className="grid grid-cols-1 gap-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  disabled={loading || oauthLoading !== null}
                  onClick={() => handleOAuthSignIn("google")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  {oauthLoading === "google" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="font-medium">
                        {mode === "login" ? "Inloggen" : "Registreren"} met Google
                      </span>
                    </>
                  )}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                {mode === "login" ? (
                  <>
                    Nog geen account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup")
                        setErrors({})
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: formData.email,
                          password: "",
                          confirmPassword: "",
                        })
                      }}
                      className="underline underline-offset-2 hover:no-underline"
                      disabled={loading}
                    >
                      Registreren
                    </button>
                  </>
                ) : (
                  <>
                    Al een account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login")
                        setErrors({})
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: formData.email,
                          password: "",
                          confirmPassword: "",
                        })
                      }}
                      className="underline underline-offset-2 hover:no-underline"
                      disabled={loading}
                    >
                      Inloggen
                    </button>
                  </>
                )}
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:flex items-center justify-center">
            <img
              src="/login-foto.png"
              alt="Saldoo Mini Login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="relative z-10 text-center px-8">
              <p className="text-xl font-bold text-white drop-shadow-lg">
                Analyseer je KMO zoals een boekhouder het zou doen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-4 text-center">
        Door door te gaan, ga je akkoord met onze <a href="#">Algemene Voorwaarden</a>{" "}
        en <a href="#">Privacybeleid</a>.
      </FieldDescription>
    </div>
  )
}
