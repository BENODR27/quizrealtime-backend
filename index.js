const express = require('express');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const authenticateJWT = require('./middleware/authMiddleware');
const watchMan = require('./middleware/watchMan');

const helmet = require('helmet');
const compression = require('compression');
const limiter = require('./utills/ratelimiter');
const logger = require('./utills/logger');
const cors = require('cors');


const app = express();

app.use(helmet());
// app.use(limiter);
app.use(compression());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors({
  origin: '*', // Restrict allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api',/*authenticateJWT,*/watchMan, routes); // Prefix routes with /api
// app.use('/auth', authRoutes); // Authentication routes

// /* Teachers */
// app.post('/teachers', authenticateJWT,async (req, res) => {
//   try {
//     const teacher = await Teacher.create(req.body);
//     res.status(201).json(teacher);
//   } catch (error) {
//     if (error.name === 'SequelizeValidationError') {
//       // Validation errors
//       res.status(400).json({
//         errors: error.errors.map(e => e.message)
//       });
//     } else {
//       // Other errors
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// });

// app.get('/teacherss', async (req, res) => {
//   const teacher = await Teacher.findAll({
//     include: ['classes']
//   });
//   res.json(teacher);
// });
// app.get('/teachers/:id', async (req, res) => {
//   const teacher = await Teacher.findByPk(req.params.id, {
//     include: ['classes','profile']
//   });
//   res.json(teacher);
// });

// app.put('/teachers/:id', async (req, res) => {
//   await Teacher.update(req.body, { where: { id: req.params.id } });
//   res.json({ success: true });
// });

// app.delete('/teachers/:id', async (req, res) => {
//   await Teacher.destroy({ where: { id: req.params.id } });
//   res.json({ success: true });
// });
// // Create a Profile for a Teacher
// app.post('/teachers/:id/profile', async (req, res) => {
//   const teacher = await Teacher.findByPk(req.params.id);
//   const profile = await teacher.createProfile(req.body);
//   res.json(profile);
// });

// // Get a Teacher's Profile
// app.get('/teachers/:id/profile', async (req, res) => {
//   const profile = await Profile.findOne({
//     where: { teacherId: req.params.id }
//   });
//   res.json(profile);
// });

// app.post('/teachers-with-classes', async (req, res) => {
//   const { name, subject, classes } = req.body;

//   try {
//     // Start a transaction to ensure data integrity
//     const result = await sequelize.transaction(async (t) => {
//       // Create the teacher
//       const teacher = await Teacher.create(
//         {
//           name,
//           subject,
//           classes,  // This directly associates classes with the teacher
//         },
//         {
//           include: [{ model: Class, as: 'classes' }],
//           transaction: t
//         }
//       );
      
//       return teacher;
//     });

//     res.status(201).json(result);
//   } catch (error) {
//     console.error('Error creating teacher with classes:', error);
//     res.status(500).json({ error: 'Failed to create teacher with classes' });
//   }
// });

// /* Students */
// app.post('/students', async (req, res) => {
//   const student = await Student.create(req.body);
//   res.json(student);
// });

// app.get('/students/:id', async (req, res) => {
//   const student = await Student.findByPk(req.params.id, {
//     include: ['classes']
//   });
//   res.json(student);
// });

// app.put('/students/:id', async (req, res) => {
//   await Student.update(req.body, { where: { id: req.params.id } });
//   res.json({ success: true });
// });

// app.delete('/students/:id', async (req, res) => {
//   await Student.destroy({ where: { id: req.params.id } });
//   res.json({ success: true });
// });

// /* Classes */
// app.post('/classes', async (req, res) => {
//   const newClass = await Class.create(req.body);
//   res.json(newClass);
// });

// app.get('/classes/:id', async (req, res) => {
//   const classData = await Class.findByPk(req.params.id, {
//     include: ['teacher', 'students']
//   });
//   res.json(classData);
// });

// app.put('/classes/:id', async (req, res) => {
//   await Class.update(req.body, { where: { id: req.params.id } });
//   res.json({ success: true });
// });

// app.delete('/classes/:id', async (req, res) => {
//   await Class.destroy({ where: { id: req.params.id } });
//   res.json({ success: true });
// });
// // Add a Student to a Class
// app.post('/classes/:classId/students/:studentId', async (req, res) => {
//   const classData = await Class.findByPk(req.params.classId);
//   const student = await Student.findByPk(req.params.studentId);
//   await classData.addStudent(student);
//   res.json({ success: true });
// });

// // Get Students in a Class
// app.get('/classes/:id/students', async (req, res) => {
//   const classData = await Class.findByPk(req.params.id, {
//     include: ['students']
//   });
//   res.json(classData.students);
// });

// Get Classes a Student is Enrolled In
// app.get('/students/:id/classes', async (req, res) => {
//   try {
//     const student = await Student.findByPk(req.params.id, {
//       include: ['classes']
//     });
//     res.json(student.classes);
//   } catch (error) {
//     res.json({
//       status:"something went wrong"
//     });
//   }

// });
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/* Start Server */
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  logger.info(`Server is running on port 3000`);

});
//npm audit prune

