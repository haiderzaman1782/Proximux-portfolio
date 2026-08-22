import { createContext, useContext } from 'react';
import type { Service } from './data';

export type UI = {
  openBooking: () => void;
  openContact: () => void;
  openService: (service: Service) => void;
  openChat: () => void;
};

export const UIContext = createContext<UI | null>(null);

export function useUI(): UI {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within a UIContext provider (Layout).');
  return ctx;
}
