"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, X, ChevronDown, Edit, Trash2, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { dummyFiscalDeadlines, dummyMessages, dummyFAQEntries, getFAQCategories, dummyClients, FiscalDeadline } from "@/lib/dummy-data"
import { Calendar as CalendarIcon, MessageSquare, HelpCircle, Plus } from "lucide-react"
import { format } from "date-fns"
import { nl } from "date-fns/locale/nl"

export default function AccountantCommunicationPage() {
  const [faqSearch, setFaqSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [messageTo, setMessageTo] = useState<string>("all")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDeadlineId, setEditingDeadlineId] = useState<string | null>(null)
  const [deadlineTitle, setDeadlineTitle] = useState("")
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined)
  const [deadlineRecipients, setDeadlineRecipients] = useState<string[]>([]) // Array of client IDs or ["iedereen"]
  const [deadlineDescription, setDeadlineDescription] = useState("")
  const [deadlineType, setDeadlineType] = useState<'belgie' | 'kantoor'>('belgie')
  const [comboboxOpen, setComboboxOpen] = useState(false)
  const [clientSearch, setClientSearch] = useState("")

  const upcomingDeadlines = dummyFiscalDeadlines
    .filter(d => new Date(d.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  const filteredFAQ = dummyFAQEntries.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    const deadline = new Date(dateString)
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleOpenModal = (deadline?: FiscalDeadline) => {
    if (deadline) {
      setEditingDeadlineId(deadline.id)
      setDeadlineTitle(deadline.title)
      setDeadlineDate(new Date(deadline.date))
      setDeadlineDescription(deadline.description || "")
      setDeadlineType(deadline.type)
      setDeadlineRecipients([]) // Recipients not stored in deadline object
    } else {
      setEditingDeadlineId(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDeadlineId(null)
    // Reset form
    setDeadlineTitle("")
    setDeadlineDate(undefined)
    setDeadlineRecipients([])
    setDeadlineDescription("")
    setDeadlineType('belgie')
    setClientSearch("")
    setComboboxOpen(false)
  }

  const handleEditDeadline = (deadline: FiscalDeadline) => {
    handleOpenModal(deadline)
  }

  const handleDeleteDeadline = (deadlineId: string) => {
    // TODO: Add API call to delete deadline
    console.log("Delete deadline:", deadlineId)
    // In a real app, you would update the state or refetch data here
  }

  const handleToggleRecipient = (value: string) => {
    if (value === "iedereen") {
      // If "Iedereen" is selected, clear all other selections
      setDeadlineRecipients(["iedereen"])
    } else {
      setDeadlineRecipients((prev) => {
        // Remove "iedereen" if it exists
        const withoutIedereen = prev.filter((r) => r !== "iedereen")
        
        // Toggle the selected client
        if (withoutIedereen.includes(value)) {
          return withoutIedereen.filter((r) => r !== value)
        } else {
          return [...withoutIedereen, value]
        }
      })
    }
  }

  const handleRemoveRecipient = (value: string) => {
    setDeadlineRecipients((prev) => prev.filter((r) => r !== value))
  }

  const handleSubmitDeadline = () => {
    // Validate required fields
    if (!deadlineTitle || !deadlineDate) {
      return
    }

    // TODO: Add API call to save/update deadline
    if (editingDeadlineId) {
      console.log("Update deadline:", {
        id: editingDeadlineId,
        title: deadlineTitle,
        date: deadlineDate.toISOString().split('T')[0],
        type: deadlineType,
        description: deadlineDescription
      })
    } else {
      console.log("New deadline:", {
        title: deadlineTitle,
        date: deadlineDate.toISOString().split('T')[0],
        type: deadlineType,
        recipients: deadlineRecipients,
        description: deadlineDescription
      })
    }

    handleCloseModal()
  }

  const filteredClients = dummyClients.filter((client) =>
    client.name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  const getSelectedClientNames = () => {
    if (deadlineRecipients.includes("iedereen")) {
      return ["Iedereen"]
    }
    return deadlineRecipients
      .map((id) => dummyClients.find((c) => c.id === id)?.name)
      .filter(Boolean) as string[]
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Communication" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communicatie</h1>
          <p className="text-muted-foreground">
            Communicatie-hub, volledig gericht op efficiëntie en proactiviteit
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <CardTitle>Fiscale deadlines</CardTitle>
              </div>
              <CardDescription>Alle fiscale deadlines van België</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => {
                  const daysUntil = getDaysUntil(deadline.date)
                  return (
                    <div key={deadline.id} className="border-b pb-2 last:border-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{deadline.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(deadline.date)}</p>
                          {deadline.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{deadline.description}</p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditDeadline(deadline)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Bewerken
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteDeadline(deadline.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Verwijderen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {daysUntil > 0 ? `${daysUntil} dagen te gaan` : 'Vandaag'}
                      </div>
                    </div>
                  )
                })}
                <Button variant="outline" className="w-full" size="sm" onClick={() => handleOpenModal()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Deadline toevoegen
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <CardTitle>Berichten</CardTitle>
              </div>
              <CardDescription>Berichten naar ondernemers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Select value={messageTo} onValueChange={setMessageTo}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Selecteer ontvanger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle klanten</SelectItem>
                    {dummyClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Onderwerp"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className="h-9"
                />
                <Textarea
                  placeholder="Typ je bericht hier..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={3}
                  className="text-sm"
                />
                <Button className="w-full" size="sm">Verstuur bericht</Button>
                <div className="border-t pt-3">
                  <p className="text-xs font-medium mb-2">Recente berichten</p>
                  <div className="space-y-1.5">
                    {dummyMessages.slice(0, 2).map((message) => (
                      <div key={message.id} className="text-xs border-b pb-1.5 last:border-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{message.subject}</span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {message.toClientName || 'Alle klanten'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              <CardTitle>Veel gestelde vragen</CardTitle>
            </div>
            <CardDescription>Database van {dummyFAQEntries.length}+ vragen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Zoek in FAQ..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="flex-1"
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle categorieën</SelectItem>
                    {getFAQCategories().map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Toevoegen
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFAQ.map((faq) => (
                  <Card key={faq.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{faq.category}</Badge>
                          </div>
                          <CardTitle className="text-base">{faq.question}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm">Verwijderen</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deadline Toevoegen/Bewerken Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        if (!open) {
          handleCloseModal()
        } else {
          setIsModalOpen(true)
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingDeadlineId ? 'Deadline bewerken' : 'Deadline toevoegen'}</DialogTitle>
            <DialogDescription>
              {editingDeadlineId 
                ? 'Bewerk de fiscale deadline'
                : 'Voeg een nieuwe fiscale deadline toe aan het systeem'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Titel */}
            <div className="space-y-2">
              <Label htmlFor="deadline-title">Titel *</Label>
              <Input
                id="deadline-title"
                placeholder="Bijv. BTW-aangifte Q1 2025"
                value={deadlineTitle}
                onChange={(e) => setDeadlineTitle(e.target.value)}
              />
            </div>

            {/* Deadline datum */}
            <div className="space-y-2">
              <Label htmlFor="deadline-date">Deadline datum *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="deadline-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadlineDate ? (
                      format(deadlineDate, "PPP", { locale: nl })
                    ) : (
                      <span className="text-muted-foreground">Selecteer een datum</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={deadlineDate}
                    onSelect={setDeadlineDate}
                    initialFocus
                    locale={nl}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Voor wie - alleen bij nieuwe deadline */}
            {!editingDeadlineId && (
            <div className="space-y-2">
              <Label htmlFor="deadline-recipients">Voor wie? *</Label>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="deadline-recipients"
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between min-h-[2.5rem] h-auto"
                  >
                    <div className="flex flex-wrap gap-1 flex-1">
                      {deadlineRecipients.length === 0 ? (
                        <span className="text-muted-foreground">Selecteer ontvangers</span>
                      ) : (
                        getSelectedClientNames().map((name) => (
                          <Badge
                            key={name}
                            variant="secondary"
                            className="mr-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              const id = name === "Iedereen" ? "iedereen" : dummyClients.find((c) => c.name === name)?.id || ""
                              if (id) handleRemoveRecipient(id)
                            }}
                          >
                            {name}
                            <X className="ml-1 h-3 w-3" />
                          </Badge>
                        ))
                      )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Zoek klanten..."
                      value={clientSearch}
                      onValueChange={setClientSearch}
                    />
                    <CommandList>
                      <CommandEmpty>Geen klanten gevonden.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="iedereen"
                          onSelect={() => {
                            handleToggleRecipient("iedereen")
                            setComboboxOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              deadlineRecipients.includes("iedereen") ? "opacity-100" : "opacity-0"
                            )}
                          />
                          Iedereen
                        </CommandItem>
                      </CommandGroup>
                      <CommandGroup>
                        {filteredClients.map((client) => (
                          <CommandItem
                            key={client.id}
                            value={client.id}
                            onSelect={() => {
                              handleToggleRecipient(client.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                deadlineRecipients.includes(client.id) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {client.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            )}

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="deadline-type">Type *</Label>
              <Select value={deadlineType} onValueChange={(value: 'belgie' | 'kantoor') => setDeadlineType(value)}>
                <SelectTrigger id="deadline-type">
                  <SelectValue placeholder="Selecteer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="belgie">België</SelectItem>
                  <SelectItem value="kantoor">Kantoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Omschrijving */}
            <div className="space-y-2">
              <Label htmlFor="deadline-description">Omschrijving</Label>
              <Textarea
                id="deadline-description"
                placeholder="Optionele beschrijving van de deadline..."
                value={deadlineDescription}
                onChange={(e) => setDeadlineDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Annuleren
            </Button>
            <Button 
              onClick={handleSubmitDeadline}
              disabled={!deadlineTitle || !deadlineDate || (!editingDeadlineId && deadlineRecipients.length === 0)}
            >
              {editingDeadlineId ? 'Opslaan' : 'Toevoegen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}

