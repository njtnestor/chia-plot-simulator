// Connect Mongo
import mongoose from 'mongoose'
// Connection url
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.8jsxn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

export function init () {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
