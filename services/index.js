import express from "express";

const port = process.env.PORT || 9000;

const app = express();

console.log('alalalakjc')

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
