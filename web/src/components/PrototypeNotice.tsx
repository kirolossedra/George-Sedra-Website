import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

export default function PrototypeNotice({ children }: { children: ReactNode }) {
  return (
    <div className="prototype-notice" role="note">
      <Info size={18} />
      <span>{children}</span>
    </div>
  );
}
