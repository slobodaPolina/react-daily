import { createContext } from 'react';

type DialogContextType = () => void;

export const praiseDialogContext = createContext<DialogContextType>(
  null as unknown as DialogContextType,
);
