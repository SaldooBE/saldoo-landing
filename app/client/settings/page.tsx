"use client"

import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { dummyClientPersonalInfo, dummyClientActivityInfo } from "@/lib/dummy-data"
import { Edit } from "lucide-react"

function ClientSettingsPage() {
  const personalInfo = dummyClientPersonalInfo
  const activityInfo = dummyClientActivityInfo

  return (
    <PageLayout breadcrumbItems={[{ label: "Settings" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground">
            Persoonlijke instellingen
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Persoonlijke gegevens</CardTitle>
                <CardDescription>Naam, e-mail, contactgegevens</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Bewerken
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Naam</Label>
                  <Input id="name" defaultValue={personalInfo.name} readOnly />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue={personalInfo.email} readOnly />
                </div>
                <div>
                  <Label htmlFor="phone">Telefoon</Label>
                  <Input id="phone" type="tel" defaultValue={personalInfo.phone} readOnly />
                </div>
                <div>
                  <Label htmlFor="address">Adres</Label>
                  <Input id="address" defaultValue={personalInfo.address} readOnly />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Activiteitsinfo</CardTitle>
                <CardDescription>Sector, beschrijving</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Bewerken
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Input id="sector" defaultValue={activityInfo.sector} readOnly />
                </div>
                <div>
                  <Label htmlFor="rechtsvorm">Rechtsvorm</Label>
                  <Input id="rechtsvorm" defaultValue={activityInfo.rechtsvorm} readOnly />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="btwNumber">BTW-nummer</Label>
                  <Input id="btwNumber" defaultValue={activityInfo.btwNumber} readOnly />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Beschrijving</Label>
                  <Textarea
                    id="description"
                    defaultValue={activityInfo.description}
                    readOnly
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wachtwoordinstellingen</CardTitle>
            <CardDescription>Wijzig je wachtwoord</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Huidig wachtwoord</Label>
                <Input id="currentPassword" type="password" placeholder="Voer je huidige wachtwoord in" />
              </div>
              <div>
                <Label htmlFor="newPassword">Nieuw wachtwoord</Label>
                <Input id="newPassword" type="password" placeholder="Voer je nieuwe wachtwoord in" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Bevestig nieuw wachtwoord</Label>
                <Input id="confirmPassword" type="password" placeholder="Bevestig je nieuwe wachtwoord" />
              </div>
              <Button>Wachtwoord wijzigen</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>E-mailvoorkeuren</CardTitle>
            <CardDescription>Notificatie-instellingen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>E-mail notificaties</Label>
                  <p className="text-sm text-muted-foreground">Ontvang e-mailmeldingen voor belangrijke gebeurtenissen</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Fiscale deadlines</Label>
                  <p className="text-sm text-muted-foreground">Herinneringen voor aanstaande deadlines</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Berichten van accountant</Label>
                  <p className="text-sm text-muted-foreground">E-mailmeldingen bij nieuwe berichten</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maandelijkse samenvatting</Label>
                  <p className="text-sm text-muted-foreground">Ontvang een maandelijkse samenvatting van je financiën</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

export default ClientSettingsPage

