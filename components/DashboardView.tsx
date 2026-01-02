import React from 'react';
import { ProcessedClip, ClipStatus } from '../types';

interface DashboardViewProps {
  recentClips: ProcessedClip[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ recentClips }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Creator</h2>
        <p className="text-slate-400">Here's how your automated clips are performing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm">Total Clips Generated</p>
              <h3 className="text-3xl font-bold text-white mt-1">1,284</h3>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <span className="text-green-400 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +12% this week
          </span>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm">Avg. Virality Score</p>
              <h3 className="text-3xl font-bold text-white mt-1">84.5</h3>
            </div>
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
            </div>
          </div>
          <span className="text-slate-400 text-sm">Top 5% of industry</span>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm">Auto-Uploads</p>
              <h3 className="text-3xl font-bold text-white mt-1">42</h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
          </div>
          <span className="text-blue-400 text-sm">Last upload 2h ago</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Recent Clips</h3>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {recentClips.length === 0 ? (
                 <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No clips generated yet. Head to the Clipper to start.
                    </td>
                 </tr>
              ) : (
                recentClips.map((clip) => (
                    <tr key={clip.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{clip.title}</td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        clip.viralityScore >= 80 ? 'bg-green-100 text-green-800' :
                        clip.viralityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-slate-100 text-slate-800'
                        }`}>
                        {clip.viralityScore}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        clip.status === ClipStatus.UPLOADED ? 'bg-blue-500/10 text-blue-400' :
                        clip.status === ClipStatus.UPLOADING ? 'bg-purple-500/10 text-purple-400' :
                        'bg-slate-500/10 text-slate-400'
                        }`}>
                        {clip.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">YouTube Shorts</td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;