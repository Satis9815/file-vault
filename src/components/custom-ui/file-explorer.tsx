/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
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
  FileCode,
  FileIcon as FilePdf,
  FileArchive,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { baseUrl } from '@/apiConfigs/urlConfigs';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface FileExplorerProps {
  onUpload: () => void;
  onCreateFolder: () => void;
  onRename: (item: any, type: string) => void;
  onDelete: (item: any, type: string) => void;
  fileListData?: any;
  directoriesData?: any;
  isAccess?:boolean
}

export default function FileExplorer({
  onUpload,
  onCreateFolder,
  onRename,
  onDelete,
  fileListData,
  directoriesData,
  isAccess
}: FileExplorerProps) {
  console.log(directoriesData)
  // Get icon based on file type
  const getFileIcon = (fileType: any) => {
    // if (file === "folder") return <Folder className="h-5 w-5 text-slate-500" />
    console.log(fileType);

    switch (fileType?.toLowerCase()) {
      case 'jpeg':
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      case 'png':
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      case 'jpg':
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      case 'mp3':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'mp4':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'spreadsheet':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'pdf':
        return <FilePdf className="h-5 w-5 text-red-600" />;
      case 'code':
        return <FileCode className="h-5 w-5 text-yellow-600" />;
      case 'archive':
        return <FileArchive className="h-5 w-5 text-slate-600" />;
      default:
        return <Folder className="h-5 w-5 text-slate-500" />;
    }
  };
  // const downloadFile = async(file:any)=>{
  //   console.log(file);
  //  await fetch(`${baseUrl}/file/${file.id}?action=download`,
  //   {
  //     credentials: 'include',
  //   }
  //  )

  // }

  

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button size="sm" onClick={onUpload} disabled={isAccess}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button size="sm" variant="outline" onClick={onCreateFolder} disabled={isAccess}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {fileListData?.map((item: any) => (
              <div
            
                key={item.id}
                className="p-3 hover:bg-slate-50 flex items-center justify-between group"
              >
                <Link     href={`${baseUrl}/file/${item.id}`} className="flex items-center space-x-3 cursor-pointer">
                  {getFileIcon(item.name?.split('.').pop())}
                  <span>{item.name}</span>
                </Link>

                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRename(item, 'file');
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item, 'file');
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Link
                  className='h-9 w-9  flex items-center justify-center'
                    href={`${baseUrl}/file/${item.id}?action=download`}
                    title="Download"
                  >
                    <Download size={18}  className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
            {directoriesData?.map((item: any) => (
              <div
             
                key={item.id}
                className="p-3 hover:bg-slate-50 flex items-center justify-between group"
              >
                <Link    href={`/dashboard/${item.id}`} className="flex items-center space-x-3 cursor-pointer">
                  {getFileIcon(item.name?.split('.').pop())}
                  <span>{item.name}</span>
                </Link>

                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRename(item, 'directory');
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item, 'directory');
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {isAccess && (
              <div className="p-8 text-center text-slate-500">
                You don&apos;t have  Permisson.Please Login first <Link className='text-indigo-600' href={"/login"}>Here</Link>
              </div>
            )}
            {directoriesData?.length === 0 && fileListData?.length===0  && (
              <div className="p-8 text-center text-slate-500">
                No files and folder found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
