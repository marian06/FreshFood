const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlwares/authMiddleware");


//new user registration
router.post("/register", async (req, res) => {
    try {
        // check if user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error("Utilizatorul exista deja!");
        }

        // // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // save user
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "Utilizator creeat cu succes!",
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// user login
router.post("/login", async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'Utilizatorul nu a fost gasit!'
            });
        }

        // check if user is active
        if (user.status !== 'activ') {
            throw new Error('Utilizatorul este blocat!');
            };
        
        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: 'Parola incorecta!'
            });
        }

        // create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: '1d' });

        // send response
        res.send({
            success: true,
            message: 'Logare cu succes!',
            data: token
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});


// get current user
router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            success: true,
            message: "Utilizatorul a fost gasit!",
            data: user,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get all users
router.get("/get-users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send({
            success: true,
            message: "Lista utilizatori a fost gasita!",
            data: users,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// update user status
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Statusul utilizatorului a fost actualizat!",
        });
    } catch
    (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});




module.exports = router;