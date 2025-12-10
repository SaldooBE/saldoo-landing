"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { dummyFAQEntries, getFAQCategories, type FAQEntry } from "@/lib/dummy-data"
import { Search } from "lucide-react"

// Helper function to truncate text to ~150 characters
function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export default function ClientFAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedFAQ, setSelectedFAQ] = useState<FAQEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredFAQ = dummyFAQEntries.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = getFAQCategories()

  const handleCardClick = (faq: FAQEntry) => {
    setSelectedFAQ(faq)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Small delay to allow animation to complete before clearing selected FAQ
    setTimeout(() => setSelectedFAQ(null), 200)
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "FAQ" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Veelgestelde vragen</h1>
          <p className="text-muted-foreground">
            Bibliotheek van {dummyFAQEntries.length}+ eenvoudige uitlegpagina's
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Zoek in FAQ</CardTitle>
            <CardDescription>
              Vind antwoorden op je vragen over fiscaliteit en boekhouding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek naar vragen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              >
                Alle categorieën
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {filteredFAQ.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Geen vragen gevonden die overeenkomen met je zoekopdracht.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredFAQ.map((faq) => (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <Card
                      className="cursor-pointer transition-all hover:shadow-lg border border-border hover:bg-accent/50 h-full flex flex-col"
                      onClick={() => handleCardClick(faq)}
                    >
                    <CardHeader className="flex-shrink-0">
                      <CardTitle className="text-base font-semibold text-[#02377C] line-clamp-2">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {truncateText(faq.answer, 150)}
                      </p>
                    </CardContent>
                  </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <AnimatePresence>
            {isModalOpen && selectedFAQ && (
              <DialogContent
                className="max-w-2xl max-h-[80vh] overflow-y-auto border-[#02377C]/20"
                onInteractOutside={handleCloseModal}
                showCloseButton={true}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-[#02377C]">
                      {selectedFAQ.question}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground mt-2">
                      {selectedFAQ.category}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                      {selectedFAQ.answer}
                    </p>
                  </div>
                </motion.div>
              </DialogContent>
            )}
          </AnimatePresence>
        </Dialog>
      </div>
    </PageLayout>
  )
}

