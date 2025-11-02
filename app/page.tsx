'use client';

import { useCallback, useMemo, useState } from 'react';
import TaskList from '../components/TaskList';
import { Task } from '@/types/task';

export default function HomePage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  const handleAdd = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    setTasks(prev => {
      const current = prev ?? [];
      const newTask: Task = { id: Date.now(), text, completed: false };
      return [newTask, ...current];
    });
    setInputValue('');
  }, [inputValue]);

  const handleRemove = useCallback((id: number) => {
    setTasks(prev => (prev ?? []).filter(t => t.id !== id));
  }, []);

  const handleToggle = useCallback((id: number) => {
    setTasks(prev => (prev ?? []).map(t => (
      t.id === id ? { ...t, completed: !t.completed } : t
    )));
  }, []);

  const listProps = useMemo(
    () => ({ tasks, onRemove: handleRemove, onToggle: handleToggle }),
    [tasks, handleRemove, handleToggle]
  );

  return (
    <section className="wrapper">
      <h1 className="title">Task List</h1>

      <div className="addRow">
        <input
          aria-label="Нове завдання"
          className="input"
          placeholder="Введіть завдання..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn" onClick={handleAdd}>Додати</button>
      </div>

      <TaskList {...listProps} />
    </section>
  );
}
