import React, { useEffect, useState } from 'react';

function TaskModal({ onSave, task }) {
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    if (task) {
      setForm(task);
    } else {
      setForm({ title: '', description: '' });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <button type="submit">{task ? 'Update' : 'Create'} Task</button>
    </form>
  );
}

export default TaskModal;
