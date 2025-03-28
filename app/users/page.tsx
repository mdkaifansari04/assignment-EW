"use client";

import UserCard from "@/components/data-display/user-card";
import { UserCardPendingView } from "@/components/shared/pending-view";
import QueryWrapper from "@/components/shared/query-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { UserDeleteDialog } from "@/components/user-delete-dialog";
import { UserEditDialog } from "@/components/user-edit-dialog";
import { useDeleteUser, useUpdateUser } from "@/hooks/mutation";
import { useGetUser } from "@/hooks/queries";
import { useToast } from "@/hooks/use-toast";
import { accessTokenStorage } from "@/lib/token-storage";
import { getErrorMessage } from "@/lib/utils";
import { User } from "@/types";
import { Edit, LogOut, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const { data, error, isError, isPending: isFethingUser, isFetched } = useGetUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  useEffect(() => {
    if (isFetched && data && !error) {
      setUsers(data.data);
    }
    if (users.length > 0 && searchQuery) {
      const filtered = users.filter((user) => user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users, isFetched]);

  const handleLogout = (): void => {
    accessTokenStorage.delete();
    router.push("/login");
  };

  const handleEditUser = (user: User): void => {
    setEditUser(user);
  };

  const handleDeleteUser = (user: User): void => {
    setDeleteUser(user);
  };

  const handleUserUpdated = (updatedUser: User): void => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditUser(null);
  };

  const handleUserDeleted = (deletedUser: User): void => {
    setUsers(users.filter((user) => user.id !== deletedUser.id));
    setDeleteUser(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">User Management</CardTitle>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <QueryWrapper
            data={data}
            error={error}
            isError={isError}
            isPending={isFethingUser}
            pendingView={<UserCardPendingView />}
            emptyDataView={<NoUserFoundView />}
            view={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user, k) => (
                  <UserCard key={`user-card-${k}}`} user={user} onEdit={handleEditUser} onDelete={handleDeleteUser} />
                ))}
              </div>
            }
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink isActive={page === currentPage} onClick={() => setCurrentPage(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {editUser && <UserEditDialog user={editUser} onClose={() => setEditUser(null)} onUpdate={handleUserUpdated} />}

      {deleteUser && <UserDeleteDialog user={deleteUser} onClose={() => setDeleteUser(null)} onDelete={handleUserDeleted} />}
    </div>
  );
}

export const NoUserFoundView = () => {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No users found</p>
    </div>
  );
};
