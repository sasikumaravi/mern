const Users = require('../model/userModel');
const usercontrolller = async (req, res, next) => {
    try {
        const user = new Users(req.body);
        await user.save();
        res.status(201).json({ message: 'File added successfuly' });
        next()
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const usereventcontrolller = async (req, res, next) => {
    try {
        const user =await Users.find();
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    usercontrolller,
    usereventcontrolller
}