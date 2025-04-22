/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  item: any
  onDelete: () => void
}

export default function DeleteModal({ isOpen, onClose, item, onDelete }: DeleteModalProps) {
  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {item?.type === "folder" ? "Folder" : "File"}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {item?.name}? This action cannot be undone.
            {item?.type === "folder" && " All contents within this folder will also be deleted."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
