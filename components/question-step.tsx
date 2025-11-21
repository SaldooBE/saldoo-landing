"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"
import { Question, shouldShowQuestion } from "@/lib/questionnaire-data"

interface QuestionStepProps {
  stepNumber: number;
  questions: Question[];
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionStep({ stepNumber, questions, formData, onChange, onNext, onBack }: QuestionStepProps) {
  const [helpModalOpen, setHelpModalOpen] = useState<string | null>(null);
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null);

  const visibleQuestions = questions.filter(q => shouldShowQuestion(q, formData));

  const getQuestionByField = (field: string): Question | undefined => {
    return questions.find(q => q.id === field);
  };

  const isStepValid = () => {
    return visibleQuestions.every(q => {
      if (!q.required) return true;
      const value = formData[q.id];
      if (q.type === "multiselect") {
        return Array.isArray(value) && value.length > 0;
      }
      return value !== undefined && value !== null && value !== "";
    });
  };

  const renderQuestion = (question: Question) => {
    const fieldValue = formData[question.id] || "";

    switch (question.type) {
      case "text":
        return (
          <Input
            id={question.id}
            type="text"
            placeholder={question.placeholder}
            value={fieldValue}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="transition-all hover:border-primary/50"
          />
        );

      case "number":
        return (
          <Input
            id={question.id}
            type="number"
            placeholder={question.placeholder}
            value={fieldValue}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="transition-all hover:border-primary/50"
          />
        );

      case "textarea":
        return (
          <Textarea
            id={question.id}
            placeholder={question.placeholder}
            value={fieldValue}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="transition-all hover:border-primary/50 min-h-[100px]"
          />
        );

      case "select":
        return (
          <Select value={fieldValue} onValueChange={(value) => onChange(question.id, value)}>
            <SelectTrigger className="w-full transition-all hover:border-primary/50">
              <SelectValue placeholder={question.placeholder || "Selecteer een optie"} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        return (
          <div className="grid gap-3">
            {question.options?.map((option) => {
              const currentValues: string[] = Array.isArray(fieldValue) ? fieldValue : [];
              const checked = currentValues.includes(option.value);
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${question.id}-${option.value}`}
                    checked={checked}
                    onCheckedChange={(isChecked) => {
                      const next = new Set(currentValues);
                      if (isChecked) next.add(option.value); else next.delete(option.value);
                      onChange(question.id, Array.from(next));
                    }}
                  />
                  <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer font-normal">
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </div>
        );

      case "radio":
        return (
          <RadioGroup value={fieldValue} onValueChange={(value) => onChange(question.id, value)}>
            <div className="grid gap-3">
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        {visibleQuestions.map((question) => (
          <div key={question.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={question.id} className="text-sm font-medium flex items-center gap-2">
                {question.label}
                {question.required && <span className="text-destructive">*</span>}
              </Label>
              {question.helpText && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setHelpModalOpen(question.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        onMouseEnter={() => setHoveredQuestion(question.id)}
                        onMouseLeave={() => setHoveredQuestion(null)}
                      >
                        <InfoIcon 
                          className={`h-4 w-4 transition-transform ${hoveredQuestion === question.id ? 'scale-110' : ''}`} 
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="max-w-xs">{question.helpText}</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </div>
            {renderQuestion(question)}
          </div>
        ))}
      </div>

      {/* Help Modal */}
      {helpModalOpen && (
        <Dialog open={helpModalOpen !== null} onOpenChange={() => setHelpModalOpen(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{getQuestionByField(helpModalOpen)?.label}</DialogTitle>
              <DialogDescription>
                {getQuestionByField(helpModalOpen)?.helpText}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} disabled={stepNumber === 1}>
          Terug
        </Button>
        <Button onClick={onNext} disabled={!isStepValid()} className="min-w-[120px]">
          Volgende
        </Button>
      </div>
    </>
  );
}
