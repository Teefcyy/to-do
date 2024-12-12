import React from 'react';
import { observer } from 'mobx-react-lite';
import { folderStore } from '../stores/FolderStore';
import { themeStore } from '../stores/ThemeStore';
import { 
  Inbox, 
  Calendar, 
  FolderPlus, 
  Sun, 
  Moon,
  CheckSquare
} from 'lucide-react';
import AddFolderDialog from './dialogs/AddFolderDialog';
import { useState } from 'react';

const Sidebar = observer(() => {
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col h-full">
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Inbox className="h-5 w-5" />
            <span>Inbox</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Calendar className="h-5 w-5" />
            <span>Upcoming</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <CheckSquare className="h-5 w-5" />
            <span>Completed</span>
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Folders</h3>
            <button
              onClick={() => setIsAddFolderOpen(true)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <FolderPlus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="space-y-1">
            {folderStore.folders.map((folder) => (
              <button
                key={folder.id}
                className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>{folder.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => themeStore.toggleTheme()}
            className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {themeStore.isDark ? (
              <>
                <Sun className="h-5 w-5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-5 w-5" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AddFolderDialog
        isOpen={isAddFolderOpen}
        onClose={() => setIsAddFolderOpen(false)}
      />
    </div>
  );
});

export default Sidebar;