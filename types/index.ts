// please refer to this article: https://qiita.com/Takepepe/items/f66c7e2e1d22b431f148

import React from 'react';

declare module 'react' {
  type FCX<P = {}> = React.FunctionComponent<P & { className?: string }>;
}

export type Todo = {
  readonly id: string;
  readonly text: string;
  readonly completed: boolean;
  readonly createdAt?: number;
  readonly updatedAt?: number;
};

export const SHOW_ACTIVE = 'SHOW_ACTIVE' as const;
export const SHOW_ALL = 'SHOW_ALL' as const;
export const SHOW_COMPLETED = 'SHOW_COMPLETED' as const;
export type VisibilityFilter =
  | typeof SHOW_ACTIVE
  | typeof SHOW_ALL
  | typeof SHOW_COMPLETED;
