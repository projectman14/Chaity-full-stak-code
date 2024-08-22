import { UserModel } from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

const checkPassword = async (req, res) => {
    try {
        const { password, userId } = req.body

        const user = await UserModel.findById(userId)

        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            return res.status(400).json({
                message: "Incorrect Password",
                error: true
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: '1d' })

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        }

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Login Successfull",
            token: token,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

export { checkPassword }