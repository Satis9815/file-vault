/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  File,
  FileText,
  Folder,
  ImageIcon,
  Music,
  Video,
  Upload,
  FolderPlus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  FileCode,
  FileIcon as FilePdf,
  FileArchive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"

// Sample data structure
const initialFiles = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "Work",
        type: "folder",
        children: [
          { id: "1-1-1", name: "Project Proposal.docx", type: "file", fileType: "document" },
          { id: "1-1-2", name: "Budget.xlsx", type: "file", fileType: "spreadsheet" },
        ],
      },
      {
        id: "1-2",
        name: "Personal",
        type: "folder",
        children: [{ id: "1-2-1", name: "Resume.pdf", type: "file", fileType: "pdf" }],
      },
    ],
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    children: [
      { id: "2-1", name: "Vacation.jpg", type: "file", fileType: "image" },
      { id: "2-2", name: "Profile.png", type: "file", fileType: "image" },
    ],
  },
  { id: "3", name: "Music.mp3", type: "file", fileType: "audio" },
  { id: "4", name: "Video.mp4", type: "file", fileType: "video" },
  { id: "5", name: "Archive.zip", type: "file", fileType: "archive" },
  { id: "6", name: "Code.js", type: "file", fileType: "code" },
]

interface FileExplorerProps {
  onUpload: () => void
  onCreateFolder: () => void
  onRename: (item: any) => void
  onDelete: (item: any) => void
}

export default function FileExplorer({ onUpload, onCreateFolder, onRename, onDelete }: FileExplorerProps) {
  const [files, setFiles] = useState<any>(initialFiles)
  const [currentPath, setCurrentPath] = useState<any>([])
  const [expandedFolders, setExpandedFolders] = useState<any>({})

  // Get current directory based on path
  const getCurrentDirectory = () => {
    let current = files
    for (const pathId of currentPath) {
      const folder = current.find((item:any) => item.id === pathId)
      if (folder && folder.children) {
        current = folder.children
      }
    }
    return current
  }

  // Toggle folder expansion
  const toggleFolder = (folderId:any) => {
    setExpandedFolders((prev:any) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  // Navigate to folder
  const navigateToFolder = (folder:any) => {
    setCurrentPath([...currentPath, folder.id])
  }



  // Navigate to specific path index
  const navigateToPathIndex = (index:any) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  // Get icon based on file type
  const getFileIcon = (file:any) => {
    if (file.type === "folder") return <Folder className="h-5 w-5 text-slate-500" />

    switch (file.fileType) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case "audio":
        return <Music className="h-5 w-5 text-purple-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "spreadsheet":
        return <FileText className="h-5 w-5 text-green-600" />
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-600" />
      case "code":
        return <FileCode className="h-5 w-5 text-yellow-600" />
      case "archive":
        return <FileArchive className="h-5 w-5 text-slate-600" />
      default:
        return <File className="h-5 w-5 text-slate-500" />
    }
  }

  // Build breadcrumb path
  const getBreadcrumbPath = () => {
    const path = [{ id: "root", name: "Home" }]
    let current = files

    for (const pathId of currentPath) {
      const folder = current.find((item:any) => item.id === pathId)
      if (folder) {
        path.push(folder)
        if (folder.children) {
          current = folder.children
        }
      }
    }

    return path
  }

  const currentFiles = getCurrentDirectory()
  const breadcrumbPath = getBreadcrumbPath()



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb className="flex items-center">
          {breadcrumbPath.map((item, index) => (
            <div key={item.id} className="flex items-center list-none">
              {index > 0 && <BreadcrumbSeparator className="flex items-center" />}
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => (index === 0 ? setCurrentPath([]) : navigateToPathIndex(index - 1))}
                  className="cursor-pointer"
                >
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          ))}
        </Breadcrumb>

        <div className="flex space-x-2">
          <Button size="sm" onClick={onUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button size="sm" variant="outline" onClick={onCreateFolder}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {currentFiles.map((item:any) => (
              <div key={item.id} className="p-3 hover:bg-slate-50 flex items-center justify-between group">
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() =>
                    item.type === "folder" ? navigateToFolder(item) : console.log("Opening file:", item.name)
                  }
                >
                  {item.type === "folder" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFolder(item.id)
                      }}
                      className="w-5 h-5 flex items-center justify-center"
                    >
                      {expandedFolders[item.id] ? (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  )}
                  {item.type !== "folder" && <div className="w-5" />}
                  {getFileIcon(item)}
                  <span>{item.name}</span>
                </div>

                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRename(item)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(item)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {currentFiles.length === 0 && <div className="p-8 text-center text-slate-500">This folder is empty</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
