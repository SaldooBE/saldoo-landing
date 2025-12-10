"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Message } from "@/lib/dummy-data"
import { formatNotificationDate } from "@/lib/dummy-data"
import { 
  Bell, 
  Clock, 
  CreditCard, 
  FileText, 
  MessageCircle, 
  User,
  Settings,
  X,
  type LucideIcon 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationDetailProps {
  notification: Message | null
  onClose?: () => void
}

const iconMap: Record<string, LucideIcon> = {
  Bell,
  Clock,
  CreditCard,
  FileText,
  MessageCircle,
  User,
}

export function NotificationDetail({ notification, onClose }: NotificationDetailProps) {
  if (!notification) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Selecteer een melding om details te bekijken</p>
      </div>
    )
  }

  const getIcon = (iconName?: string): LucideIcon => {
    if (iconName && iconMap[iconName]) {
      return iconMap[iconName]
    }
    return MessageCircle
  }

  const IconComponent = getIcon(notification.categoryIcon)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">
            {notification.senderName || notification.toClientName || 'Accountant'}
          </h2>
          {notification.phoneNumber && (
            <p className="text-sm text-primary">{notification.phoneNumber}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Notification Cards */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Main notification card */}
        <div className="relative">
          <div className="flex gap-4">
            {/* Icon */}
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
              notification.categoryIcon === 'Bell' ? "bg-blue-500" :
              notification.categoryIcon === 'CreditCard' ? "bg-yellow-400" :
              notification.categoryIcon === 'Clock' ? "bg-yellow-400" :
              "bg-blue-500"
            )}>
              <IconComponent className="h-4 w-4 text-white" />
            </div>

            {/* Card */}
            <Card className="flex-1 p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 rounded-xl shadow-sm">
              <div className="mb-2">
                <h3 className="font-semibold text-foreground mb-2">
                  {notification.subject}
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {notification.fullContent || notification.content}
                </p>
              </div>
              
              {/* Action buttons */}
              {notification.actionButtons && notification.actionButtons.length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                  {notification.actionButtons.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground mb-2 last:mb-0"
                      onClick={() => {
                        if (action.onClick) {
                          action.onClick()
                        } else if (action.href) {
                          window.location.href = action.href
                        }
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </Card>
          </div>
          
          {/* Timestamp */}
          <p className="text-xs text-muted-foreground mt-2 ml-12">
            {formatNotificationDate(notification.timestamp)}
          </p>
        </div>

        {/* History separator - if there are multiple notifications from same sender */}
        {notification.tags && notification.tags.length > 0 && (
          <>
            <div className="relative flex items-center my-6">
              <Separator className="flex-1" />
              <span className="px-4 text-xs text-muted-foreground uppercase">Geschiedenis</span>
              <Separator className="flex-1" />
            </div>

            {/* Additional notification card (example) */}
            <div className="relative">
              <div className="flex gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                  notification.categoryIcon === 'Bell' ? "bg-blue-500" :
                  notification.categoryIcon === 'CreditCard' ? "bg-yellow-400" :
                  notification.categoryIcon === 'Clock' ? "bg-yellow-400" :
                  "bg-blue-500"
                )}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>

                <Card className="flex-1 p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 rounded-xl shadow-sm">
                  <div className="mb-2">
                    <h3 className="font-semibold text-foreground mb-2">
                      Bijna geen premium data meer
                    </h3>
                    <p className="text-sm text-foreground leading-relaxed">
                      Je hebt bijna geen premium data meer. Top-up om lagere snelheden te vermijden.
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Top-up toevoegen
                    </Button>
                  </div>
                </Card>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2 ml-12">
                12:29 PM, JUN 2
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

