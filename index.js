import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = 8800;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "collimo86",
  database: "articlelist",
});

app.use(express());
app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Data fetched");
  res.json("Hello from the backend");
});

app.get("/articles", (req, res) => {
  const q = "SELECT * FROM articles";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/articles", (req, res) => {
  const q = "INSERT INTO articles (`name`, `author`) VALUES (?)";

  const values = [req.body.name, req.body.author];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/articles/:id", (req, res) => {
  const articleId = req.params.id;
  const q = "DELETE FROM articles WHERE id = ?";

  db.query(q, [articleId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/articles/:id", (req, res) => {
  const articleId = req.params.id;
  const q = "UPDATE articles SET `name`= ?, `author`= ? WHERE id = ?";

  const values = [req.body.name, req.body.author];

  db.query(q, [...values, articleId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});




app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
