import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { EditTask } from './EditTask.tsx';
import { Task } from '../../types/task.ts';

interface EditTaskProps {
  size?: string;
  task: Task;
}

export function EditTaskBtn({ task, size = 'lg' }: EditTaskProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon
        variant="gradient"
        aria-label="Edit"
        size={size}
        onClick={open}>
        <span className="material-icons">edit</span>
      </ActionIcon>

      <EditTask opened={opened} onClose={close} task={task}></EditTask>
    </>
  );
}
