export default function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden animate-pulse border border-white/[0.06]"
      style={{ background: 'var(--card)' }}>
      {/* Logo zone */}
      <div className="h-[140px] flex items-center justify-center"
        style={{ background: 'var(--bg-2)' }}>
        <div className="w-16 h-16 rounded-2xl bg-white/[0.06]" />
      </div>
      {/* Info */}
      <div className="px-4 pt-3 pb-4 space-y-3">
        <div className="space-y-1.5">
          <div className="h-3.5 bg-white/[0.07] rounded-lg w-3/4" />
          <div className="h-2.5 bg-white/[0.04] rounded-lg w-1/2" />
        </div>
        <div className="flex gap-1.5 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.07]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.05]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.04]" />
        </div>
        <div className="h-9 rounded-2xl bg-white/[0.06]" />
      </div>
    </div>
  );
}
