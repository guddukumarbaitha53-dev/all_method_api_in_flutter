 const express = require("express");

const app = express();
app.use(express.json());


// Static Data
let students = [
    { id: 1, name: "vijay", class: "10th", age: 15 },
    { id: 2, name: "guriya", class: "9th", age: 14 },
    { id: 3, name: "Priya", class: "10th", age: 15 }
];


// ✅ GET All Students
app.get("/students", (req, res) => {
    res.json(students);
});


// ✅ GET Single Student By ID
app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }

});


// ✅ POST (Add Student)
app.post("/students", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        class: req.body.class,
        age: req.body.age
    };

    students.push(newStudent);
    res.json(newStudent);

});


// ✅ PUT (Update Student)
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student) {
        student.name = req.body.name;
        student.class = req.body.class;
        student.age = req.body.age;

        res.json({ message: "Student updated", student });
    } else {
        res.status(404).json({ message: "Student not found" });
    }

});


// ✅ DELETE Student
app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    students = students.filter(s => s.id !== id);

    res.json({ message: "Student deleted" });

});


// Server Start
app.listen(4000, () => {
    console.log("Server running on port 4000");
});
