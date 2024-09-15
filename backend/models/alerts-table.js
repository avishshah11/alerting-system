const mongoose = require("mongoose");

const AlertSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Please enter the required message"],
    },
    severity: {
      type: String,
      required: [true, "Please select the severity"],
    },
  },
  { timestamps: true }
);


const Alerts = mongoose.model("Alerts", AlertSchema)

module.exports = Alerts;