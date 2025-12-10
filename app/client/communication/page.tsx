"use client"

import { useState, useMemo, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getMessagesForClient, type Message } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

export default function ClientCommunicationPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [filterQuery, setFilterQuery] = useState("")

  // Fetch messages for client (using clientId '1' as per dashboard pattern)
  const messages = getMessagesForClient('1')

  // Filter messages based on search query
  const filteredMessages = useMemo(() => {
    if (!filterQuery.trim()) return messages
    const query = filterQuery.toLowerCase()
    return messages.filter(
      (msg) =>
        msg.subject.toLowerCase().includes(query) ||
        msg.content.toLowerCase().includes(query) ||
        msg.senderName?.toLowerCase().includes(query)
    )
  }, [messages, filterQuery])

  // Auto-select first message when filter changes or on initial load
  useEffect(() => {
    if (!selectedMessageId && filteredMessages.length > 0) {
      setSelectedMessageId(filteredMessages[0].id)
    } else if (selectedMessageId && !filteredMessages.find((m) => m.id === selectedMessageId)) {
      // If selected message is filtered out, select first available
      setSelectedMessageId(filteredMessages.length > 0 ? filteredMessages[0].id : null)
    }
  }, [filteredMessages, selectedMessageId])

  // Get selected message
  const selectedMessage = useMemo(() => {
    if (!selectedMessageId) return null
    return filteredMessages.find((msg) => msg.id === selectedMessageId) || null
  }, [selectedMessageId, filteredMessages])

  const truncatePreview = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + "..."
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Communicatie" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-2">
            Communicatie
          </h1>
          <p className="text-lg text-muted-foreground">
            Bekijk alle berichten, meldingen en belangrijke updates van je accountant op één plek
          </p>
        </div>
        <div className="-m-4 p-4 min-h-[calc(100vh-8rem)] w-full">
          <div className="flex gap-4 h-full w-full overflow-hidden">
          {/* Left Sidebar - Message List */}
          <Card className="border rounded-lg shadow-sm flex flex-col h-[calc(100vh-12rem)] w-[40%] shrink-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Berichten</CardTitle>
              <Input
                placeholder="Zoeken..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="mt-2"
              />
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                <div className="px-4 pb-4">
                  {filteredMessages.length === 0 ? (
                    <div className="text-sm text-muted-foreground py-8 text-center">
                      Geen berichten gevonden
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessageId(message.id)}
                          className={cn(
                            "flex flex-col items-start p-3 rounded-md cursor-pointer transition-colors",
                            "hover:bg-accent",
                            selectedMessage?.id === message.id && "bg-accent"
                          )}
                        >
                          <div className="flex items-start justify-between w-full gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm truncate">
                                {message.subject}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {truncatePreview(message.content)}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                              {message.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Panel - Message Detail */}
          <Card className="border rounded-lg shadow-sm flex flex-col h-[calc(100vh-12rem)] w-[60%] min-w-0">
            {selectedMessage ? (
              <>
                <CardHeader className="border-b pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-2">{selectedMessage.subject}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        {selectedMessage.senderName && (
                          <span className="text-sm text-muted-foreground">
                            {selectedMessage.senderName}
                          </span>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {selectedMessage.timestamp}
                        </Badge>
                        {selectedMessage.tags && selectedMessage.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {selectedMessage.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full">
                    <div className="px-6 py-6">
                      <div className="prose prose-sm max-w-none leading-relaxed">
                        <div className="text-foreground whitespace-pre-wrap">
                          {selectedMessage.content}
                        </div>
                        {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                          <div className="mt-6 pt-6 border-t">
                            <div className="text-sm font-medium mb-2">Bijlagen:</div>
                            <div className="space-y-1">
                              {selectedMessage.attachments.map((attachment, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {attachment.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg">Selecteer een bericht</p>
                  <p className="text-sm mt-2">Kies een bericht uit de lijst om te bekijken</p>
                </div>
              </div>
            )}
          </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
