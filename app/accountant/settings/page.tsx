"use client"

import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { dummyOfficeInfo, dummyEmployees, dummyAPIIntegrations, dummyBillingInfo } from "@/lib/dummy-data"
import { CheckCircle2, XCircle, AlertCircle, Plus, Edit } from "lucide-react"

export default function AccountantSettingsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(amount)
  }

  const getIntegrationStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-gray-400" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getIntegrationStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Verbonden</Badge>
      case 'disconnected':
        return <Badge variant="secondary">Verbroken</Badge>
      case 'error':
        return <Badge variant="destructive">Fout</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Settings" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground">
            Kantoorinstellingen
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Kantoorinformatie</CardTitle>
                <CardDescription>Basisgegevens van het kantoor</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Bewerken
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-muted-foreground">Naam</Label>
                <p className="font-medium">{dummyOfficeInfo.name}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Adres</Label>
                <p>{dummyOfficeInfo.address}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Telefoon</Label>
                <p>{dummyOfficeInfo.phone}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">E-mail</Label>
                <p>{dummyOfficeInfo.email}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">BTW-nummer</Label>
                <p>{dummyOfficeInfo.btwNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Medewerkersbeheer</CardTitle>
                <CardDescription>Rollen: admin, medewerker</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Medewerker toevoegen
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Acties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <Badge variant={employee.role === 'admin' ? 'default' : 'secondary'}>
                        {employee.role === 'admin' ? 'Admin' : 'Medewerker'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={employee.active ? 'default' : 'secondary'}>
                        {employee.active ? 'Actief' : 'Inactief'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Bewerken</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>API-integraties</CardTitle>
                <CardDescription>Koppelen, ontkoppelen, sync logs</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Integratie toevoegen
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyAPIIntegrations.map((integration) => (
                <div key={integration.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getIntegrationStatusIcon(integration.status)}
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.type}</p>
                      </div>
                    </div>
                    {getIntegrationStatusBadge(integration.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Laatste sync:</span>
                      <span className="ml-2">{integration.lastSync || 'Niet gesynchroniseerd'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Totaal syncs:</span>
                      <span className="ml-2">{integration.syncCount || 0}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      {integration.status === 'connected' ? 'Ontkoppelen' : 'Koppelen'}
                    </Button>
                    <Button variant="outline" size="sm">Sync logs</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificatie-instellingen</CardTitle>
            <CardDescription>E-mail en meldingen</CardDescription>
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
                  <Label>Nieuwe AI-vragen</Label>
                  <p className="text-sm text-muted-foreground">Melding wanneer klanten nieuwe vragen stellen</p>
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
                  <Label>Sync fouten</Label>
                  <p className="text-sm text-muted-foreground">Melding bij synchronisatiefouten</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facturatie & abonnement</CardTitle>
            <CardDescription>Abonnement met Saldoo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Huidig plan</Label>
                  <p className="font-medium text-lg">{dummyBillingInfo.plan}</p>
                </div>
                <Badge variant={dummyBillingInfo.status === 'active' ? 'default' : 'secondary'}>
                  {dummyBillingInfo.status === 'active' ? 'Actief' : 'Geannuleerd'}
                </Badge>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Maandelijks bedrag</Label>
                <p className="text-2xl font-bold">{formatCurrency(dummyBillingInfo.price)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Volgende facturatie</Label>
                <p>{new Date(dummyBillingInfo.nextBillingDate).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Plan wijzigen</Button>
                <Button variant="outline">Facturen bekijken</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Belangrijk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Branding wordt hier <strong>niet</strong> beheerd door de accountant. 
              Dit wordt centraal beheerd in Saldoo Admin.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

