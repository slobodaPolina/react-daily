import { useContext } from 'react';
import {
  ConfirmationModalContext,
  ModalContextType,
} from '../types/confirmation-modal-context.ts';

export const useConfirmationModal = (): ModalContextType =>
  useContext(ConfirmationModalContext);
