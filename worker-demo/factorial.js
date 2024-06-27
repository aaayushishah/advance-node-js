// import { parentPort } from "worker_threads";
const { parentPort } = require("worker_threads");
function calcFactorial(value) {
  if (value === 1) return 1;
  return value * getFactorial(value - 1);
}

function getFactorial(value) {
  if (value === 1) return 1;
  return value * getFactorial(value - 1);
}

parentPort?.on("message", (value) => {
  console.log("value: ", value);
  // res.send("Sent from POSt message: ", getFactorial(value));
});
module.exports = {
  calcFactorial,
};
