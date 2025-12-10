"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { dummyFiscalDeadlines, FiscalDeadline } from "@/lib/dummy-data"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, isSameDay } from "date-fns"
import { nl } from "date-fns/locale/nl"

export function FiscalDeadlinesModule() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  // Get all upcoming deadlines (within next 12 months)
  const upcomingDeadlines = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(today.getFullYear() + 1)
    
    return dummyFiscalDeadlines
      .filter(deadline => {
        const deadlineDate = new Date(deadline.date)
        deadlineDate.setHours(0, 0, 0, 0)
        // Show deadlines that are today or in the future, up to 1 year ahead
        return deadlineDate >= today && deadlineDate <= oneYearFromNow
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [])

  // Get deadline dates for calendar highlighting
  const deadlineDates = useMemo(() => {
    return upcomingDeadlines.map(deadline => {
      const date = new Date(deadline.date)
      date.setHours(0, 0, 0, 0)
      return date
    })
  }, [upcomingDeadlines])


  // Get the next upcoming deadline
  const nextDeadline = useMemo(() => {
    if (upcomingDeadlines.length === 0) return null
    return upcomingDeadlines[0]
  }, [upcomingDeadlines])

  const getDaysUntil = (dateString: string): number => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadline = new Date(dateString)
    deadline.setHours(0, 0, 0, 0)
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatus = (deadline: FiscalDeadline): 'upcoming' | 'overdue' | 'today' => {
    const daysUntil = getDaysUntil(deadline.date)
    if (daysUntil < 0) return 'overdue'
    if (daysUntil === 0) return 'today'
    return 'upcoming'
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return format(date, 'd MMMM', { locale: nl })
  }

  const getDeadlineTypeLabel = (title: string): string => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('btw')) return 'BTW-aangifte'
    if (lowerTitle.includes('voorafbetaling')) return 'Voorafbetalingen'
    if (lowerTitle.includes('sociale bijdrage')) return 'Sociale bijdragen'
    if (lowerTitle.includes('personenbelasting')) return 'Personenbelasting'
    if (lowerTitle.includes('jaarrekening')) return 'Jaarrekening'
    return title
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Check if a date has a deadline
  const isDeadlineDay = (date: Date): boolean => {
    return deadlineDates.some(deadlineDate => isSameDay(deadlineDate, date))
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-2 mb-1">
        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">Fiscale Deadlines</h2>
      </div>

      <Card className="border border-border rounded-xl shadow-sm bg-card w-full">
        <CardHeader className="pb-3">
          {/* Month Navigation - Above Calendar */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreviousMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-base font-semibold text-foreground">
              {format(currentMonth, 'MMMM yyyy', { locale: nl })}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Calendar */}
          <div className="[&_.rdp-nav]:hidden [&_.rdp-month_caption]:hidden">
            <Calendar
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              modifiers={
                upcomingDeadlines.length > 0
                  ? {
                      deadline: (date) => isDeadlineDay(date),
                    }
                  : {}
              }
              modifiersClassNames={
                upcomingDeadlines.length > 0
                  ? {
                      deadline: "bg-destructive/10 text-destructive font-semibold border border-destructive/20",
                    }
                  : {}
              }
              className="w-full"
              captionLayout="label"
              showOutsideDays={true}
              locale={nl}
            />
          </div>

          {/* Next Deadline or Empty State */}
          {nextDeadline ? (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight mb-1 text-foreground">
                    {getDeadlineTypeLabel(nextDeadline.title)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(nextDeadline.date)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge
                    variant={
                      getStatus(nextDeadline) === 'overdue'
                        ? 'destructive'
                        : getStatus(nextDeadline) === 'today'
                        ? 'secondary'
                        : 'outline'
                    }
                    className="text-xs font-normal"
                  >
                    {getStatus(nextDeadline) === 'overdue'
                      ? 'Verlopen'
                      : getStatus(nextDeadline) === 'today'
                      ? 'Vandaag'
                      : getDaysUntil(nextDeadline.date) <= 7
                      ? `${getDaysUntil(nextDeadline.date)} dagen`
                      : 'Aankomend'}
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Geen deadlines op komst
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

