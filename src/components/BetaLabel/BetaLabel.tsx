import { FC } from 'react';

const BetaLabel: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`color-black leading-1 rounded border-2 border-solid border-darkblue-900 px-2 text-xs font-semibold ${className}`}
    >
      Beta
    </div>
  );
};

export default BetaLabel;
