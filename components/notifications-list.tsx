"use client"

import { Card } from "@/components/ui/card"
import { Message } from "@/lib/dummy-data"
import { formatNotificationDate } from "@/lib/dummy-data"
import { 
  Bell, 
  Clock, 
  CreditCard, 
  FileText, 
  MessageCircle, 
  User,
  type LucideIcon 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationsListProps {
  notifications: Message[]
  selectedId?: string
  onSelect: (notification: Message) => void
}

const iconMap: Record<string, LucideIcon> = {
  Bell,
  Clock,
  CreditCard,
  FileText,
  MessageCircle,
  User,
}

export function NotificationsList({ 
  notifications, 
  selectedId, 
  onSelect 
}: NotificationsListProps) {
  const getIcon = (iconName?: string): LucideIcon => {
    if (iconName && iconMap[iconName]) {
      return iconMap[iconName]
    }
    return MessageCircle
  }

  const getPreviewText = (content: string, maxLength: number = 60): string => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Bell className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Meldingen</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {notifications.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Geen meldingen beschikbaar
            </p>
          </Card>
        ) : (
          notifications.map((notification) => {
            const IconComponent = getIcon(notification.categoryIcon)
            const isSelected = selectedId === notification.id
            
            return (
              <Card
                key={notification.id}
                className={cn(
                  "p-4 cursor-pointer transition-colors rounded-xl border shadow-sm",
                  isSelected 
                    ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" 
                    : "bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-accent/50 border-border"
                )}
                onClick={() => onSelect(notification)}
              >
                <div className="flex items-start gap-3">
                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                  {notification.read && (
                    <div className="mt-2 w-2 h-2 shrink-0" />
                  )}
                  
                  {/* Icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    notification.categoryIcon === 'Bell' ? "bg-blue-500" :
                    notification.categoryIcon === 'CreditCard' ? "bg-yellow-400" :
                    notification.categoryIcon === 'Clock' ? "bg-yellow-400" :
                    "bg-blue-500"
                  )}>
                    <IconComponent className={cn(
                      "h-5 w-5 text-white"
                    )} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-foreground">
                        {notification.senderName || notification.toClientName || 'Accountant'}
                      </h3>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatNotificationDate(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {getPreviewText(notification.content)}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

