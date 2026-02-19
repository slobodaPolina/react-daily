import { MantineProvider } from '@mantine/core';
import classes from './../styles/common.module.scss';
import { theme } from './../styles/theme.ts';
import { Home } from './home/Home.tsx';
import { useDispatch } from 'react-redux';
import { initTasks } from '../stores/task.thunk.ts';
import { useEffect } from 'react';
import { AppDispatch } from '../stores/app.store.ts';
import { ConfirmationModalContextProvider } from '../providers/ConfirmationModalContextProvider.tsx';

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => dispatch(initTasks()), [dispatch]);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ConfirmationModalContextProvider>
        <div className={classes.appWrapper}>
          <Home />
        </div>
      </ConfirmationModalContextProvider>
    </MantineProvider>
  );
}
