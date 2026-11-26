import type { ReactNode } from 'react';

export default function PrototypeNotice({ children }: { children: ReactNode }) {
  return (
    <div className="notice" role="note">
      <p className="notice__label">Prototype notice</p>
      <p>{children}</p>
    </div>
  );
}
