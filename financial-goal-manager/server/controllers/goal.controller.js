import Goal from '../models/goal'
import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'

/**
 * Get all goals
 * @param req
 * @param res
 * @returns void
 */
export function getGoals (req, res) {
  Goal.find().sort('-dateAdded').exec((err, goals) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ goals })
  })
}

/**
 * Save a goal
 * @param req
 * @param res
 * @returns void
 */
export function addGoal (req, res) {
  if (!req.body.goal.name || !req.body.goal.years || !req.body.goal.years.length) {
    res.status(500).end()
  }

  const newGoal = new Goal(req.body.goal)

  // Let's sanitize inputs
  newGoal.name = sanitizeHtml(newGoal.name)
  newGoal.description = sanitizeHtml(newGoal.description)

  newGoal.slug = slug(newGoal.name.toLowerCase(), { lowercase: true })
  newGoal.cuid = cuid()
  newGoal.save((err, saved) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ goal: saved })
  })
}

/**
 * Get a single goal
 * @param req
 * @param res
 * @returns void
 */
export function getGoal (req, res) {
  Goal.findOne({ _id: req.params.cuid }).exec((err, goal) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ goal })
  })
}

/**
 * Delete a goal
 * @param req
 * @param res
 * @returns void
 */
export function deleteGoal (req, res) {
  Goal.findOne({ _id: req.params.cuid }).exec((err, goal) => {
    if (err) {
      res.status(500).send(err)
    }

    goal.remove(() => {
      res.status(200).end()
    })
  })
}

export function editGoal (req, res) {
  const { body: { goal: { _id } } } = req
  Goal.findOne({ _id: _id }).exec((err, goal) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    const progress = goal.progress.map(progress => progress)

    goal.remove((err) => {
      if (err) {
        res.status(500).send(err)
        return
      }

      const newGoal = new Goal(req.body.goal)

      // Let's sanitize inputs
      newGoal.name = sanitizeHtml(newGoal.name)
      newGoal.description = sanitizeHtml(newGoal.description)

      newGoal.slug = slug(newGoal.name.toLowerCase(), { lowercase: true })
      newGoal.cuid = cuid()
      newGoal.progress = progress
      newGoal.save((err, saved) => {
        if (err) {
          res.status(500).send(err)
        }

        res.json({ goal: saved })
      })
    })
  })
}

export function addProgress (req, res) {
  const { params: { cuid }, body: { progress } } = req

  Goal.findOne({ _id: cuid }).exec((err, goal) => {
    if (err) {
      res.status(500).send(err)
    }

    goal.progress = goal.progress.concat([progress])
    goal.save((err, saved) => {
      if (err) {
        res.status(500).send(err)
      }

      res.json({ progress })
    })
  })
}

export function deleteProgress (req, res) {
  const { params: { cuid }, body: { progress } } = req

  Goal.findOne({ _id: cuid }).exec((err, goal) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    goal.progress = goal.progress
      .filter(entry => entry && entry[0])
      .map(entry => entry[0])
      .filter(entry => entry.date !== progress.date && entry.value !== progress.value)
    goal.save((err, saved) => {
      if (err) {
        res.status(500).send(err)
        return
      }

      res.json({ progress })
    })
  })
}
