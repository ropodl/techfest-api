const mongoose = require("mongoose");

mongoose
  .connect(process.env.db_url)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("DB connection is failed", err);
  });
