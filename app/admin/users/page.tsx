import { getAllUsers } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { UsersTable } from "@/components/admin/users-table"

export default async function AdminUsersPage() {
  const users = await getAllUsers()

  return (
    <div className="container mx-auto py-10">
      <AdminHeader title="Users" />

      <div className="mt-8">
        <UsersTable users={users} />
      </div>
    </div>
  )
}

