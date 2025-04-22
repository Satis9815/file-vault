/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import CreateFolderModal from "@/components/custom-ui/create-folder-moda"
import DeleteModal from "@/components/custom-ui/delete-modal"
import FileExplorer from "@/components/custom-ui/file-explorer"
import Header from "@/components/custom-ui/header"
import RenameModal from "@/components/custom-ui/rename-modal"
import UploadModal from "@/components/custom-ui/upload-modal"
import { useState } from "react"


export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false)
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleUpload = (files:any) => {
    console.log("Uploading files:", files)
    setIsUploadModalOpen(false)
  }

  const handleCreateFolder = (folderName:any) => {
    console.log("Creating folder:", folderName)
    setIsCreateFolderModalOpen(false)
  }

  const handleRename = (newName:any) => {
    console.log("Renaming item:", selectedItem, "to", newName)
    setIsRenameModalOpen(false)
  }

  const handleDelete = () => {
    console.log("Deleting item:", selectedItem)
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="min-h-screen  flex flex-col max-w-7xl mx-auto">
      <Header
        user={{
          name: "John Doe",
          email: "john@example.com",
        }}
      />

      <main className="flex-1 container mx-auto p-4">
        <FileExplorer
          onUpload={() => setIsUploadModalOpen(true)}
          onCreateFolder={() => setIsCreateFolderModalOpen(true)}
          onRename={(item) => {
            setSelectedItem(item)
            setIsRenameModalOpen(true)
          }}
          onDelete={(item) => {
            setSelectedItem(item)
            setIsDeleteModalOpen(true)
          }}
        />
      </main>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={handleUpload} />

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreate={handleCreateFolder}
      />

      <RenameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        item={selectedItem}
        onRename={handleRename}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        item={selectedItem}
        onDelete={handleDelete}
      />
    </div>
  )
}
