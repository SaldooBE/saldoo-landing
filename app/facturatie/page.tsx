import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FacturatiePage() {
  return (
    <PageLayout breadcrumbItems={[{ label: "Facturatie" }]}> 
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-[rgba(2,55,124,0.15)]/50">
          <CardHeader>
            <CardTitle>Factuur raadplegen</CardTitle>
            <CardDescription>
              Bekijk hier je laatste factuur. Gewoon downloaden en toevoegen aan je boekhouding!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
              Je factuur is momenteel nog niet beschikbaar. Zodra er een factuur klaarstaat, verschijnt die hier automatisch.
            </div>
            {/*
              Als je later een PDF wilt tonen, vervang de onderstaande placeholder door bijvoorbeeld:
              <iframe src="/factuur.pdf" className="mt-4 h-[70vh] w-full rounded border" />
            */}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}


