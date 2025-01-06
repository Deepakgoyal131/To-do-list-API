const express = require('express');
const router = express.Router();

const { User } = require('../modules/userModule');
const { Task } = require('../modules/userModule');

//Find all Task
router.get('/allTask/:id',async (req,res)=>{
    try {
        let tasks = await Task.find({user: req.params.id}).select('-user').sort({createdAt: -1});
        return res.json(tasks);
        
    } catch (error) {
        res.status(500).send('Something is Wrong')
    }

})

// Create New Task
router.post('/createTask/:id', async (req, res) => {

    const {title, desc, status} = req.body;

    try {
        const user = await User.findById(req.params.id).select('-password -__v');
   
        let task = await Task.create({title: title, desc: desc, status, user: user._id});

        tast = await task.save();

        return res.json(task);

    } catch (error) {
        res.status(500).send("Something is wrong");
    }
});

//Delete task
router.delete('/deleteTask/:id/:tskid', async (req,res)=>{
    
    const {id, tskid} = req.params;

    try {
        let task = await Task.deleteOne({_id: tskid, user: id})
        
        if(task.deletedCount === 1){
            return res.send("Task Deleted Succesfully")
        }
        else{
            return res.send("Task Not Deleted");
        }
       
        
    } catch (error) {
        return res.status(500).send("something is wrong")
    }
    
})

//Update task status
router.put('/updateStatus/:id/:tskid',async (req,res)=>{
    const {id, tskid} = req.params;

    try {
        let task = await Task.findOneAndUpdate({_id: tskid, user: id},{$set: {status: req.body.status}},{new: true});

        return res.json(task);

    } catch (error) {
        return res.status(500).send("Some thing is wrong");
    }
})
module.exports = router;