const express = require('express');
const mongoose = require('mongoose');


let app = express();   

app.use(express.json());     // <==== parse request body as JSON


//connect server to mongo server ==> local db

mongoose.connect('mongodb://127.0.0.1:27017/e_learning').
catch(error=>handleError(error));

// schema (students)

const studentSchema = new mongoose.Schema({
    student_id : String,
    nameOfStudent : String,
    age : Number,
    phone : String

});

// convert schema to model (class)(students)
let studentModel = new mongoose.model("students",studentSchema);

// schema (material)
const materialSchema = new mongoose.Schema({
    subjectName : String,
    code : String,
    department : String,
    numberOfStudents : Number

});

// convert schema to model (class)(materials)
let materialModel = new mongoose.model("materials",materialSchema);

// schema (level)
const levelSchema = new mongoose.Schema({
    nameOfStudent : String,
    department : String,
    levelNumber : Number,
    gpa : Number

});

// convert schema to model (class)(levels)
let levelModel = new mongoose.model("levels",levelSchema);

// endpoint fetch all students rom db
// localhost:8000/students
app.get('/students',async (req,res)=>{
    let allStudents = await studentModel.find();
    res.status(200);
    console.log("student table length",allStudents.length);
    res.json(allStudents);
})

app.get('/',async (req,res)=>{
    res.send("welcome")
})

// verb post
// localhost:8000/students
app.post('/students',async (req,res)=>{
    const data = req.body
    
    let newStudent = await studentModel(data).save();

    res.status(201);
    res.json("the student has been added successfully")
})

// update (students)
app.put('/students/update',async (req,res)=>{
    const data = req.body
    
   await studentModel.findByIdAndUpdate({_id:data.studentId},data)

    res.status(200);
    res.json("student has updated")
})

// endpoint fetch all materials rom db
// localhost:8000/materials
app.get('/materials',async (req,res)=>{
    let allMaterials = await materialModel.find();
    res.status(200);
    console.log("material table length",allMaterials.length);
    res.json(allMaterials);
})

// verb post
// localhost:8000/materials
app.post('/materials',async (req,res)=>{
    const data = req.body
    
    let newMaterial = await materialModel(data).save();

    res.status(201);
    res.json("new raw  has been added successfully in material table")
})

// update (materials)
app.put('/materials/update',async (req,res)=>{
    const data = req.body
    
   await materialModel.findByIdAndUpdate({_id:data.materialId},data)

    res.status(200);
    res.json("material has updated")
})

// endpoint fetch all materials rom db
// localhost:8000/levels
app.get('/levels',async (req,res)=>{
    let allLevels = await levelModel.find();
    res.status(200);
    console.log("levels table length",allLevels.length);
    res.json(allLevels);
})

// verb post
// localhost:8000/levels
app.post('/levels',async (req,res)=>{
    const data = req.body
    
    let newLevel = await levelModel(data).save();

    res.status(201);
    res.json("new raw  has been added successfully in levels table")
})

// update (levels)
app.put('/levels/update',async (req,res)=>{
    const data = req.body
    
   await levelModel.findByIdAndUpdate({_id:data.levelId},data)

    res.status(200);
    res.json("level has updated")
})


app.listen(8000,function(){
    console.log('server now is opend')
})
 