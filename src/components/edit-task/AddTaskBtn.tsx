import { useDisclosure } from '@mantine/hooks';
import { EditTask } from './EditTask.tsx';
import { IconButton } from '../ui/icon-button/IconButton.tsx';

interface AddTaskProps {
  size?: string;
}

export function AddTaskBtn({ size = 'lg' }: AddTaskProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <IconButton
        icon="add_task"
        label="Add"
        size={size}
        onClick={open}></IconButton>
      <EditTask opened={opened} onClose={close}></EditTask>
    </>
  );
}
