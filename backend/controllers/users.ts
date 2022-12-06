const router = require('express').Router()
import db from "../models"

const { User } = db

router.post('/', async (req: { body: any }, res: { json: (arg0: any) => void }) => {
    const user = await User.create(req.body)
    res.json(user)
})


router.get('/', async (req: any, res: { json: (arg0: any) => void }) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router