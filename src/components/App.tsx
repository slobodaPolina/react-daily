import { MantineProvider } from '@mantine/core';
import classes from './../styles/common.module.scss';
import { theme } from './../styles/theme.ts';
import { Home } from './home/Home.tsx';
import { useDispatch } from 'react-redux';
import { initTasks } from '../stores/task.store.ts';

export function App() {
  useDispatch()(initTasks());

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div className={classes.appWrapper}>
        <Home />
      </div>
    </MantineProvider>
  );
}
