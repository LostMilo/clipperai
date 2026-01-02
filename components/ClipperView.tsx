import React, { useState, useEffect } from 'react';
import { VideoInfo, ClipMetadata, ClipStatus, ProcessedClip, SocialPlatform, WhopDeal } from '../types';
import { analyzeVideoForClips, fetchRealVideoMetadata } from '../services/geminiService';
import ShareConfigModal from './ShareConfigModal';

interface ClipperViewProps {
  onAddClip: (clip: ProcessedClip) => void;
  connectedPlatforms: SocialPlatform[];
  autoStartDeal?: WhopDeal | null;
}

const ClipperView: React.FC<ClipperViewProps> = ({ onAddClip, connectedPlatforms, autoStartDeal }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [generatedClips, setGeneratedClips] = useState<ClipMetadata[]>([]);
  const [clipStates, setClipStates] = useState<Record<string, { uploaded: boolean, platforms: SocialPlatform[] }>>({});
  const [activeClipForSharing, setActiveClipForSharing] = useState<ClipMetadata | null>(null);

  // Handle Autopilot Trigger
  useEffect(() => {
    if (autoStartDeal) {
        setUrl(autoStartDeal.relatedVideoUrl);
        // Force a small delay to allow state update then fetch
        setTimeout(() => handleFetchVideo(autoStartDeal.relatedVideoUrl), 500);
    }
  }, [autoStartDeal]);

  // Handle Fetch
  const handleFetchVideo = async (overrideUrl?: string) => {
    const targetUrl = overrideUrl || url;
    if (!targetUrl.includes('youtube.com') && !targetUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    setError(null);
    setLoading(true);

    try {
        const info = await fetchRealVideoMetadata(targetUrl);
        setVideoInfo(info);
        setLoading(false);
        setStep(2);
        
        // If autopilot, continue to analyze
        if (autoStartDeal) {
            handleAnalyze(info);
        }
    } catch (e: any) {
        setLoading(false);
        setError(e.message || "Failed to fetch video info");
    }
  };

  const handleAnalyze = async (infoOverride?: VideoInfo) => {
    const info = infoOverride || videoInfo;
    if (!info) return;
    
    setLoading(true);
    setError(null);

    try {
      // In a real app, we would pass the actual transcript here.
      // For demo, we let the service use a simulated transcript based on the title.
      // NOTE: Whop context is injected if autoStartDeal exists
      const context = autoStartDeal ? `Context: Whop Deal Analysis for ${autoStartDeal.name} (Commission: ${autoStartDeal.commission}). Find clips that sell this specific opportunity.` : "";
      
      const clips = await analyzeVideoForClips(info.title, context);
      setGeneratedClips(clips);
      setStep(3);
    } catch (err: any) {
      setError("Failed to analyze video. Ensure API Key is set in Settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleShareComplete = (platforms: SocialPlatform[], configs: Record<SocialPlatform, string>) => {
    if (!activeClipForSharing) return;
    
    const clipId = activeClipForSharing.id;
    
    // Update local state to reflect uploaded status
    setClipStates(prev => ({
        ...prev,
        [clipId]: { uploaded: true, platforms }
    }));

    // Add to global dashboard history
    const processed: ProcessedClip = {
        ...activeClipForSharing,
        status: ClipStatus.UPLOADED,
        videoUrl: videoInfo!.url,
        uploadUrl: `https://youtube.com/shorts/${Math.random().toString(36).substring(7)}`,
        sharedTo: platforms,
        sourceType: autoStartDeal ? 'WHOP_AUTOPILOT' : 'MANUAL',
        whopDealId: autoStartDeal?.id
    };
    onAddClip(processed);

    // Close modal
    setActiveClipForSharing(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {activeClipForSharing && (
        <ShareConfigModal 
          clip={activeClipForSharing}
          onClose={() => setActiveClipForSharing(null)}
          onShare={handleShareComplete}
          connectedPlatforms={connectedPlatforms}
        />
      )}

      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= s ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              {s}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${step >= s ? 'text-white' : 'text-slate-400'}`}>
                {s === 1 ? 'Input URL' : s === 2 ? 'Analysis' : 'Review & Share'}
              </p>
            </div>
            {s < 3 && <div className="w-12 h-1 bg-slate-800 mx-4" />}
          </div>
        ))}
      </div>

      {/* Step 1: Input */}
      {step === 1 && (
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Start with a YouTube Link</h2>
          <p className="text-slate-400 mb-8">
             We verify the video using standard oEmbed protocols and AI analysis.
          </p>
          
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-5 py-4 pl-12 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              />
              <svg className="w-6 h-6 text-slate-500 absolute left-4 top-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </div>
            
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            <button
              onClick={() => handleFetchVideo()}
              disabled={loading || !url}
              className={`mt-6 w-full py-4 rounded-xl font-bold text-white transition-all ${
                loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/20'
              }`}
            >
              {loading ? 'Fetching & Verifying...' : 'Analyze Video'}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Confirm & Analyze */}
      {step === 2 && videoInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Video Source</h3>
            <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full rounded-lg mb-4" />
            <h4 className="text-xl font-bold text-white leading-tight mb-2">{videoInfo.title}</h4>
            <div className="flex items-center text-slate-400 text-sm mb-6">
              <span className="bg-slate-700 px-2 py-1 rounded text-xs text-white mr-3">{videoInfo.duration}</span>
              <span>{videoInfo.channel}</span>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-slate-400 text-sm hover:text-white"
            >
              ← Change Video
            </button>
          </div>

          <div className="flex flex-col justify-center bg-slate-800/30 p-8 rounded-2xl border border-slate-700 border-dashed">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Virality Analysis</h3>
              {autoStartDeal ? (
                <p className="text-orange-400 mb-6 font-medium">Running Whop Autopilot Optimization...</p>
              ) : (
                <p className="text-slate-400 mb-6">
                    Gemini will scan the content to identify viral moments suited for Shorts, Reels, and TikTok.
                </p>
              )}
              
              {error && <p className="text-red-400 mb-4">{error}</p>}

              <button
                onClick={() => handleAnalyze()}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center ${
                  loading ? 'bg-slate-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Content...
                  </>
                ) : (
                  'Run Analysis'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Suggested Viral Clips</h2>
            <button onClick={() => setStep(2)} className="text-slate-400 hover:text-white">Restart Analysis</button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {generatedClips.map((clip) => {
              const clipState = clipStates[clip.id];
              const isUploaded = clipState?.uploaded;

              return (
                <div key={clip.id} className={`bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden transition-all ${isUploaded ? 'opacity-75' : ''}`}>
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    {/* Fake Video Preview */}
                    <div className="w-full md:w-64 bg-black rounded-lg flex items-center justify-center relative aspect-video flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                         <svg className="w-12 h-12 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                        {clip.startTime} - {clip.endTime}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{clip.title}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          clip.viralityScore > 85 ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}>
                          Score: {clip.viralityScore}
                        </div>
                      </div>
                      
                      <p className="text-slate-400 text-sm mb-4">{clip.reasoning}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {clip.suggestedHashtags.map(tag => (
                          <span key={tag} className="text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                        <div className="text-slate-500 text-sm flex items-center gap-2">
                           <span>Published to:</span>
                           {isUploaded && clipState.platforms.length > 0 ? (
                               <div className="flex -space-x-1">
                                   {clipState.platforms.includes(SocialPlatform.YOUTUBE_SHORTS) && <div className="w-4 h-4 rounded-full bg-red-500" title="YouTube"></div>}
                                   {clipState.platforms.includes(SocialPlatform.TIKTOK) && <div className="w-4 h-4 rounded-full bg-pink-500" title="TikTok"></div>}
                                   {clipState.platforms.includes(SocialPlatform.TWITTER) && <div className="w-4 h-4 rounded-full bg-blue-400" title="Twitter"></div>}
                                   {clipState.platforms.includes(SocialPlatform.INSTAGRAM) && <div className="w-4 h-4 rounded-full bg-purple-500" title="Instagram"></div>}
                                   {clipState.platforms.includes(SocialPlatform.SNAPCHAT) && <div className="w-4 h-4 rounded-full bg-yellow-400" title="Snapchat"></div>}
                               </div>
                           ) : (
                               <span className="text-slate-600 italic">None yet</span>
                           )}
                        </div>
                        <button
                          onClick={() => setActiveClipForSharing(clip)}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            isUploaded 
                                ? 'bg-slate-700 text-white hover:bg-slate-600'
                                : 'bg-white text-slate-900 hover:bg-slate-200'
                          }`}
                        >
                          {isUploaded ? 'Share Again' : 'Configure & Share'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClipperView;