import React, { useState, useEffect, useRef } from 'react';
import { WhopDeal, WhopEngineLog } from '../types';
import { scourWhopForDeals } from '../services/whopService';

interface WhopEngineViewProps {
  onAutoClipDeal: (deal: WhopDeal) => void;
  isWhopConnected: boolean;
}

const WhopEngineView: React.FC<WhopEngineViewProps> = ({ onAutoClipDeal, isWhopConnected }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<WhopEngineLog[]>([]);
  const [scoutedDeals, setScoutedDeals] = useState<WhopDeal[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: WhopEngineLog['type'] = 'INFO', deal?: WhopDeal) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(),
      timestamp: new Date(),
      message,
      type,
      deal
    }]);
  };

  useEffect(() => {
    let interval: any;

    if (isRunning && isWhopConnected) {
      addLog('Starting Opportunity Watcher (OW) Engine...', 'INFO');
      
      interval = setInterval(async () => {
        // 1. Log searching
        addLog('Scouring Whop marketplace for high-volume signals...', 'INFO');
        
        // 2. Find Deal
        const deal = await scourWhopForDeals();
        setScoutedDeals(prev => [deal, ...prev].slice(0, 5)); // Keep last 5
        addLog(`Opportunity Detected: ${deal.name} (${deal.monthlyVolume}/mo vol)`, 'DEAL_FOUND', deal);

        // 3. Trigger Auto-Clip (Simulated for UI effect, usually would be a background job)
        addLog(`Locating viral creative for ${deal.name}...`, 'INFO');
        
        // Randomly succeed to auto-clip
        if (Math.random() > 0.3) {
             addLog(`Creative found. Initializing Clipper...`, 'SUCCESS');
             onAutoClipDeal(deal);
        } else {
            addLog(`No high-quality creative found for ${deal.name}, skipping.`, 'INFO');
        }

      }, 6000); // Run every 6 seconds for demo
    }

    return () => clearInterval(interval);
  }, [isRunning, isWhopConnected]);

  if (!isWhopConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Whop Account Required</h2>
        <p className="text-slate-400 max-w-md mb-6">To use the Auto-Pilot Opportunity Watcher, you must connect your Whop account first.</p>
        <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors">
          Go to Connections
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
      {/* Control Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-2">OW Engine</h2>
          <p className="text-slate-400 text-sm mb-6">Auto-pilot mode identifies viral opportunities on Whop and generates clips automatically.</p>
          
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center space-x-3 ${
              isRunning 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
                : 'bg-green-500 hover:bg-green-400 text-slate-900'
            }`}
          >
            {isRunning ? (
                <>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span>Stop Autopilot</span>
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Start Engine</span>
                </>
            )}
          </button>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Scanned Today</span>
              <span className="text-white font-mono">1,024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Opportunities Found</span>
              <span className="text-green-400 font-mono">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Auto-Clips Generated</span>
              <span className="text-purple-400 font-mono">8</span>
            </div>
          </div>
        </div>

        {/* Scouted Deals List */}
        <div className="space-y-3">
            <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">Recently Scouted</h3>
            {scoutedDeals.length === 0 && <p className="text-slate-600 text-sm italic">No deals found yet...</p>}
            {scoutedDeals.map(deal => (
                <div key={deal.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center space-x-3">
                    <img src={deal.imageUrl} alt={deal.name} className="w-10 h-10 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-bold truncate">{deal.name}</h4>
                        <div className="flex items-center text-xs text-slate-500">
                            <span className="text-green-400 mr-2">{deal.commission} Comm.</span>
                            <span>{deal.monthlyVolume}/mo</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Terminal / Live Logs */}
      <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col overflow-hidden font-mono text-sm">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-slate-500 text-xs">ow_engine_v1.0.exe</span>
        </div>
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-2">
            {logs.length === 0 && <span className="text-slate-600">Waiting for start command...</span>}
            {logs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 animate-fade-in">
                    <span className="text-slate-600">[{log.timestamp.toLocaleTimeString()}]</span>
                    <span className={`
                        ${log.type === 'INFO' ? 'text-slate-300' : ''}
                        ${log.type === 'SUCCESS' ? 'text-green-400' : ''}
                        ${log.type === 'ERROR' ? 'text-red-400' : ''}
                        ${log.type === 'DEAL_FOUND' ? 'text-orange-400 font-bold' : ''}
                    `}>
                        {log.type === 'DEAL_FOUND' && '⚡ '}
                        {log.message}
                    </span>
                </div>
            ))}
            {isRunning && (
                <div className="animate-pulse text-slate-500">_</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default WhopEngineView;