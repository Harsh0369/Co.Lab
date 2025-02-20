import jwt from 'jsonwebtoken'


export const authUSer = async (req, res, next) => { 
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1]
        if (!token) {
            console.log('no token')
            return res.sratus(401).json({ errors: 'unauthorized' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (error) {
        console.log(error)
        res.status(401).json({ errors: 'unauthorized' })
    }
}