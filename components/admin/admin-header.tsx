import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

interface AdminHeaderProps {
  title: string
  createHref?: string
  createLabel?: string
}

export function AdminHeader({ title, createHref, createLabel }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      {createHref && (
        <Link href={createHref}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {createLabel || "Create"}
          </Button>
        </Link>
      )}
    </div>
  )
}

