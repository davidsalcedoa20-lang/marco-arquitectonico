"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";

type MediaMap = Record<string, string>;

const MediaContext = createContext<MediaMap>({});

export function MediaProvider({ overrides, children }: { overrides: MediaMap; children: ReactNode }) {
  return <MediaContext.Provider value={overrides}>{children}</MediaContext.Provider>;
}

export function useMediaUrl() {
  const overrides = useContext(MediaContext);
  return useCallback((defaultUrl: string) => overrides[defaultUrl] || defaultUrl, [overrides]);
}
