const mongoose = require("mongoose");
const express = require('express');
const { User, Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get('/me', authenticateJwt,async (req, res) => {
  if (req.user){
    // console.log(req.user.username)
    const user = await Admin.findOne({username : req.user.username})
    res.status(200).json({username: req.user.username, userId: user._id})
  }else{
    res.status(403).json({message: 'Admin does not exist'})
  }
})

router.get('/adminName', authenticateJwt,async (req, res) => {
  
    const adminId = await Admin.findOne({_id : req.header.adminId})
    if (adminId) res.json({username: req.user.username})
    else res.json({username : null})
})


router.post('/signup', async (req, res) => {
const { username, password } = req.body;

const admin = await Admin.findOne({ username })
if (admin) {  
  res.status(403).json({ message: 'Admin already exists'});
} else {
  const obj = { username: username, password: password };  
  const newAdmin = new Admin(obj);
  await newAdmin.save();
  const token = jwt.sign({ username, role: 'admin' }, SECRET);
  res.json({ message: 'Admin created successfully', token });
}

});

router.post('/login', async (req, res) => {
const { username, password } = req.headers;

const admin = await Admin.findOne({ username, password });
if (admin) {
  const token = jwt.sign({ username, role: 'admin' }, SECRET);
  res.json({ message: 'Logged in successfully', token });
} else {
  res.status(403).json({ message: 'Invalid username or password' });
}
});

router.post('/courses', authenticateJwt, async (req, res) => {
const course = new Course(req.body);
await course.save();
res.json({ message: 'Course created successfully', courseId: course._id });
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
try{
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  
  if (course) {
    res.json({ course, message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
}catch(err){
  console.log(err)
}
});

router.get('/courses', authenticateJwt, async (req, res) => {
  // // console.log(req.adminId)
  // res.json({message : "req"})
// const {adminId} = req.headers.adminId
  const courses = await Course.find({});
  res.json({ courses });
});

router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
try{
  if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
    return res.status(400).json({ message: 'Invalid course ID format' });
  }

  const course = await Course.findById(req.params.courseId);
  if (course) {
    res.json({course});
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
}
catch(err) {
  res.status(500)
  console.log(err);
}
});

router.delete('/courses/:courseId', authenticateJwt, async (req, res) => {
  try{
    if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }
    await Course.deleteOne({_id : req.params.courseId});
    res.json({message : 'course deleted successfully'})
  }
  catch (err) {
    res.status(500)
    console.log(err)
  }
})

  module.exports = router