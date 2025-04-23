/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { baseUrl } from '@/apiConfigs/urlConfigs';
import CreateFolderModal from '@/components/custom-ui/create-folder-moda';
import DeleteModal from '@/components/custom-ui/delete-modal';
import FileExplorer from '@/components/custom-ui/file-explorer';
import Header from '@/components/custom-ui/header';
import RenameModal from '@/components/custom-ui/rename-modal';
import UploadModal from '@/components/custom-ui/upload-modal';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [fileListData, setFileListData] = useState([]);
  const [directoriesData, setDirectoriesData] = useState([]);
  const [deleteType, setDeleteType] = useState<string>('');
  const [renameType, setRenameType] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });

  const [loading, setLoading] = useState(true);

  const { dirId } = useParams();
  console.log(dirId);

  //Create directory
  const handleCreateFolder = async (folderName: any) => {
    // console.log('Creating folder:', folderName);
    setIsCreateFolderModalOpen(false);
    const response = await fetch(`${baseUrl}/directory/${dirId || ''}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        dirname: folderName,
      },
    });
    const result = await response.json();
    getDirectoryFiles();
  };

  // Rename
  const handleRename = async (newName: any) => {
    if (renameType === 'file') {
      const response = await fetch(`${baseUrl}/file/${selectedItem.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newFileName: newName }),
      });
    } else if (renameType === 'directory') {
      const response = await fetch(`${baseUrl}/directory/${selectedItem.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dirName: newName }),
      });
    }
    setIsRenameModalOpen(false);
    getDirectoryFiles();
  };

  // Delete file
  const handleDelete = async () => {
    if (deleteType === 'file') {
      const deleteFileResponse = await fetch(
        `${baseUrl}/file/${selectedItem.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
    } else if (deleteType === 'directory') {
      const deleteFileResponse = await fetch(
        `${baseUrl}/directory/${selectedItem.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
    }
    getDirectoryFiles();
    setIsDeleteModalOpen(false);
  };

  // Upload file
  const handleUpload = (files: any) => {
    setIsUploadModalOpen(false);
    uploadFile(files);
  };

  //   Upload file
  const uploadFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseUrl}/file/${dirId || ''}`, true);
    xhr.setRequestHeader('filename', file.name);
    xhr.withCredentials = true;
    xhr.addEventListener('load', () => {
      getDirectoryFiles();
      setProgress(0);
    });
    xhr.upload.addEventListener('progress', (event) => {
      const totalProgress = (event.loaded / event.total) * 100;
      setProgress(Number(totalProgress.toFixed(2)));
    });
    xhr.send(file);
  };

  async function getDirectoryFiles() {
    try {
      // setLoading(true);
      const files = await fetch(`${baseUrl}/directory/${dirId || ''}`, {
        credentials: 'include',
      });
      const data = await files.json();
      setFileListData(data.files);
      setDirectoriesData(data.directories);
      
    } catch (error) {
      setLoading(false);
      
    }finally{
      setLoading(false);
    }
 
  }

  useEffect(() => {
    getDirectoryFiles();
  }, [dirId]);

  const getUserDetails = async () => {
    const response = await fetch(`${baseUrl}/user`, {
      credentials: 'include',
    });
    const data = await response.json();
    console.log(response);
    if (response.ok) {
      setUserDetails({
        name: data.name,
        email: data.email,
      });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // Skeleton loading component
  const SkeletonRow = () => (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-9" />
      <Skeleton className="h-9" />
      <Skeleton className="h-9" />
      <Skeleton className="h-9" />
      <Skeleton className="h-9" />
    </div>
  );

  return (
    <div className="min-h-screen  flex flex-col max-w-7xl mx-auto">
      <Header
        user={userDetails}
        isAccess={!userDetails.name && !userDetails.email}
      />

      <main className="flex-1 container mx-auto p-4">
        {
          loading  ? <SkeletonRow/> : (

            <FileExplorer
            onUpload={() => setIsUploadModalOpen(true)}
            onCreateFolder={() => setIsCreateFolderModalOpen(true)}
            onRename={(item, type) => {
              setSelectedItem(item);
              setIsRenameModalOpen(true);
              setRenameType(type);
            }}
            onDelete={(item, type) => {
              setSelectedItem(item);
              setIsDeleteModalOpen(true);
              setDeleteType(type);
            }}
            fileListData={fileListData}
            directoriesData={directoriesData}
            isAccess={!userDetails.name && !userDetails.email}
          />

          )
        }
     
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />

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
  );
}
