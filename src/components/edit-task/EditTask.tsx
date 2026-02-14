import { Drawer } from '@mantine/core';
import { Task } from '../../types/task.ts';
import { EditTaskForm } from './EditTaskForm.tsx';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../stores/task.thunk.ts';
import { AppDispatch } from '../../stores/app.store.ts';

interface EditTaskProps {
  opened: boolean;
  onClose: () => void;
  task?: Task;
}

export function EditTask({ opened, onClose, task }: EditTaskProps) {
  const dispatch = useDispatch<AppDispatch>();
  const title = task ? 'Edit Task' : 'Add Task';
  const action = task ? editTask : addTask;

  const handleSubmit = (result: Task) => {
    dispatch(action(result));
    onClose();
  };

  return (
    <Drawer
      position={'right'}
      opened={opened}
      onClose={onClose}
      title={title}
      size="25%">
      <EditTaskForm task={task} handleSubmit={handleSubmit} />
    </Drawer>
  );
}
