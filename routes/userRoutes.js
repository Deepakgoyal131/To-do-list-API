const express = require('express');
const router = express.Router();

const {body,validationResult} = require('express-validator');
//Schema 
const { User } = require('../modules/userModule');

//Create new user
router.post('/createuser',[body('username','user name must be grater than 3').isLength({min:3}), 
body('password','password must be at least 6 character and alha numeric').isLength({min:6}).matches(/[a-zA-Z]/).withMessage('password must contain at least one alphabat').matches(/[0-9]/).withMessage('password must contain at least one numeric value').matches(/[^a-zA-Z0-9]/).withMessage('password must contain at least one Special character')], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const { username, password } = req.body;

    let user = await User.findOne({ username: username });
    if (user) {
        return res.status(400).json({error: 'try with another user name this user name allready exist'})
    }

    try {
        user = await User.create({ username: username, password: password });

        user = await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username: username});

        if (!user) {
            return res.status(400).send('username is wrong');
        }
        if(user.password !== password){
            return res.status(400).send('password not matched')
        }

        return res.json({id: user._id});

    } catch (error) {
        res.status(500).send(error)
    }

})  
  
module.exports = router;