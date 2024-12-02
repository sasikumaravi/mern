const fs = require('fs')
const express = require('express')
const app = express()
const User = require('../model/eventModel');
const usercontrolller = require('../controller/eventController')
const router = express.Router()
const multer = require('multer')
app.use('/upload', express.static(`upload`))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post('/postfile', upload.single('file'), async (req, res) => {
    const { originalname } = req.file;
    const user = new User({ fileurl: `http://localhost:5000/event/upload/${originalname}`, filename: originalname });
    await user.save();
    res.status(201).json({ message: 'File added successfully' });
    console.log('file svaveod on server');

});
router.post('/postuser', usercontrolller.usercontrolller);
router.get('/getevent', usercontrolller.usereventcontrolller);
router.get('/upload/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const readStream = fs.createReadStream(`upload/${id}`)
        readStream.pipe(res)
    }
    catch (err) {
    }
});
router.get('/getall', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (err) {
    }

});
router.get('/getbyid/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.send(users);
    }
    catch (err) {
    }

});

module.exports = router