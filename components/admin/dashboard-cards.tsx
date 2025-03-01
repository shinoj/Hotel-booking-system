import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, CalendarDays, DollarSign } from "lucide-react"

interface DashboardCardsProps {
  stats: {
    totalHotels: number
    totalUsers: number
    totalBookings: number
    revenue: number
  }
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  const { totalHotels, totalUsers, totalBookings, revenue } = stats

  const cards = [
    {
      title: "Total Hotels",
      value: totalHotels,
      icon: Building2,
      color: "text-blue-500",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: CalendarDays,
      color: "text-orange-500",
    },
    {
      title: "Total Revenue",
      value: `$${revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

