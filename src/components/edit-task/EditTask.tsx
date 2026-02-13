import { ActionIcon, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Task } from '../../types/task.ts';
import { EditTaskForm } from './EditTaskForm.tsx';
import { useDispatch } from 'react-redux';
import { addTask } from '../../stores/task.thunk.ts';
import { AppDispatch } from '../../stores/app.store.ts';

interface EditTaskProps {
  task?: Task;
}

export function EditTask({ task }: EditTaskProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();
  const icon = task ? 'edit' : 'add_task';
  const title = task ? 'Edit Task' : 'Add Task';

  const handleSubmit = (task: Task) => {
    dispatch(addTask(task)); // either add or edit by uuid!
    close();
  };

  return (
    <>
      <ActionIcon variant="gradient" size="xl" onClick={open}>
        <span className="material-icons">{icon}</span>
      </ActionIcon>

      <Drawer
        position={'right'}
        opened={opened}
        onClose={close}
        title={title}
        size="25%">
        <EditTaskForm task={task} handleSubmit={handleSubmit} />
      </Drawer>
    </>
  );
}
