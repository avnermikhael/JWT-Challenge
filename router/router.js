const activityController = require("../controller/activityController.js");

module.exports = function(app) {
  /* GET all activities. */
  app.get("/activities", activityController.showAllActivity);
  /* GET article by ID. */
  app.get("/activity/:id", activityController.showActivity);
  /* ADD activity. */
  app.post("/addactivity", activityController.addActivity);
  /* UPDATE activity. */
  app.put("/updateactivity/:id", activityController.updateActivity);
  /* DELETE activity. */
  app.delete("/activity/:id", activityController.deleteActivity);
};
