import { createContext } from 'react';

export type ConfirmationModalParams = {
  title: string;
  message: string;
};

export type ModalContextType = {
  showConfirmation: (params: ConfirmationModalParams) => Promise<void>;
};

export const ConfirmationModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);
