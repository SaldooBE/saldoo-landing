import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StartPage() {
  return (
    <PageLayout breadcrumbItems={[{ label: "Start hier" }]}>
      <div
        className="w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 55, 124, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 55, 124, 0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[rgb(2,55,124)] md:text-4xl">
            Welkom bij Saldoo.
          </h1>
          <p className="mt-2 text-muted-foreground">
            Jouw startpunt voor een heldere, persoonlijke bedrijfsanalyse.
          </p>
        </div>

        <Card className="border-[rgba(2,55,124,0.15)]/50">
          <CardHeader>
            <CardTitle>Wat doen we?</CardTitle>
            <CardDescription>
              Saldoo helpt KMO-ondernemers snel inzicht te krijgen in cijfers en verbeterpunten —
              zoals een boekhouder dat zou doen, maar dan altijd beschikbaar en duidelijk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold text-[rgb(2,55,124)]">Voor wie is het bedoeld?</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>KMO-ondernemers en zaakvoerders die grip willen op hun cijfers.</li>
                  <li>Teams die snel een objectieve analyse willen zonder complexe tools.</li>
                  <li>Iedereen die resultaat wil zien in duidelijke taal en concrete stappen.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-[rgb(2,55,124)]">Hoe werkt het?</h3>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Ga eerst naar <span className="font-medium text-foreground">Upload & context</span>.</li>
                  <li>Vul de context van je onderneming in (sector, grootte, doelen).</li>
                  <li>Upload je relevante documenten en/of data.</li>
                  <li>Wij analyseren — je krijgt een helder overzicht en aanbevelingen.</li>
                </ol>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground text-center">
                Klaar om te starten? Doorloop eerst de upload en context. Daarna kun je je
                persoonlijke analyse bekijken.
              </p>
              <Button
                asChild
                style={{ backgroundColor: "rgba(2, 55, 124, 0.75)" }}
                className="hover:opacity-90"
              >
                <Link href="/upload">Mijn persoonlijke analyse</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </PageLayout>
  )
}

