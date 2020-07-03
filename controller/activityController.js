const db = require("../app/db.js");
const Activity = db.activities;
// const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.addActivity = asyncMiddleware(async (req, res) => {
  // Add activity to Database
  //   const userId = req.params.id;
  await Activity.create({
    date: req.body.data.date,
    activity: req.body.data.activity,
    duration: req.body.data.duration,
    details: req.body.data.details,
    weight: req.body.data.weight
  });
  res.status(201).send({
    status: "New activity added!"
  });
});

//delete activity by id
exports.deleteActivity = asyncMiddleware(async (req, res) => {
  const activity_id = req.params.id;
  await Activity.destroy({ where: { id: activity_id } });
  res.status(201).send({
    status: "Article deleted!"
  });
});

//update activity by id
exports.updateActivity = asyncMiddleware(async (req, res) => {
  await Activity.update(
    {
      date: req.body.date,
      activity: req.body.activity,
      duration: req.body.duration,
      details: req.body.details,
      weight: req.body.weight
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Activity updated!"
  });
});

//show activity by id
exports.showActivity = asyncMiddleware(async (req, res) => {
  const activity = await Activity.findAll({
    where: { id: req.params.id },
    attributes: ["id", "date", "activity", "duration", "details", "weight"]
  });
  res.status(200).json({
    data: activity
  });
  //   console.log(activity);
});

//show all active articles
exports.showAllActivity = asyncMiddleware(async (req, res) => {
  const activity = await Activity.findAll({
    attributes: ["id", "date", "activity", "duration", "details", "weight"]
  });
  res.status(200).json({
    data: activity
  });
});
