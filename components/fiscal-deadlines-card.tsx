"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { getUpcomingDeadlines, FiscalDeadline } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function FiscalDeadlinesCard() {
  const upcomingDeadlines = getUpcomingDeadlines(90)
  const [selectedDeadline, setSelectedDeadline] = useState<FiscalDeadline | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long' })
  }

  const formatDateFull = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadline = new Date(dateString)
    deadline.setHours(0, 0, 0, 0)
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <>
      <Card className="flex h-full flex-col border border-border hover:bg-accent/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle>Fiscale deadlines</CardTitle>
          </div>
          <CardDescription>Belangrijke deadlines op komst</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 5).map((deadline) => {
                const daysUntil = getDaysUntil(deadline.date)
                
                return (
                  <div key={deadline.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(deadline.date)}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setSelectedDeadline(deadline)}
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Geen deadlines op komst</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={selectedDeadline !== null} onOpenChange={(open) => !open && setSelectedDeadline(null)}>
        <DialogContent>
          {selectedDeadline && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDeadline.title}</DialogTitle>
                <DialogDescription>
                  {formatDateFull(selectedDeadline.date)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Type</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedDeadline.type === 'belgie' ? 'België' : 'Kantoor'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Dagen tot deadline</p>
                  <p className="text-sm text-muted-foreground">
                    {(() => {
                      const daysUntil = getDaysUntil(selectedDeadline.date)
                      return daysUntil > 0 ? `${daysUntil} dagen` : daysUntil === 0 ? 'Vandaag' : 'Verlopen'
                    })()}
                  </p>
                </div>
                {selectedDeadline.description && (
                  <div>
                    <p className="text-sm font-medium mb-1">Beschrijving</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDeadline.description}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

