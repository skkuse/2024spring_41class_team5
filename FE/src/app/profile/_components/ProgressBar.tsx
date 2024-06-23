interface ProgressBarProps {
  dealt: number;
}

const ProgressBar = ({ dealt }: ProgressBarProps) => (
  <div className="w-full mt-2 h-4 overflow-hidden rounded bg-gray-50">
    <div
      className="h-full bg-red-500 transition-all"
      style={{ width: `${dealt}%` }}
    />
  </div>
);

export default ProgressBar;
