import { Dialog, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { PropsWithChildren, useCallback, useState } from 'react';
import { praiseDialogContext } from '../types/praise-dialog-context.ts';
import catLoadingImage from '../assets/loading-cat.gif';
import { getCatUrl } from '../services/service.ts';

export const PraiseDialogContextProvider = (props: PropsWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [url, setUrl] = useState<string | null>(null);

  const handleOpen = useCallback(() => {
    getCatUrl().then((response) => setUrl(response));
    open();
  }, [setUrl, open]);

  const handleClose = useCallback(() => {
    setUrl(null);
    close();
  }, [setUrl, close]);

  return (
    <praiseDialogContext.Provider value={handleOpen}>
      {props.children}

      <Dialog opened={opened} withCloseButton onClose={handleClose} size="lg">
        <Text fw="bolder">I am so proud of you!</Text>
        <Text>Relax and take a look at a pretty kitty!</Text>

        <Image
          mt="md"
          radius="md"
          src={url}
          fallbackSrc={catLoadingImage}></Image>
      </Dialog>
    </praiseDialogContext.Provider>
  );
};
