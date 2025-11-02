'use client';

import { Task } from '@/types/task';

export interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TaskItem({ task, onRemove, onToggle }: TaskItemProps) {
  return (
    <li className="item">
      <label className="itemLabel">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? 'text done' : 'text'}>{task.text}</span>
      </label>
      <button className="btn danger" onClick={() => onRemove(task.id)}>Видалити</button>
    </li>
  );
}
