import { useDisclosure } from '@mantine/hooks';
import { EditTask } from './EditTask.tsx';
import { Task } from '../../types/task.ts';
import { IconButton } from '../ui/icon-button/IconButton.tsx';

interface EditTaskProps {
  size?: string;
  task: Task;
}

export function EditTaskBtn({ task, size = 'lg' }: EditTaskProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <IconButton
        icon="edit"
        label="Edit"
        size={size}
        onClick={open}></IconButton>

      <EditTask opened={opened} onClose={close} task={task}></EditTask>
    </>
  );
}
