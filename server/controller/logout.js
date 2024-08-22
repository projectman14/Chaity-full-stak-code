const logout = async (req, res) => {
    try {

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        }

        return res.cookie('token', "", cookieOptions).status(200).json({
            message: "Session Out",
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

export { logout }