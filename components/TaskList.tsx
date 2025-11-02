'use client';

import { useEffect, useState } from 'react';
import TaskItem from '@/components/TaskItem';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { Task } from '@/types/task';

export interface TaskListProps {
  tasks?: Task[];
  onRemove?: (id: number) => void;
  onToggle?: (id: number) => void;
}

export default function TaskList({ tasks, onRemove, onToggle }: TaskListProps) {
  // завжди викликаємо хуки в одному порядку:
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>('tasks', []);
  const [mounted, setMounted] = useState(false);

  // встановлюємо прапорець "mounted"
  useEffect(() => {
    setMounted(true);
  }, []);

  // синхронізуємо зовнішній список tasks → localStorage
  useEffect(() => {
    if (tasks !== undefined) {
      setStoredTasks(tasks);
    }
  }, [tasks, setStoredTasks]);

  // обираємо, який список показати
  const listToRender = tasks !== undefined ? tasks : storedTasks;

  // функції дій
  const handleRemove = (id: number) => {
    if (onRemove) onRemove(id);
    else setStoredTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggle = (id: number) => {
    if (onToggle) onToggle(id);
    else setStoredTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // поки не змонтовано — не показуємо контент (уникаємо hydration error)
  if (!mounted) return null;

  return (
    <div className="list">
      {listToRender.length === 0 ? (
        <p className="empty">Немає завдань для відображення</p>
      ) : (
        <ul className="ul">
          {listToRender.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRemove={handleRemove}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
