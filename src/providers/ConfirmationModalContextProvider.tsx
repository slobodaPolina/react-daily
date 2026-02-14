import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { ReactNode, useRef, useState } from 'react';
import {
  ConfirmationModalContext,
  ConfirmationModalParams,
} from '../types/confirmation-modal-context';

type ConfirmationModalContextProviderProps = {
  children: ReactNode;
};

export const ConfirmationModalContextProvider = (
  props: ConfirmationModalContextProviderProps,
) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [content, setContent] = useState<ConfirmationModalParams | null>();

  const resolver = useRef<() => void | null>(null);
  const rejector = useRef<() => void | null>(null);

  const showConfirmation = (params: ConfirmationModalParams): Promise<void> => {
    setContent(params);
    open();

    return new Promise((resolve, reject) => {
      resolver.current = resolve;
      rejector.current = reject;
    });
  };

  const resolve = () => {
    resolver.current?.();
    close();
  };

  const reject = () => {
    rejector.current?.();
    close();
  };

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmation }}>
      {props.children}

      <Modal opened={opened} onClose={close} title={content?.title} centered>
        <Modal.Body>
          <label>{content?.message}</label>
        </Modal.Body>

        <Group justify="flex-end">
          <Button variant="outline" onClick={reject}>
            Cancel
          </Button>
          <Button onClick={resolve}>Confirm</Button>
        </Group>
      </Modal>
    </ConfirmationModalContext.Provider>
  );
};
