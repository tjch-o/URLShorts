require("dotenv").config()
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const cluster = process.env.CLUSTER
const database = process.env.DATABASE_NAME
const mongoDBConnectionURL = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`

const connectionParams = {
  useNewURLParser: true,
  useUnifiedTopology: true
}

mongoose
  .connect(mongoDBConnectionURL, connectionParams)
  .then(() => {
    console.log("Successfully connected to database.")
  })
  .catch((error) => {
    console.log("Could not connect to database:", error)
  })

const urlSchema = new Schema({
    originalURL: {
        type: String,
        required: true
    },
    shortenedURL: {
        type: String,
        required: true,
        unique: true
    }
})

const URLModel = mongoose.model("URL Mapping", urlSchema, "urls")

module.exports = URLModel