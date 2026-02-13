import classes from './DayInfo.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectDay } from '../../stores/day.store.ts';
import { ActionIcon, Badge, Card, Group, Paper, Text } from '@mantine/core';
import { formatDate } from '../../utils/time.ts';
import { selectTasksByDate } from '../../stores/task.store.ts';
import { taskRepetitionLabels } from '../../types/TaskRepetition.ts';
import { AppDispatch } from '../../stores/app.store.ts';
import { deleteTask } from '../../stores/task.thunk.ts';
import { EditTaskBtn } from '../edit-task/EditTaskBtn.tsx';

export function DayInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDay = useSelector(selectDay);
  const tasks = useSelector(selectTasksByDate(selectedDay));
  // todo confirmation?
  const onDeleteTask = (uuid: string) => dispatch(deleteTask(uuid));

  return (
    <Paper className={classes.dayContainer} shadow="md" radius="md" p="xl">
      <Text fw={600}>{formatDate(selectedDay)}:</Text>

      {tasks.map((task) => (
        <Card key={task.uuid} padding="md" radius="sm" mt="md">
          <Group justify="space-between">
            <Text fw={500}>{task.name}</Text>
            <Badge variant="filled">
              {taskRepetitionLabels[task.repetition]}
            </Badge>
          </Group>

          <Group justify="end" mt="md">
            <EditTaskBtn task={task}></EditTaskBtn>

            <ActionIcon
              variant="gradient"
              gradient={{ from: 'red', to: 'dark', deg: 45 }}
              aria-label="Delete"
              size="lg"
              onClick={() => onDeleteTask(task.uuid)}>
              <span className="material-icons">delete</span>
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </Paper>
  );
}
