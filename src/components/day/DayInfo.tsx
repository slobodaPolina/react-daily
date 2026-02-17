import classes from './DayInfo.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, Badge, Card, Group, Paper, Text } from '@mantine/core';
import {
  formatDate,
  getCurrentDay,
  getCurrentMonthDate,
} from '../../utils/time.ts';
import { taskRepetitionLabels } from '../../types/task-repetition.ts';
import { AppDispatch } from '../../stores/app.store.ts';
import { deleteTask } from '../../stores/task.thunk.ts';
import { EditTaskBtn } from '../edit-task/EditTaskBtn.tsx';
import { useConfirmationModal } from '../../hooks/useConfirmationModal.ts';
import { Task } from '../../types/task.ts';
import {
  selectDay,
  selectTasksIterationsByDay,
} from '../../stores/selectors.ts';

export function DayInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDay = useSelector(selectDay);
  const tasksIterations = useSelector(selectTasksIterationsByDay(selectedDay));
  const confirmationModal = useConfirmationModal();

  const formattedDate = formatDate(
    getCurrentMonthDate(selectedDay) ??
      (getCurrentMonthDate(getCurrentDay()) as Date),
  );

  const onDeleteTask = (task: Task) =>
    confirmationModal
      .showConfirmation({
        title: 'Delete task',
        message: `Are you sure you want to delete the "${task.name}" task?`,
      })
      .then(() => dispatch(deleteTask(task.uuid)));

  return (
    <Paper className={classes.dayContainer} shadow="md" radius="md" p="xl">
      <Text fw={600}>{formattedDate}:</Text>

      {tasksIterations?.map((iteration) => (
        <Card key={iteration.uuid} padding="md" radius="sm" mt="md">
          <Group justify="space-between">
            <Text fw={500}>{iteration.task.name}</Text>
            <Badge variant="filled">
              {taskRepetitionLabels[iteration.task.repetition]}
            </Badge>
          </Group>

          <Group justify="end" mt="md">
            <EditTaskBtn task={iteration.task}></EditTaskBtn>

            <ActionIcon
              variant="gradient"
              gradient={{ from: 'red', to: 'dark', deg: 45 }}
              aria-label="Delete"
              size="lg"
              onClick={() => onDeleteTask(iteration.task)}>
              <span className="material-icons">delete</span>
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </Paper>
  );
}
