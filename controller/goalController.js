const express = require('express');
const router = express.Router();
const Goal = require('../model/Goal'); 

// INDEX ROUTE
router.get ("/goals", async (req,res) =>{
  try{
     res.json(await User.find())
  }catch(error){
     res.status(400).json(error)
  }
})

// NEW ROUTE
router.get('/goals/new', (req, res) => {
  // ADD FORM
  res.status(200).json({ message: 'Display form to create a new goal' });
});


// DELETE ROUTE
router.delete("/:id", async(req,res) =>{
  try {
      res.json(await User.findByIdAndDelete(req.params.id))
  }catch(error){
      res.status(400).json(error)
  }
})


// // UPDATE ROUTE 
// router.put('/goals/:id', async (req, res) => {
//   try {
//     // Extract goal ID from the request parameters
//     const goalId = req.params.id;

//     // Find the goal in the database
//     const goal = await Goal.findById(goalId);

//     // Check if the goal exists
//     if (!goal) {
//       return res.status(404).json({ message: 'Goal not found' });
//     }

//     // Assuming you have user authentication middleware that attaches the user ID to the request
//     const userId = req.user.id;

//     // Check if the authenticated user owns the goal
//     if (goal.userId !== userId) {
//       return res.status(403).json({ message: 'Unauthorized access to the goal' });
//     }

//     // Update goal data
//     goal.content = req.body.content;
//     goal.dueDate = req.body.dueDate;

//     // Save the updated goal to the database
//     await goal.save();

//     res.status(200).json(goal);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json(error);
//   }
// });

// CREATE ROUTE
// router.post("/goals", async (req,res) => {
//     try {
//         res.json( await User.create(req.body))
//     }catch (error){
//         res.status(400).json(error)
//     }
// });

router.post('/goals', (req, res) => {
  Goal.create(req.body);
})

// // EDIT ROUTE
// router.get('/goals/:id/edit', async (req, res) => {
//   try {
//     // Extract goal ID from the request parameters
//     const goalId = req.params.id;

//     // Find the goal in the database
//     const goal = await Goal.findById(goalId);

//     // Check if the goal exists
//     if (!goal) {
//       return res.status(404).json({ message: 'Goal not found' });
//     }

//     // Assuming you have user authentication middleware that attaches the user ID to the request
//     const userId = req.user.id;

//     // Check if the authenticated user owns the goal
//     if (goal.userId !== userId) {
//       return res.status(403).json({ message: 'Unauthorized access to the goal' });
//     }

//     // You can render an edit form here with the goal data
//     res.status(200).json({ message: 'Display form to edit the goal', goal });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json(error);
//   }
// });

// SHOW ROUTE
router.get("/:id", async (req,res)=>{
  try{
      res.json(await User.findById(req.params.id));
  }catch (error){
      res.status(400).json(error)
  }
})



module.exports = router;
