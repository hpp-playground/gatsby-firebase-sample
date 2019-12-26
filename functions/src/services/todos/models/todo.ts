export type Todo = {
  readonly id?: string;
  readonly text: string;
  readonly completed: boolean;
  readonly createdAt?: number;
  readonly updatedAt?: number;
};
