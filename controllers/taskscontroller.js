const Task = require('../models/Task');

exports.getTasks = (req, res) => {
  Task.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createTask = (req, res) => {
  const task = req.body;
  Task.create(task, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, ...task });
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const task = req.body;
  Task.update(id, task, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...task });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  Task.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(204).send();
  });
};
