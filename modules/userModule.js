const mongoose = require('mongoose');
const {Schema} = mongoose;

//user Schema
const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type:String,
        required:true
    }
});


// task schema
const taskSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    desc: {
        type:String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','inprogress','completed'],
        default: 'pending'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }

},{timestamps: true});

const User = mongoose.model('user',userSchema);
const Task = mongoose.model('task',taskSchema)

module.exports ={User, Task} ;