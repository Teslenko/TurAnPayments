'use client';

import { useEffect, useState } from 'react';

export function VersionBadge() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Version from environment variables or package.json
  const version = process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0';
  const gitHash = process.env.NEXT_PUBLIC_GIT_HASH || '';
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || '';

  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 shadow-lg hover:bg-card/95 transition-colors pointer-events-auto">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-muted">v</span>
            <span className="font-mono text-text font-medium">{version}</span>
          </div>
          {gitHash && (
            <>
              <span className="text-muted">•</span>
              <span className="font-mono text-muted text-[10px]" title={`Commit: ${gitHash}`}>
                {gitHash}
              </span>
            </>
          )}
          {buildTime && (
            <>
              <span className="text-muted">•</span>
              <span className="text-muted text-[10px]" title={`Build date: ${buildTime}`}>
                {buildTime}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

