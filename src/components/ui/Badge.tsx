export default function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 cursor-pointer hover:bg-white/10 transition-colors group">
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">{text}</span>
      <span className="text-xs text-gray-500 group-hover:text-white transition-colors ml-1">→</span>
    </div>
  );
}