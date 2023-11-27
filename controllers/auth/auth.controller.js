import User from '../../models/User.model.js'
import bcrypt from 'bcryptjs'
import { createError } from '../../utils/error.js'
import jwt from 'jsonwebtoken'


// TODO: USE JWT WITH COOKIE IN THE PROJECT

// Register a new user
export const registerController = async(req, res) => {
    try {
        // hashing our users password using bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // initialize new user details
        const newUser = new User({
            username: req.body.username,
            password: hash,
        })

        // save the new user
        await newUser.save()
            // if saved successfully return status code 201
        res.status(201).json({ message: 'User Has Been Registered Successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error Registering' })
    }
};


// Login user

export const loginController = async(req, res, next) => {
    try {
        // check for user in db and if no user throw an error
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, 'User not found'));

        // compare the credentials on db with the one entered
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) return next(createError(404, 'Password incorrect'));

        // Creating a login token
        const token = jwt.sign({ id: user._id }, process.env.JWT)

        const { password, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(201).json({...otherDetails })
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error When trying to Login' })
    }
};