import { getUSerDetailsFromToken } from "../helpers/getUserDetailsFromToken.js"
import { UserModel } from "../models/userModel.js"

const updateUserDetails = async (req, res) => {
    try {
        const token = req.cookies.token || ""

        const user = await getUSerDetailsFromToken(token)

        const { name, profile_pic } = req.body

        const updateUser = await UserModel.updateOne({ _id: user.id }, { name, profile_pic })

        const userInformation = await UserModel.findById(user.id);

        return res.json({
            message: "User Updated Successfully",
            data: userInformation,
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

export { updateUserDetails }