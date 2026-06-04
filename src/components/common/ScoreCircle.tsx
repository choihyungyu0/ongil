type ScoreCircleProps = {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClass = {
  sm: 'h-16 w-16 text-xl',
  md: 'h-24 w-24 text-3xl',
  lg: 'h-32 w-32 text-5xl',
};

export function ScoreCircle({ score, label = '점', size = 'md' }: ScoreCircleProps) {
  const angle = Math.max(0, Math.min(score, 100)) * 3.6;

  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full ${sizeClass[size]}`}
      style={{ background: `conic-gradient(#1aa6b0 ${angle}deg, #e2e8f0 ${angle}deg)` }}
      aria-label={`접근성 점수 ${score}점`}
    >
      <div className="grid h-[78%] w-[78%] place-items-center rounded-full bg-white text-center shadow-inner">
        <div>
          <strong className="block font-bold leading-none text-navy-950">{score}</strong>
          <span className="text-xs font-bold text-slate-500">{label}</span>
        </div>
      </div>
    </div>
  );
}
