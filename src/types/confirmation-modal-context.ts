import { createContext } from 'react';

export type ConfirmationModalParams = {
  title: string;
  message: string;
};

type ModalContextType = (params: ConfirmationModalParams) => Promise<void>;

export const confirmationModalContext = createContext<ModalContextType>(
  null as unknown as ModalContextType,
);
