import express from 'express';

const app = express();

app.get("/teste", (req, res) => {
  return res.send("Olá back-end");
});

app.post("/teste-post", (req, res) => {
  return res.send("Metodo post");
});

app.listen(3030, () => console.log("server is running"));