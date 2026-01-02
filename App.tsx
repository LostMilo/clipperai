import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ClipperView from './components/ClipperView';
import ConnectionsView from './components/ConnectionsView';
import WhopEngineView from './components/WhopEngineView';
import LandingPage from './components/LandingPage';
import { View, ProcessedClip, ConnectedAccount, SocialPlatform, WhopDeal } from './types';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [clips, setClips] = useState<ProcessedClip[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [autoStartDeal, setAutoStartDeal] = useState<WhopDeal | null>(null);

  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    { platform: SocialPlatform.YOUTUBE_SHORTS, username: '', connected: false },
    { platform: SocialPlatform.TIKTOK, username: '', connected: false },
    { platform: SocialPlatform.INSTAGRAM, username: '', connected: false },
    { platform: SocialPlatform.SNAPCHAT, username: '', connected: false },
    { platform: SocialPlatform.TWITTER, username: '', connected: false },
    { platform: 'Whop', username: '', connected: false }
  ]);

  useEffect(() => {
    const envKey = process.env.API_KEY;
    if (envKey) setApiKey(envKey);
  }, []);

  const handleAddClip = (clip: ProcessedClip) => {
    setClips((prev) => [clip, ...prev]);
  };

  const toggleConnection = (platform: SocialPlatform | 'Whop', connect: boolean) => {
    setAccounts(prev => prev.map(acc =>
      acc.platform === platform
        ? { ...acc, connected: connect, username: connect ? 'demo_user' : '' }
        : acc
    ));
  };

  const handleAutoClipDeal = (deal: WhopDeal) => {
    setAutoStartDeal(deal);
    setCurrentView(View.CLIPPER);
  };

  if (showLanding) {
    return (
      <LandingPage
        onEnterApp={() => {
          // Simulate login delay
          const btn = document.getElementById('login-btn');
          if (btn) btn.innerHTML = 'Authenticating...';

          setTimeout(() => {
            setShowLanding(false);
            setCurrentView(View.DASHBOARD);
          }, 800);
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />

      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        {currentView === View.DASHBOARD && (
          <DashboardView recentClips={clips} />
        )}

        {currentView === View.CLIPPER && (
          <ClipperView
            onAddClip={handleAddClip}
            connectedPlatforms={accounts.filter(a => a.connected && a.platform !== 'Whop').map(a => a.platform as SocialPlatform)}
            autoStartDeal={autoStartDeal}
          />
        )}

        {currentView === View.CONNECTIONS && (
          <ConnectionsView
            accounts={accounts}
            onConnect={(p) => toggleConnection(p, true)}
            onDisconnect={(p) => toggleConnection(p, false)}
          />
        )}

        {currentView === View.WHOP_ENGINE && (
          <WhopEngineView
            onAutoClipDeal={handleAutoClipDeal}
            isWhopConnected={accounts.find(a => a.platform === 'Whop')?.connected || false}
          />
        )}

        {currentView === View.LIBRARY && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-700">Library Feature Coming Soon</h2>
            <p className="text-slate-500">View all your historical clips here.</p>
          </div>
        )}

        {currentView === View.SETTINGS && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold mb-4">API Configuration</h3>
              <p className="text-slate-400 text-sm mb-4">
                The app uses <code className="bg-slate-700 px-1 rounded">process.env.API_KEY</code> by default.
              </p>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm">
                Note: In this simulated environment, the Gemini Service uses the environment variable.
                Ensure you are running this in an environment where the key is injected.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;