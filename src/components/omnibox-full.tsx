import React from 'react';
import Input from './omnibox';

interface OmniboxFullProps {
  currentUrl?: string;
  onClose: () => void;
}

export default function OmniboxFull(_: OmniboxFullProps) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <Input onSubmit={() => {}} />
    </div>
  );
}
