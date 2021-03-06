const Task = require("../models/Task");
// validation
const { taskAddValidation, taskUpdateValidation } = require("../validation");

// https://medium.com/swlh/how-to-create-a-simple-restful-api-in-node-js-ae4bfddea158

exports.list_all_tasks = (req, res) => {
  // List all tasks for admin
  if ((req.user.username === "admin")) {
    Task.find({}, (err, task) => {
      if (err) res.send(err);
      res.json(task);
    });
  } else {
    // Find tasks with userid that matches with id in the token header
    Task.find({ userid: req.user.id }, (err, task) => {
      if (err) res.send(err);
      res.json(task);
    });
  }
};

exports.create_a_task = (req, res) => {
  // Add userid to database
  newTask = {
    ...req.body,
    userid: req.user.id,
  };

  // validate task
  const { error } = taskAddValidation(newTask);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let new_task = new Task(newTask);
  new_task.save((err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.read_a_task = (req, res) => {
  Task.findById(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = (req, res) => {
  // validate task
  const { error } = taskUpdateValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_a_task = (req, res) => {
  if (req.params.taskId) {
    Task.deleteOne(
      {
        _id: req.params.taskId,
      },
      (err, task) => {
        if (err) res.send(err);
        res.json({ message: "Task successfully deleted" });
      }
    );
  } else {
    Task.deleteMany(
      {
        userid: req.user.id,
      },
      (err, task) => {
        if (err) res.send(err);
        res.json({ message: "All tasks successfully deleted" });
      }
    );
  }
};
