"use strict";

const router = require("express").Router();

router.use("/messages", require("./messages"));
router.use("/thunkM", require("./thunkM"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
