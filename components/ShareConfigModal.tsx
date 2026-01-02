import React, { useState } from 'react';
import { ClipMetadata, SocialPlatform } from '../types';

interface ShareConfigModalProps {
  clip: ClipMetadata;
  onClose: () => void;
  onShare: (platforms: SocialPlatform[], configs: Record<SocialPlatform, string>) => void;
  connectedPlatforms: SocialPlatform[];
}

const PLATFORMS_CONFIG = [
  { id: SocialPlatform.YOUTUBE_SHORTS, label: 'YouTube Shorts', color: 'text-red-500', bg: 'bg-red-500/10', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
  { id: SocialPlatform.TIKTOK, label: 'TikTok', color: 'text-pink-500', bg: 'bg-pink-500/10', icon: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' },
  { id: SocialPlatform.INSTAGRAM, label: 'Instagram Reels', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { id: SocialPlatform.SNAPCHAT, label: 'Snapchat Spotlight', color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: 'M12.016 1.344c-3.086 0-5.789 2.05-6.387 5.09-.344 1.742.062 3.578 1.055 4.965.234.336.195.824-.133 1.137-.582.55-1.426.836-2.27.87-1.144.051-2.288-.386-3.07-.98-.824-.625-1.203-.496-1.16.535.035.793.684 2.023 1.254 2.508 1.055.902 2.379.809 2.574 1.75.031.148.008.305-.059.445-.371.77-1.465 1.266-2.527.79-.535-.243-.902.261-.59.726.656.977 1.879 1.246 2.516 1.32.742.09 1.445-.164 1.957-.707.133-.14.344-.191.531-.133.91.285 1.543.43 2.152.484 1.383.125 2.164 1.559 3.328 1.559.395 0 .762-.125 1.156-.395.27-.183.567-.324.965-.324.398 0 .695.14.961.324.398.27.766.395 1.164.395 1.16 0 1.941-1.434 3.324-1.559.613-.054 1.242-.199 2.152-.484.188-.058.398-.007.531.133.512.543 1.215.797 1.957.707.637-.074 1.86-.343 2.516-1.32.312-.465-.055-.969-.59-.726-1.062.476-2.156-.02-2.527-.79-.066-.14-.09-.297-.059-.445.195-.941 1.52-0.848 2.574-1.75.57-.485 1.219-1.715 1.254-2.508.043-1.031-.336-1.16-1.16-.535-.781.594-1.926 1.031-3.07.98-.844-.034-1.688-.32-2.27-.87-.328-.313-.367-.801-.133-1.137.992-1.387 1.398-3.223 1.055-4.965-.598-3.04-3.301-5.09-6.387-5.09h-.004z' },
  { id: SocialPlatform.TWITTER, label: 'Twitter / X', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' }
];

const ShareConfigModal: React.FC<ShareConfigModalProps> = ({ clip, onClose, onShare, connectedPlatforms }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<SocialPlatform>>(new Set());
  const [messages, setMessages] = useState<Record<string, string>>(() => {
    const defaultMsg = `${clip.title}\n\n${clip.suggestedHashtags.join(' ')}`;
    const initial: Record<string, string> = {};
    Object.values(SocialPlatform).forEach(p => initial[p] = defaultMsg);
    return initial;
  });
  const [isPosting, setIsPosting] = useState(false);
  const [postProgress, setPostProgress] = useState<Record<string, 'idle' | 'posting' | 'success'>>({});

  const togglePlatform = (platform: SocialPlatform) => {
    // Only allow if connected
    if (!connectedPlatforms.includes(platform)) return;

    const next = new Set(selectedPlatforms);
    if (next.has(platform)) {
      next.delete(platform);
    } else {
      next.add(platform);
    }
    setSelectedPlatforms(next);
  };

  const updateMessage = (platform: SocialPlatform, text: string) => {
    setMessages(prev => ({ ...prev, [platform]: text }));
  };

  const handleShare = async () => {
    setIsPosting(true);
    const platforms = Array.from(selectedPlatforms) as SocialPlatform[];
    
    // Initialize progress
    const progress: Record<string, 'posting'> = {};
    platforms.forEach(p => progress[p] = 'posting');
    setPostProgress(prev => ({ ...prev, ...progress }));

    // Simulate API calls
    for (const platform of platforms) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
      setPostProgress(prev => ({ ...prev, [platform]: 'success' }));
    }

    // Finish
    setTimeout(() => {
      onShare(platforms, messages);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Distribute Clip</h2>
            <p className="text-sm text-slate-400 mt-1">{clip.title}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg">
             <span className="font-semibold text-purple-400">Virality Score: {clip.viralityScore}</span>
             <span>•</span>
             <span>Duration: {clip.startTime} - {clip.endTime}</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Select Platforms</h3>
            
            {PLATFORMS_CONFIG.map((platform) => {
              const isSelected = selectedPlatforms.has(platform.id);
              const isConnected = connectedPlatforms.includes(platform.id);
              const status = postProgress[platform.id];

              return (
                <div 
                  key={platform.id} 
                  className={`border rounded-xl transition-all duration-200 ${
                    !isConnected ? 'opacity-50 cursor-not-allowed border-slate-800 bg-slate-900' :
                    isSelected 
                      ? 'border-purple-500/50 bg-slate-800/50' 
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div 
                    className={`flex items-center p-4 select-none ${isConnected && !isPosting ? 'cursor-pointer' : ''}`}
                    onClick={() => !isPosting && isConnected && togglePlatform(platform.id)}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center mr-4 transition-colors ${
                      isSelected ? 'bg-purple-600 border-purple-600' : 'border-slate-600'
                    }`}>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    <div className={`p-2 rounded-lg mr-3 ${platform.bg}`}>
                      <svg className={`w-5 h-5 ${platform.color}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d={platform.icon} />
                      </svg>
                    </div>
                    
                    <span className={`font-medium ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {platform.label} {!isConnected && '(Not Connected)'}
                    </span>

                    {status === 'posting' && (
                      <span className="ml-auto text-purple-400 text-sm flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting...
                      </span>
                    )}
                    {status === 'success' && (
                      <span className="ml-auto text-green-400 text-sm flex items-center font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Published
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <div className="px-4 pb-4 pl-14">
                      <label className="block text-xs text-slate-500 mb-1">Caption / Tweet</label>
                      <textarea
                        value={messages[platform.id]}
                        onChange={(e) => updateMessage(platform.id, e.target.value)}
                        disabled={isPosting}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            disabled={isPosting}
            className="px-5 py-2.5 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={isPosting || selectedPlatforms.size === 0}
            className="px-6 py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isPosting ? 'Publishing...' : `Publish to ${selectedPlatforms.size} Platform${selectedPlatforms.size !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareConfigModal;