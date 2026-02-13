import classes from './DayInfo.module.scss';
import { useSelector } from 'react-redux';
import { selectDay } from '../../stores/day.store.ts';
import { ActionIcon, Badge, Card, Group, Paper, Text } from '@mantine/core';
import { formatDate } from '../../utils/time.ts';
import { selectTasksByDate } from '../../stores/task.store.ts';
import { taskRepetitionLabels } from '../../types/TaskRepetition.ts';

export function DayInfo() {
  const selectedDay = useSelector(selectDay);
  const tasks = useSelector(selectTasksByDate(selectedDay));

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
            <ActionIcon variant="gradient" aria-label="Edit" size="lg">
              <span className="material-icons">edit</span>
            </ActionIcon>

            <ActionIcon
              variant="gradient"
              gradient={{ from: 'red', to: 'dark', deg: 45 }}
              aria-label="Delete"
              size="lg">
              <span className="material-icons">delete</span>
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </Paper>
  );
}
