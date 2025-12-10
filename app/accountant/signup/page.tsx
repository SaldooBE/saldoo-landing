import { redirect } from "next/navigation"

export default function SignupPage() {
  redirect("/accountant/login?signup=true")
}

