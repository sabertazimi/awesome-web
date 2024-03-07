import { nanoid } from 'nanoid'

interface TaskType {
  id: string
  name: string
  description: string
}

interface BoardColumnType {
  id: string
  name: string
  tasks: TaskType[]
}

interface BoardType {
  name: string
  columns: BoardColumnType[]
}

const defaultBoard: BoardType = {
  name: 'workshop',
  columns: [
    {
      id: nanoid(),
      name: 'todo',
      tasks: [
        {
          id: nanoid(),
          name: 'first task',
          description: '',
        },
        {
          id: nanoid(),
          name: 'second task',
          description: '',
        },
        {
          id: nanoid(),
          name: 'and third',
          description: '',
        },
      ],
    },
    {
      id: nanoid(),
      name: 'in-progress',
      tasks: [
        {
          id: nanoid(),
          name: 'first task',
          description: '',
        },
      ],
    },
    {
      id: nanoid(),
      name: 'done',
      tasks: [
        {
          id: nanoid(),
          name: 'first task',
          description: '',
        },
      ],
    },
  ],
}

const getDefaultBoard = (): BoardType => defaultBoard

export { getDefaultBoard }
export type { TaskType, BoardColumnType, BoardType }
