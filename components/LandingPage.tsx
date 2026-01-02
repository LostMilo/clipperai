import React from 'react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans selection:bg-purple-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg shadow-lg shadow-purple-500/20"></div>
            <span className="text-xl font-bold tracking-tight">ViralClip.ai</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#workflow" className="hover:text-white transition-colors">How it Works</a>
            <a href="#engine" className="hover:text-white transition-colors">OW Engine</a>
            <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
          </div>
          <button 
            onClick={onEnterApp}
            className="px-5 py-2 bg-white text-slate-950 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors shadow-lg hover:shadow-xl"
          >
            Launch Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium mb-8 hover:bg-purple-500/20 transition-colors cursor-default">
            <span className="flex w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
            v1.0 MVP Live • Whop Integration Active
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            The Operating System for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
              Content Arbitrage
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop manually editing. ViralClip.ai bridges the gap between <span className="text-white font-semibold">Whop Deal Scouting</span> and <span className="text-white font-semibold">Viral Video Automation</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={onEnterApp}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Start Automating
            </button>
            <button className="px-8 py-4 bg-slate-900 border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center w-full sm:w-auto justify-center group">
              <svg className="w-5 h-5 mr-2 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              See the Workflow
            </button>
          </div>
        </div>

        {/* Dashboard Preview Abstract */}
        <div className="mt-20 max-w-6xl mx-auto px-6 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
          <div className="rounded-xl bg-slate-900 border border-white/10 p-2 backdrop-blur-sm shadow-2xl relative">
            <div className="rounded-lg bg-slate-950 border border-white/5 aspect-video flex items-center justify-center relative overflow-hidden">
               {/* UI Mockup Lines */}
               <div className="absolute inset-0 p-8 grid grid-cols-12 gap-6 opacity-40 hover:opacity-100 transition-opacity duration-700">
                  <div className="col-span-3 bg-slate-800/50 rounded-lg h-full border border-slate-700 flex flex-col p-4 space-y-3">
                      <div className="h-8 w-full bg-slate-700/50 rounded"></div>
                      <div className="h-4 w-2/3 bg-slate-700/50 rounded"></div>
                      <div className="h-4 w-1/2 bg-slate-700/50 rounded"></div>
                      <div className="mt-auto h-20 w-full bg-slate-700/30 rounded border border-slate-600/30"></div>
                  </div>
                  <div className="col-span-9 flex flex-col space-y-6">
                      <div className="h-16 w-full bg-slate-800/50 rounded-lg border border-slate-700 flex items-center px-6">
                          <div className="h-8 w-8 rounded-full bg-purple-500/20"></div>
                          <div className="ml-4 h-4 w-48 bg-slate-700/50 rounded"></div>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700 relative overflow-hidden group/card">
                              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                                  <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
                                  <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                              </div>
                          </div>
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700 relative overflow-hidden">
                               <div className="absolute top-4 right-4 h-6 w-16 bg-green-500/20 rounded-full border border-green-500/30"></div>
                          </div>
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700"></div>
                      </div>
                  </div>
               </div>
               
               <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <div className="px-6 py-3 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-full font-medium text-white shadow-2xl">
                    Interactive Dashboard
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Workflow Section (Crisp UI Flows) */}
      <section id="workflow" className="py-24 border-t border-white/5 bg-slate-900/30 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">The Arbitrage Flywheel</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Traditional clipping tools wait for you to upload a video. We start by finding <span className="text-white font-semibold">where the money is</span>.
                </p>
            </div>
            
            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-green-500/20 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl flex items-center justify-center mb-6 relative group-hover:border-orange-500/50 group-hover:-translate-y-2 transition-all duration-300">
                            <div className="absolute inset-0 bg-orange-500/5 blur-xl group-hover:bg-orange-500/20 transition-all"></div>
                            <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-white shadow-lg">1</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Deal Scouting</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            <span className="text-orange-400 font-medium">OW Engine</span> scans Whop for trending, high-commission signals (Volume &gt; $50k/mo).
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl flex items-center justify-center mb-6 relative group-hover:border-pink-500/50 group-hover:-translate-y-2 transition-all duration-300">
                             <div className="absolute inset-0 bg-pink-500/5 blur-xl group-hover:bg-pink-500/20 transition-all"></div>
                             <svg className="w-10 h-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                             <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-white shadow-lg">2</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Content Match</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            System locates viral YouTube long-form reviews related to the niche automatically.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl flex items-center justify-center mb-6 relative group-hover:border-purple-500/50 group-hover:-translate-y-2 transition-all duration-300">
                             <div className="absolute inset-0 bg-purple-500/5 blur-xl group-hover:bg-purple-500/20 transition-all"></div>
                             <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                             <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-white shadow-lg">3</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">AI Extraction</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Gemini 1.5 Flash extracts hooks optimized for retention, scoring them 0-100.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl flex items-center justify-center mb-6 relative group-hover:border-green-500/50 group-hover:-translate-y-2 transition-all duration-300">
                             <div className="absolute inset-0 bg-green-500/5 blur-xl group-hover:bg-green-500/20 transition-all"></div>
                             <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-white shadow-lg">4</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Profit & Scale</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Multi-platform auto-posting to TikTok/Shorts drives traffic to your affiliate links.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Tech Stack Breakdown */}
      <section id="tech" className="py-24 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             {/* Left Text */}
             <div>
                <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                    Intelligence Layer
                </div>
                <h2 className="text-4xl font-bold mb-6">Contextual Intelligence, <br />Not Random Cuts.</h2>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                    Most clippers just chop videos. ViralClip injects the <span className="text-white">Commercial Context</span> of the deal into the AI prompt, ensuring every clip is designed to sell.
                </p>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mr-4 flex-shrink-0 text-xl">🗣</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Sentiment Analysis</h4>
                            <p className="text-sm text-slate-500 mt-1">Detects peak excitement levels in voice inflection to identify hooks.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mr-4 flex-shrink-0 text-xl">🧠</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Contextual Hooking</h4>
                            <p className="text-sm text-slate-500 mt-1">Matches video intro to current market trends found on Whop.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mr-4 flex-shrink-0 text-xl">🚀</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Virality Scoring</h4>
                            <p className="text-sm text-slate-500 mt-1">Assigns a 0-100 score based on pacing, keywords, and retention probability.</p>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Right Graphic - Code Snippet representation */}
             <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl grayscale group-hover:grayscale-0 transition-all duration-500">🤖</div>
                
                <div className="flex space-x-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <div className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                    <div className="text-slate-500">// Core logic for viral extraction</div>
                    <div className="text-purple-400">const</div> <div className="text-blue-300 inline">analyzeClip</div> = <div className="text-purple-400 inline">async</div> (video) ={'>'} {'{'}
                    <div className="pl-4">
                        <div className="text-slate-500">// 1. Ingest content & transcript</div>
                        <div className="text-purple-400 inline">const</div> context = <div className="text-purple-400 inline">await</div> gemini.process(video);
                    </div>
                    <div className="pl-4 mt-2">
                        <div className="text-slate-500">// 2. Map against Whop Trends</div>
                        <div className="text-purple-400 inline">const</div> deals = <div className="text-purple-400 inline">await</div> whop.getTrending();
                    </div>
                    <div className="pl-4 mt-2">
                        <div className="text-slate-500">// 3. Generate Viral Cuts with High Commercial Intent</div>
                        <div className="text-purple-400 inline">return</div> context.segments.filter(seg ={'>'} 
                        <div className="pl-4">
                             seg.viralityScore {'>'} <span className="text-orange-400">90</span> && 
                        </div>
                        <div className="pl-4">
                             seg.topic === deals[0].niche
                        </div>
                        );
                    </div>
                    {'}'}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-500">Processing Time: 1.2s</span>
                    <span className="text-xs text-green-400 font-mono">STATUS: ONLINE</span>
                </div>
             </div>
        </div>
      </section>

      {/* OW Engine Highlight - Terminal Style */}
      <section id="engine" className="py-24 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
             <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                 Autopilot Mode
             </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Opportunity Watcher</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              While other creators are scrolling to find ideas, our engine runs 24/7. It identifies trending products on Whop, finds the perfect creative asset, and queues it for you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-3 text-sm">✓</div>
                    <span className="text-slate-300 font-medium">Real-time Volume Tracking</span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-3 text-sm">✓</div>
                    <span className="text-slate-300 font-medium">Auto-Context Injection</span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-3 text-sm">✓</div>
                    <span className="text-slate-300 font-medium">Zero-Touch Automation</span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-3 text-sm">✓</div>
                    <span className="text-slate-300 font-medium">Multi-Account Support</span>
                </div>
            </div>
          </div>
          <div className="flex-1 w-full transform md:rotate-1 hover:rotate-0 transition-all duration-500">
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-6 font-mono text-sm shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900 border-b border-slate-800 rounded-t-xl flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs text-slate-500">ow_engine_daemon — bash — 80x24</div>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-slate-500">$ ./start_ow_engine.sh --autopilot</p>
                <p className="text-blue-400"> > Initializing Scanner...</p>
                <p className="text-slate-300"> > Found 3 trending deals in "Trading"</p>
                <p className="text-orange-400"> > DEAL DETECTED: Alpha Signals (40% Comm)</p>
                <p className="text-slate-300"> > Fetching creative from YouTube...</p>
                <p className="text-purple-400"> > AI Analysis Complete: 3 Viral Clips Found</p>
                <p className="text-green-400"> > Posting to TikTok... [SUCCESS]</p>
                <p className="text-green-400"> > Posting to Reels... [SUCCESS]</p>
                <div className="animate-pulse text-slate-500">_</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg"></div>
            <span className="text-lg font-bold tracking-tight">ViralClip.ai</span>
        </div>
        <p className="text-slate-500 text-sm mb-6">© 2024 ViralClip.ai - Internal MVP Build 0.1.4</p>
        <div className="flex justify-center space-x-8">
          <button onClick={onEnterApp} className="text-slate-400 hover:text-white text-sm transition-colors">Log In</button>
          <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Documentation</a>
          <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;