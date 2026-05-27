'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  RefreshCw, Tv2, FolderOpen, CheckCircle2, XCircle,
  Clock, Loader2, Shield, Plus, Trash2, Eye, EyeOff,
  ToggleLeft, ToggleRight, Link2, Radio, BarChart2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AnalyticsDashboard from './analytics/AnalyticsDashboard';

interface Stats { channels: number; categories: number }
interface SyncLog {
  id: string; status: string; channelsAdded: number;
  channelsUpdated: number; channelsRemoved: number;
  totalChannels: number; error: string | null; createdAt: string;
}
interface Source {
  id: string; name: string; url: string;
  isActive: boolean; lastSync: string | null; createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [authed, setAuthed]         = useState(false);
  const [syncing, setSyncing]       = useState(false);
  const [stats, setStats]           = useState<Stats | null>(null);
  const [logs, setLogs]             = useState<SyncLog[]>([]);
  const [sources, setSources]       = useState<Source[]>([]);
  const [newName, setNewName]       = useState('');
  const [newUrl, setNewUrl]         = useState('');
  const [addingSource, setAddingSource] = useState(false);
  const [loadingData, setLoadingData]   = useState(false);
  const [activeTab, setActiveTab]       = useState<'overview' | 'analytics'>('overview');
  const [chName, setChName]         = useState('');
  const [chUrl, setChUrl]           = useState('');
  const [chLogo, setChLogo]         = useState('');
  const [chGroup, setChGroup]       = useState('General');
  const [addingCh, setAddingCh]     = useState(false);

  const authHeader = { 'x-admin-password': password, 'Content-Type': 'application/json' };

  const fetchData = useCallback(async (pwd: string) => {
    setLoadingData(true);
    try {
      const [chRes, catRes, logsRes, srcRes] = await Promise.all([
        fetch('/api/channels?limit=1').then(r => r.json()),
        fetch('/api/categories').then(r => r.json()),
        fetch('/api/sync-m3u', { headers: { 'x-admin-password': pwd } }).then(r => r.json()),
        fetch('/api/sources',  { headers: { 'x-admin-password': pwd } }).then(r => r.json()),
      ]);
      setStats({ channels: chRes.total || 0, categories: catRes.data?.length || 0 });
      if (logsRes.success) setLogs(logsRes.data || []);
      if (srcRes.success)  setSources(srcRes.data || []);
    } finally {
      setLoadingData(false);
    }
  }, []);

  const login = () => {
    if (!password) return;
    setAuthed(true);
    fetchData(password);
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res  = await fetch('/api/sync-m3u', { method: 'POST', headers: authHeader });
      const data = await res.json();
      if (data.success) {
        toast.success(`✓ Sync done — +${data.data.added} added, ~${data.data.updated} updated, -${data.data.removed} removed`);
        fetchData(password);
      } else {
        toast.error(data.error || 'Sync failed');
      }
    } catch { toast.error('Network error'); }
    finally  { setSyncing(false); }
  };

  const addSource = async () => {
    if (!newName.trim() || !newUrl.trim()) return;
    setAddingSource(true);
    try {
      const res  = await fetch('/api/sources', { method: 'POST', headers: authHeader, body: JSON.stringify({ name: newName.trim(), url: newUrl.trim() }) });
      const data = await res.json();
      if (data.success) {
        toast.success('Source added');
        setSources(prev => [...prev, data.data]);
        setNewName(''); setNewUrl('');
      } else { toast.error(data.error || 'Failed'); }
    } finally { setAddingSource(false); }
  };

  const toggleSource = async (src: Source) => {
    const res  = await fetch(`/api/sources/${src.id}`, { method: 'PATCH', headers: authHeader, body: JSON.stringify({ isActive: !src.isActive }) });
    const data = await res.json();
    if (data.success) setSources(prev => prev.map(s => s.id === src.id ? data.data : s));
  };

  const deleteSource = async (id: string) => {
    if (!confirm('Delete this source?')) return;
    const res = await fetch(`/api/sources/${id}`, { method: 'DELETE', headers: authHeader });
    if ((await res.json()).success) {
      setSources(prev => prev.filter(s => s.id !== id));
      toast.success('Source removed');
    }
  };

  const addChannel = async () => {
    if (!chName.trim() || !chUrl.trim()) return;
    setAddingCh(true);
    try {
      const res  = await fetch('/api/channels', { method: 'POST', headers: authHeader, body: JSON.stringify({ name: chName.trim(), streamUrl: chUrl.trim(), logo: chLogo.trim() || undefined, groupTitle: chGroup.trim() || 'General' }) });
      const data = await res.json();
      if (data.success) {
        toast.success(`Channel "${data.data.name}" added`);
        setChName(''); setChUrl(''); setChLogo(''); setChGroup('General');
        fetchData(password);
      } else { toast.error(data.error || 'Failed'); }
    } finally { setAddingCh(false); }
  };

  /* ── Login screen ── */
  if (!authed) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-500 text-sm">SportaLive</p>
            </div>
          </div>
          <div className="bg-gray-800/60 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Admin Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && login()}
                  placeholder="Enter admin password"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-purple-500 pr-10"
                />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button onClick={login} className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your IPTV platform</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">
            ← Site
          </Link>
          <button onClick={() => setAuthed(false)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 p-1 bg-gray-800/60 border border-white/10 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeTab === 'overview'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/60'
          )}
        >
          <Tv2 className="w-4 h-4" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeTab === 'analytics'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/60'
          )}
        >
          <BarChart2 className="w-4 h-4" />
          Analytics
        </button>
      </div>

      {/* Analytics tab */}
      {activeTab === 'analytics' && <AnalyticsDashboard password={password} />}

      {/* Overview tab */}
      {activeTab === 'overview' && <div className="space-y-8">

      {/* Stats */}
      {loadingData ? (
        <div className="grid grid-cols-2 gap-4">
          {[1,2].map(i => <div key={i} className="bg-gray-800/60 rounded-2xl p-6 animate-pulse h-28" />)}
        </div>
      ) : stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon={Tv2}        label="Channels"   value={stats.channels}   color="purple" />
          <StatCard icon={FolderOpen} label="Categories" value={stats.categories} color="blue"   />
          <StatCard icon={Link2}      label="Sources"    value={sources.length}   color="green"  />
          <StatCard icon={Radio}      label="Active Src" value={sources.filter(s=>s.isActive).length} color="yellow" />
        </div>
      )}

      {/* ── M3U Sources ── */}
      <section className="bg-gray-800/60 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-purple-400" />
            M3U Sources
          </h2>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-xl font-medium text-sm transition-colors"
          >
            {syncing ? <><Loader2 className="w-4 h-4 animate-spin" />Syncing…</> : <><RefreshCw className="w-4 h-4" />Sync All</>}
          </button>
        </div>

        {/* Sources list */}
        <div className="space-y-2">
          {sources.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No sources yet. Add one below.</p>
          )}
          {sources.map(src => (
            <div key={src.id} className={cn(
              'flex items-center gap-3 p-4 rounded-xl border transition-all',
              src.isActive ? 'bg-gray-900/50 border-white/10' : 'bg-gray-900/20 border-white/5 opacity-60'
            )}>
              {/* Toggle */}
              <button onClick={() => toggleSource(src)} className="flex-shrink-0 text-gray-400 hover:text-purple-400 transition-colors">
                {src.isActive ? <ToggleRight className="w-6 h-6 text-purple-400" /> : <ToggleLeft className="w-6 h-6" />}
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{src.name}</p>
                <p className="text-gray-500 text-xs truncate mt-0.5">{src.url}</p>
                {src.lastSync && (
                  <p className="text-gray-600 text-xs mt-0.5">
                    Last sync: {new Date(src.lastSync).toLocaleString()}
                  </p>
                )}
              </div>

              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0', src.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-500')}>
                {src.isActive ? 'Active' : 'Off'}
              </span>

              <button onClick={() => deleteSource(src.id)} className="flex-shrink-0 p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add source form */}
        <div className="pt-2 border-t border-white/5">
          <p className="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add new source
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Source name (e.g. TDT Channels)"
              className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500"
            />
            <input
              type="url"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSource()}
              placeholder="https://example.com/playlist.m3u8"
              className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500"
            />
            <button
              onClick={addSource}
              disabled={addingSource || !newName || !newUrl}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-xl text-sm font-medium transition-colors flex-shrink-0 flex items-center gap-2"
            >
              {addingSource ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </div>
        </div>
      </section>

      {/* ── Add Channel manually ── */}
      <section className="bg-gray-800/60 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Tv2 className="w-5 h-5 text-purple-400" />
          Add Channel Manually
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={chName}
            onChange={e => setChName(e.target.value)}
            placeholder="Channel name (e.g. TRT 1)"
            className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500"
          />
          <input
            type="url"
            value={chUrl}
            onChange={e => setChUrl(e.target.value)}
            placeholder="Stream URL (m3u8 or ts)"
            className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500"
          />
          <input
            type="url"
            value={chLogo}
            onChange={e => setChLogo(e.target.value)}
            placeholder="Logo URL (optional)"
            className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500"
          />
          <input
            type="text"
            value={chGroup}
            onChange={e => setChGroup(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addChannel()}
            placeholder="Group / Category (e.g. Turkish)"
            className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500"
          />
        </div>
        <button
          onClick={addChannel}
          disabled={addingCh || !chName || !chUrl}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {addingCh ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Channel
        </button>
      </section>

      {/* Sync history */}
      {logs.length > 0 && (
        <section className="bg-gray-800/60 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Sync History</h2>
          <div className="space-y-2">
            {logs.map(log => <SyncLogItem key={log.id} log={log} />)}
          </div>
        </section>
      )}
      </div>}
    </div>
  );
}

/* ── helpers ── */
function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  const c = { purple: 'bg-purple-600/10 text-purple-400', blue: 'bg-blue-600/10 text-blue-400', green: 'bg-green-600/10 text-green-400', yellow: 'bg-yellow-600/10 text-yellow-400' };
  return (
    <div className="bg-gray-800/60 border border-white/5 rounded-2xl p-5">
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', c[color as keyof typeof c])}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
      <p className="text-gray-500 text-xs mt-1">{label}</p>
    </div>
  );
}

function SyncLogItem({ log }: { log: SyncLog }) {
  const s = {
    success: { icon: CheckCircle2, color: 'text-green-400',  bg: 'bg-green-400/10'  },
    error:   { icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-400/10'    },
    running: { icon: Loader2,      color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    pending: { icon: Clock,        color: 'text-gray-400',   bg: 'bg-gray-400/10'   },
  };
  const cfg = s[log.status as keyof typeof s] || s.pending;
  const Icon = cfg.icon;
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-900/40 rounded-xl">
      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', cfg.bg)}>
        <Icon className={cn('w-3.5 h-3.5', cfg.color, log.status === 'running' && 'animate-spin')} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-sm font-medium capitalize', cfg.color)}>{log.status}</span>
          <span className="text-xs text-gray-600">{new Date(log.createdAt).toLocaleString()}</span>
        </div>
        {log.status === 'success' && (
          <p className="text-xs text-gray-500 mt-0.5">
            +{log.channelsAdded} added · ~{log.channelsUpdated} updated · -{log.channelsRemoved} removed · {log.totalChannels} total
          </p>
        )}
        {log.error && <p className="text-xs text-red-400 mt-0.5 truncate">{log.error}</p>}
      </div>
    </div>
  );
}
