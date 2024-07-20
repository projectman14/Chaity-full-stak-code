import { UserModel } from "../models/userModel.js"
import bcryptjs from 'bcryptjs'


const registerUser = async (req, res) => {
    try {
        const { name, email, password, profile_pic } = req.body

        const checkEmail = await UserModel.findOne({ email })

        if (checkEmail) {
            return res.status(400).json({
                message: "User already exits",
                error: true
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            profile_pic,
            password: hashPassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return res.status(201).json({
            message: 'User created successfully',
            data: userSave,
            sucess: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

export { registerUser }