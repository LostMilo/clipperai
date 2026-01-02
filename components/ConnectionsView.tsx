import React from 'react';
import { ConnectedAccount, SocialPlatform } from '../types';

interface ConnectionsViewProps {
  accounts: ConnectedAccount[];
  onConnect: (platform: SocialPlatform | 'Whop') => void;
  onDisconnect: (platform: SocialPlatform | 'Whop') => void;
}

const ConnectionsView: React.FC<ConnectionsViewProps> = ({ accounts, onConnect, onDisconnect }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case SocialPlatform.YOUTUBE_SHORTS: return 'text-red-500';
      case SocialPlatform.TIKTOK: return 'text-pink-500';
      case SocialPlatform.TWITTER: return 'text-blue-400';
      case SocialPlatform.INSTAGRAM: return 'text-purple-500';
      case SocialPlatform.SNAPCHAT: return 'text-yellow-400';
      case 'Whop': return 'text-orange-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Connected Accounts</h2>
        <p className="text-slate-400">Manage your distribution channels and Whop integration.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {accounts.map((account) => (
          <div key={account.platform} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center justify-between transition-all hover:bg-slate-800">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 ${getIcon(account.platform)}`}>
                 {/* Simple Icon placeholder logic */}
                 <span className="text-xl font-bold">{account.platform[0]}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{account.platform}</h3>
                <p className="text-sm text-slate-400">
                  {account.connected ? `Connected as @${account.username}` : 'Not connected'}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => account.connected ? onDisconnect(account.platform) : onConnect(account.platform)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                account.connected 
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                  : 'bg-white text-slate-900 hover:bg-slate-200 shadow-lg shadow-white/5'
              }`}
            >
              {account.connected ? 'Disconnect' : 'Connect Account'}
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
        <h3 className="text-xl font-bold text-orange-400 mb-2">Why connect Whop?</h3>
        <p className="text-slate-300">
          Connecting your Whop account enables the <strong>OW Engine</strong> to automatically scout for high-commission affiliate deals and sync them with your content strategy.
        </p>
      </div>
    </div>
  );
};

export default ConnectionsView;