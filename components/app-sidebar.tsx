"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Upload,
  BarChart3,
  HelpCircle,
  Home,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<{
    name: string
    email: string
    avatar: string
  } | null>(null)
  
  const supabase = React.useMemo(() => createClient(), [])

  // Define navigation items with dynamic active state
  const navMain = [
    {
      title: "Start hier",
      url: "/start",
      icon: Home,
      isActive: pathname === "/start",
    },
    {
      title: "Upload & context",
      url: "/upload",
      icon: Upload,
      isActive: pathname === "/upload",
    },
    {
      title: "Analyse & rapport",
      url: "/analyse",
      icon: BarChart3,
      isActive: pathname === "/analyse",
    },
    {
      title: "Veelgestelde vragen/uitleg",
      url: "/faq",
      icon: HelpCircle,
      isActive: pathname === "/faq",
    },
  ]

  // Fetch user data on mount and when pathname changes
  React.useEffect(() => {
    async function fetchUserData() {
      try {
        // Get current user from auth
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          setUser(null)
          return
        }

        // Fetch profile data
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, email")
          .eq("id", authUser.id)
          .single()

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "no rows returned", which is fine for new users
          console.error("Error fetching profile:", error)
        }

        // Use profile data if available, otherwise fall back to auth metadata
        const firstName = profile?.first_name || authUser.user_metadata?.first_name || ""
        const lastName = profile?.last_name || authUser.user_metadata?.last_name || ""
        const email = authUser.email || ""

        // Create full name
        const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Gebruiker"

        // Generate initials for avatar fallback
        const initials = [firstName, lastName]
          .filter(Boolean)
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "U"

        setUser({
          name: fullName,
          email: email,
          avatar: initials,
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUser(null)
      }
    }

    fetchUserData()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUserData()
    })

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Image
            src="/logo-blauw.svg"
            alt="Saldoo Logo"
            width={140}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser user={user} /> : null}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
