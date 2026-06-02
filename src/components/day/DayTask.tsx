import { Badge, Card, Group, Switch, Text } from '@mantine/core';
import { taskRepetitionLabels } from '../../types/task-repetition.ts';
import { EditTaskBtn } from '../edit-task/EditTaskBtn.tsx';
import { TaskIteration } from '../../types/task-iteration.ts';
import { Task } from '../../types/task.ts';
import { deleteTask } from '../../stores/task.thunk.ts';
import { useContext } from 'react';
import { confirmationModalContext } from '../../types/confirmation-modal-context.ts';
import { useDispatch } from 'react-redux';
import classes from './DayInfo.module.scss';
import { praiseDialogContext } from '../../types/praise-dialog-context.ts';
import { taskToggled } from '../../stores/actions.ts';
import type { AppDispatch } from '../../stores/types.ts';
import { IconButton } from '../ui/icon-button/IconButton.tsx';

interface DayTaskProps {
  iteration: TaskIteration;
}

export function DayTask({ iteration }: DayTaskProps) {
  const dispatch = useDispatch<AppDispatch>();
  const confirmationModal = useContext(confirmationModalContext);
  const praiseDialog = useContext(praiseDialogContext);

  const onCheckTask = (iteration: TaskIteration) => {
    dispatch(taskToggled(iteration.uuid));

    if (!iteration.checked) {
      praiseDialog();
    }
  };

  const onDeleteTask = (task: Task) =>
    confirmationModal({
      title: 'Delete task',
      message: `Are you sure you want to delete the "${task.name}" task?`,
    }).then(() => dispatch(deleteTask(task.uuid)));

  return (
    <Card padding="md" radius="sm" mt="md" className={classes.taskContainer}>
      <Group justify="space-between">
        <Text fw={500}>{iteration.task.name}</Text>
        <Badge variant="filled">
          {taskRepetitionLabels[iteration.task.repetition]}
        </Badge>
      </Group>

      <Group justify="end" mt="md">
        <Switch
          size="xl"
          onLabel="DONE"
          offLabel="TODO"
          color="green"
          checked={iteration.checked}
          onClick={() => onCheckTask(iteration)}
        />
        <EditTaskBtn task={iteration.task}></EditTaskBtn>

        <IconButton
          icon="delete"
          label="Delete"
          gradient={{ from: 'red', to: 'dark', deg: 45 }}
          onClick={() => onDeleteTask(iteration.task)}></IconButton>
      </Group>
    </Card>
  );
}
