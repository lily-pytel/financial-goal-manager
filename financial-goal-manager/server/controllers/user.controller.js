import User from '../models/user'
import cuid from 'cuid'

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers (req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ users })
  })
}

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function updateUser (req, res) {
  User.remove({}, err => {
    if (err) {
      res.status(500).send(err)
      return
    }

    const newUser = new User(req.body.user)
    newUser.cuid = cuid()
    newUser.save((err, saved) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
        return
      }

      res.json({ users: [saved] })
    })
  })
}
