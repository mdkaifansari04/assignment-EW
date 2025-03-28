"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUser } from "@/hooks/mutation";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { User } from "@/types";
import React, { ChangeEvent, useState } from "react";

// Define the props interface for UserEditDialog
interface UserEditDialogProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

export function UserEditDialog({ user, onClose, onUpdate }: UserEditDialogProps) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const { toast } = useToast();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    updateUser(user, {
      onSuccess: (response) => {
        toast({
          title: "User Updated",
          description: `${response.first_name} ${response.last_name} has been updated.`,
        });
        onUpdate(response);
      },
      onError: (error) => {
        toast({
          title: getErrorMessage(error),
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Make changes to the user profile here.</DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={(e) => handleSubmit(e)} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
