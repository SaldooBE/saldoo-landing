"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { 
  Upload as UploadIcon, 
  CheckCircle2,
  Clock,
  HelpCircle,
  X,
  Loader2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { QuestionStep } from "@/components/question-step"
import { 
  getQuestionsForStep, 
  QUESTIONNAIRE_STEPS, 
  getProgressPercentage,
  Question
} from "@/lib/questionnaire-data"
import { toast } from "sonner"

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [reportId, setReportId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [startingAnalysis, setStartingAnalysis] = useState(false)

  // Initialize welcome modal
  useEffect(() => {
    setWelcomeModalOpen(true)
  }, [])

  const totalSteps = QUESTIONNAIRE_STEPS.length
  const progressPercentage = getProgressPercentage(currentStep)

  // Load report ID from localStorage on mount
  useEffect(() => {
    const storedReportId = localStorage.getItem('reportId')
    if (storedReportId) {
      setReportId(storedReportId)
    }
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/reports/save-context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context_json: formData,
          report_id: reportId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save')
      }

      const data = await response.json()
      setReportId(data.report_id)
      localStorage.setItem('reportId', data.report_id)
      toast.success('Antwoorden opgeslagen')
    } catch (error) {
      console.error('Error saving context:', error)
      toast.error(error instanceof Error ? error.message : 'Fout bij opslaan')
    } finally {
      setSaving(false)
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleFilesSelected = async (filesList: FileList | null) => {
    if (!filesList) return
    const files = Array.from(filesList)
    
    // First, ensure we have a report ID
    let currentReportId = reportId
    if (!currentReportId) {
      // Save context first to create report
      await handleSave()
      currentReportId = reportId
      if (!currentReportId) {
        toast.error('Sla eerst je antwoorden op voordat je bestanden uploadt')
        return
      }
    }

    // Add files to local state
    setUploadedFiles(prev => [...prev, ...files])
    
    // Upload files to server
    setUploading(true)
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })
      formData.append('report_id', currentReportId!)

      const response = await fetch('/api/reports/upload-files', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload mislukt')
      }

      const data = await response.json()
      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((err: string) => toast.error(err))
      } else {
        toast.success(`${files.length} bestand(en) geüpload`)
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error(error instanceof Error ? error.message : 'Fout bij uploaden')
      // Remove files from local state if upload failed
      setUploadedFiles(prev => prev.filter(f => !files.includes(f)))
    } finally {
      setUploading(false)
    }
  }

  const handleStartAnalysis = async () => {
    if (!reportId) {
      toast.error('Sla eerst je antwoorden op')
      return
    }

    if (uploadedFiles.length === 0) {
      toast.error('Upload eerst minstens één bestand')
      return
    }

    setStartingAnalysis(true)
    try {
      const response = await fetch('/api/reports/start-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_id: reportId,
        }),
      })

      if (!response.ok) {
        let error;
        try {
          error = await response.json()
        } catch (e) {
          // If response is not JSON, use status text
          error = { error: response.statusText || 'Unknown error', message: response.statusText || 'Unknown error' }
        }
        const errorMessage = error.message || error.error || `HTTP ${response.status}: Analyse starten mislukt`
        console.error('Analysis error response:', error)
        console.error('Response status:', response.status)
        throw new Error(errorMessage)
      }

      const data = await response.json()
      toast.success('Analyse gestart! Je wordt doorgestuurd...')
      
      // Redirect to analyse page
      setTimeout(() => {
        router.push('/analyse')
      }, 1000)
    } catch (error) {
      console.error('Error starting analysis:', error)
      toast.error(error instanceof Error ? error.message : 'Fout bij starten analyse')
      setStartingAnalysis(false)
    }
  }

  const renderStepContent = () => {
    // Steps 1-8: Questionnaire steps
    if (currentStep >= 1 && currentStep <= 8) {
      const questions = getQuestionsForStep(currentStep)
      const stepTitle = QUESTIONNAIRE_STEPS[currentStep - 1]

      return (
        <Card className="hover:shadow-lg transition-shadow duration-300 animate-in fade-in-50 slide-in-from-bottom-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stap {currentStep}: {stepTitle}</CardTitle>
                <CardDescription>
                  {currentStep === 7 ? "Optionele verfijning — Overslaan mogelijk" : "Vul de vragenlijst in"}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                ~5-10 min
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <QuestionStep
              stepNumber={currentStep}
              questions={questions}
              formData={formData}
              onChange={handleInputChange}
              onNext={handleNext}
              onBack={handleBack}
            />
            <div className="mt-4 flex justify-between">
              <div>
                {currentStep === 7 && (
                  <Button variant="outline" onClick={handleNext}>
                    Deze stap overslaan
                  </Button>
                )}
              </div>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                variant="default"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opslaan...
                  </>
                ) : (
                  'Opslaan'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    // Step 9: File Upload
    if (currentStep === 9) {
      return (
        <Card className="hover:shadow-lg transition-shadow duration-300 animate-in fade-in-50 slide-in-from-bottom-4">
          <CardHeader>
            <CardTitle>Stap {currentStep}: {QUESTIONNAIRE_STEPS[currentStep - 1]}</CardTitle>
            <CardDescription>
              Upload je jaarrekening, balans, P&L, grootboek of fiscale aangifte (PDF of Excel)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Zone */}
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={handleOpenFilePicker}
            >
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm font-medium mb-2">
                Sleep bestanden hierheen of klik om te uploaden
              </p>
              <p className="text-xs text-muted-foreground">
                PDF of XLS bestanden worden ondersteund
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.xlsx,.xls,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />

            {/* File Types Info removed as requested */}

            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Geüploade bestanden:</p>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between gap-2 text-sm bg-muted p-2 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{file.name}</span>
                    </div>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label={`Verwijder ${file.name}`}
                      onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Terug
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={uploadedFiles.length === 0 || uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploaden...
                  </>
                ) : (
                  'Volgende'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    // Step 10: Review
    if (currentStep === 10) {
      return (
        <Card className="hover:shadow-lg transition-shadow duration-300 animate-in fade-in-50 slide-in-from-bottom-4">
          <CardHeader>
            <CardTitle>Stap {currentStep}: {QUESTIONNAIRE_STEPS[currentStep - 1]}</CardTitle>
            <CardDescription>
              Controleer je gegevens en start de analyse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary grouped by sections */}
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(stepNum => {
                const questions = getQuestionsForStep(stepNum)
                const visibleQuestions = questions.filter(q => {
                  const value = formData[q.id]
                  return value !== undefined && value !== null && value !== ""
                })

                if (visibleQuestions.length === 0) return null

                return (
                  <div key={stepNum} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold mb-3 text-primary">
                      {QUESTIONNAIRE_STEPS[stepNum - 1]}
                    </h3>
                    <div className="space-y-3">
                      {visibleQuestions.map((question) => (
                        <div key={question.id}>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {question.label}
                          </p>
                          <p className="text-base">
                            {formatAnswer(question, formData[question.id])}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Uploaded files section */}
              {uploadedFiles.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-primary">
                    Geüploade bestanden
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="text-base">{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Terug
              </Button>
              <Button 
                size="lg" 
                onClick={handleStartAnalysis}
                disabled={startingAnalysis || !reportId || uploadedFiles.length === 0}
              >
                {startingAnalysis ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyse starten...
                  </>
                ) : (
                  'Analyse starten'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  const formatAnswer = (question: Question, value: any): string => {
    if (value === undefined || value === null || value === "") return "-"
    
    if (Array.isArray(value)) {
      if (!question.options) return value.join(", ")
      const labelMap = new Map(question.options.map(opt => [opt.value, opt.label]))
      return value.map(v => labelMap.get(v) || String(v)).join(", ")
    }

    if (question.type === "number" && typeof value === "number") {
      return `€${value.toLocaleString("nl-NL")}`
    }
    
    if (question.options) {
      const option = question.options.find(opt => opt.value === value)
      return option?.label || value
    }

    return String(value)
  }

  const getEstimatedTimeRemaining = () => {
    const minutesPerStep = 1.2
    const remainingSteps = totalSteps - currentStep
    return Math.ceil(remainingSteps * minutesPerStep)
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Upload & context" }]}>
      <div className="space-y-6">
        {/* Progress Bar */}
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upload je jaarcijfers</CardTitle>
                  <CardDescription>
                    Volg de stappen om je analyse te starten
                  </CardDescription>
                </div>
                {currentStep < totalSteps && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Nog ~{getEstimatedTimeRemaining()} min
                  </Badge>
                )}
              </div>
              
              <Progress value={progressPercentage} className="mt-2 transition-all duration-500" />
              
              {/* Step Indicators */}
              <div className="flex justify-center gap-2 mt-2">
                {QUESTIONNAIRE_STEPS.slice(0, 8).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index + 1 < currentStep
                        ? "bg-primary w-8"
                        : index + 1 === currentStep
                        ? "bg-primary w-8"
                        : "bg-muted w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Step Content */}
        {renderStepContent()}

        {/* Welcome Modal */}
        <Dialog open={welcomeModalOpen} onOpenChange={setWelcomeModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Even een kleine side-note!
              </DialogTitle>
              <div className="space-y-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Duur: 5-10 minuten</p>
                    <p className="text-sm">
                      Deze vragenlijst neemt ongeveer 5-10 minuten in beslag
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Betere analyse</p>
                    <p className="text-sm">
                      Uw antwoorden helpen ons een nauwkeurigere analyse te maken en betrouwbaar advies te geven over eenmanszaak vs vennootschap
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm">
                    U kunt altijd teruggaan en antwoorden aanpassen tijdens het invullen.
                  </p>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setWelcomeModalOpen(false)} className="w-full">
                Beginnen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  )
}