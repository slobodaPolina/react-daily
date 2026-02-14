import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { EditTask } from './EditTask.tsx';

interface AddTaskProps {
  size?: string;
}

export function AddTaskBtn({ size = 'lg' }: AddTaskProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon
        variant="gradient"
        aria-label="Add"
        size={size}
        onClick={open}>
        <span className="material-icons">add_task</span>
      </ActionIcon>

      <EditTask opened={opened} onClose={close}></EditTask>
    </>
  );
}
