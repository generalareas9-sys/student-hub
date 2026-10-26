import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import RightPanel from './RightPanel';
import HelpModal from '../widgets/HelpModal';

export default function AppShell({ children, showRightPanel = true, onSearch, searchValue }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`app-shell ${!showRightPanel ? 'app-shell--no-right' : ''}`} id="appShell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content" id="mainContent">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onSearch={onSearch}
          searchValue={searchValue}
        />
        {children}
      </main>

      {showRightPanel && <RightPanel />}

      <HelpModal />
    </div>
  );
}
