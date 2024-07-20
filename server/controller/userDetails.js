import { getUSerDetailsFromToken } from "../helpers/getUserDetailsFromToken.js"

const userDetails = async (req, res) => {
    try {
        const token = req.cookies.token || ""

        const user = await getUSerDetailsFromToken(token)

        return res.status(200).json({
            message: "User Data",
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

export { userDetails }