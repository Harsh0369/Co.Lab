import jwt from 'jsonwebtoken'
import redisClient from '../services/redis.service.js'


export const authUSer = async (req, res, next) => { 
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1]
        if (!token) {
            console.log('no token')
            return res.sratus(401).json({ errors: 'unauthorized' })
        }

        const isBlacklisted = await redisClient.get(token);
        if (isBlacklisted) {
            console.log('blacklisted token')
            res.cookie('token', '')
            return res.status(401).json({ errors: 'unauthorized' })
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