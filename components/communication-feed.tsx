"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Message } from "@/lib/dummy-data"
import { FileText, Link as LinkIcon, Clock } from "lucide-react"

interface CommunicationFeedProps {
  messages: Message[]
}

export function CommunicationFeed({ messages }: CommunicationFeedProps) {
  const formatTimestamp = (timestamp: string) => {
    return timestamp
  }

  return (
    <div className="space-y-0">
      {messages.length === 0 ? (
        <Card className="border border-border rounded-xl shadow-sm">
          <CardContent className="pt-6 pb-6">
            <p className="text-sm text-muted-foreground text-center">
              Geen berichten beschikbaar
            </p>
          </CardContent>
        </Card>
      ) : (
        messages.map((message, index) => (
          <div key={message.id}>
            <Card className="border border-border rounded-xl shadow-sm bg-card hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold leading-tight mb-1.5 text-foreground">
                      {message.subject}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>{formatTimestamp(message.timestamp)}</span>
                    </div>
                  </div>
                  {!message.read && (
                    <Badge variant="destructive" className="text-xs shrink-0">
                      Nieuw
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  {message.content}
                </p>
                
                {message.tags && message.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {message.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="space-y-2">
                    {message.attachments.map((attachment, attachIndex) => (
                      <a
                        key={attachIndex}
                        href={attachment.url}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        {attachment.type === 'pdf' || attachment.name.endsWith('.pdf') ? (
                          <FileText className="h-4 w-4 shrink-0" />
                        ) : (
                          <LinkIcon className="h-4 w-4 shrink-0" />
                        )}
                        <span className="truncate group-hover:underline">
                          {attachment.name}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            {index < messages.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))
      )}
    </div>
  )
}

