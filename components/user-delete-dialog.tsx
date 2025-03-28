"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteUser } from "@/hooks/mutation";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { User } from "@/types";
import { AlertCircle } from "lucide-react";

// Define the props interface for UserDeleteDialog
interface UserDeleteDialogProps {
  user: User;
  onClose: () => void;
  onDelete: (user: User) => void;
}

export function UserDeleteDialog({ user, onClose, onDelete }: UserDeleteDialogProps) {
  const { mutateAsync: deleteUserById, isPending: isDeleting, error } = useDeleteUser();
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await deleteUserById(user);
      toast({
        title: "User deleted successfully.",
      });
      onDelete(user);
    } catch (error) {
      toast({
        title: getErrorMessage(error as Error),
        variant: "destructive",
      });
    } finally {
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>Are you sure you want to delete this user? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <div className="py-4">
          <p>
            You are about to delete{" "}
            <strong>
              {user.first_name} {user.last_name}
            </strong>
            .
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
