import { nanoid } from 'nanoid';

interface TaskType {
  description: string;
  name: string;
  id: string;
}

interface BoardColumnType {
  name: string;
  tasks: TaskType[];
}

interface BoardType {
  name: string;
  columns: BoardColumnType[];
}

const defaultBoard: BoardType = {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: nanoid(),
        },
        {
          description: '',
          name: 'second task',
          id: nanoid(),
        },
        {
          description: '',
          name: 'and third',
          id: nanoid(),
        },
      ],
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: nanoid(),
        },
      ],
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: nanoid(),
        },
      ],
    },
  ],
};

const getDefaultBoard = (): BoardType => defaultBoard;

export { getDefaultBoard };
export type { TaskType, BoardColumnType, BoardType };
