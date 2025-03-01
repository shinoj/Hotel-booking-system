import type { User } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { LogoutButton } from "@/components/logout-button"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </CardContent>
    </Card>
  )
}

