const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: "ASP .NET Core",
  },
  {
    id: 2,
    name: "REACT",
  },
  {
    id: 3,
    name: "Nodejs",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((n) => n.id === req.params.id);
  if (!course) return res.status(400).send("unable to find course");

  res.send(course);
});

app.get("/api/post/:year/:month", (req, res) => {
  res.send(req.params);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((n) => n.id === req.params.id);
  if (!course) return res.status(400).send("unable to find course");

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  course.name = req.body.name;

  req.status(200).send(course);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((n) => n.id === req.params.id);
  if (!course) return res.status(400).send("unable to find course");

  const index = courses.indexOf(course);

  courses.splice(index, 1);

  res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port} port ...`));
