import { Button, SegmentedControl, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Task, taskInitialValue } from '../../types/task.ts';
import classes from './EditTask.module.scss';
import { taskRepetitionOptions } from '../../types/task-repetition.ts';
import { getStartOfDateInUTC } from '../../utils/time.ts';

interface EditTaskFormProps {
  task?: Task;
  handleSubmit: (task: Task) => void;
}

export function EditTaskForm({ task, handleSubmit }: EditTaskFormProps) {
  const form = useForm<Task>({
    mode: 'uncontrolled',
    initialValues: task ? { ...task } : taskInitialValue,

    validate: {
      name: (value) => (value?.length ? null : 'Name is required'),
    },
  });

  const datePickerProps = form.getInputProps('date');

  return (
    <form
      className={classes.editTaskForm}
      onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Name"
        withAsterisk
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

      <DatePicker
        defaultDate={datePickerProps.defaultValue}
        key={form.key('date')}
        minDate={getStartOfDateInUTC()}
        {...datePickerProps}
      />

      <SegmentedControl
        data={taskRepetitionOptions}
        key={form.key('repetition')}
        {...form.getInputProps('repetition')}
      />

      <Button type="submit" variant="gradient" disabled={!form.isValid()}>
        Submit
      </Button>
    </form>
  );
}
