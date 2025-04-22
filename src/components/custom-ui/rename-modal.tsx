/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"

interface RenameModalProps {
  isOpen: boolean
  onClose: () => void
  item: any
  onRename: (newName: string) => void
}

export default function RenameModal({ isOpen, onClose, item, onRename }: RenameModalProps) {
  const [newName, setNewName] = useState("")

  useEffect(() => {
    if (item && isOpen) {
      setNewName(item.name)
    }
  }, [item, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName.trim()) {
      onRename(newName.trim())
    }
  }

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename {item?.type === "folder" ? "Folder" : "File"}</DialogTitle>
            <DialogDescription>Enter a new name for {item?.name}.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newName">New Name</Label>
              <Input id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!newName.trim() || newName === item?.name}>
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
