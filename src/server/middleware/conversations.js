const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userToken = req.headers.authorization;
    const userId = req.query?.senderId
    if(userId) {
      const connectedUser = db?.users?.filter(
        user => user.token === userToken
      )[0]
      if(connectedUser && userId == connectedUser.id) {
        const result = db?.conversations?.filter(
          conv => conv.senderId == userId || conv.recipientId == userId
        )
        res.status(200).json(result)
      } else {
        throw new Error('Error!')
      }
    } else {
      const conversationId = req.query?.id
      const result = db?.conversations?.filter(
        conv => conv.id == conversationId
      )[0]
      res.status(200).json(result)
    }
    return
  }

  next()
}