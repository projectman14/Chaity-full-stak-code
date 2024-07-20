import { UserModel } from "../models/userModel.js"

const searchUser = async (req, res) => {
    try {
        const { searchUser } = req.body

        const query = new RegExp(searchUser, "i", "g")

        const user = await UserModel.find({
            "$or": [
                {
                    name: query
                },
                {
                    email: query
                }
            ]
        }).select("-password")

        return res.json({
            message: 'All User Details',
            data: user,
            success: true
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

export { searchUser }