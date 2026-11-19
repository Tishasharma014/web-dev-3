const express = require("express");
const router = express.Router();
const students = require("../data/students");

// Returns true only if name, age and course are all valid
const isValid = ({ name, age, course }) =>
  typeof name === "string" && name.trim() !== "" &&
  typeof course === "string" && course.trim() !== "" &&
  typeof age === "number" && age > 0;

// GET /students - all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - one student
router.get("/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
});

// POST /students - add a student
router.post("/", (req, res) => {
  const body = req.body || {};
  if (!isValid(body)) {
    return res.status(400).json({ error: "Name, age and course are required" });
  }
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name: body.name.trim(),
    age: body.age,
    course: body.course.trim(),
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id - update a student
router.put("/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  const body = req.body || {};
  if (!isValid(body)) {
    return res.status(400).json({ error: "Name, age and course are required" });
  }
  student.name = body.name.trim();
  student.age = body.age;
  student.course = body.course.trim();
  res.status(200).json(student);
});

// DELETE /students/:id - remove a student
router.delete("/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const [deleted] = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted", student: deleted });
});

module.exports = router;