const express = require("express")
const shortid = require("shortid")
const validator = require("validator")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const URLModel = require("./mongodb")

app.post("/get-shortened-url", async (req, res) => {
  const { url } = req.body

  try {
    // check if the original URL is already in database
    const existMapping = await URLModel.findOne({
      originalURL: url,
    })

    if (existMapping) {
      res.json({ shortenedURL: existMapping.shortenedURL })
    } else if (validator.isURL(url)) {
      const id = shortid.generate()
      const newDoc = new URLModel({
        originalURL: url,
        shortenedURL: id,
      })

      await newDoc.save()
      res.json({ shortenedURL: id })
    } else {
      res.status(400).send()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

app.get("/:url", async (req, res) => {
  const { url } = req.params

  try {
    // check if the url is a shortened url in the database
    const existMapping = await URLModel.findOne({
      shortenedURL: url,
    })

    if (existMapping) {
      res.redirect(existMapping.originalURL)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

const port = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
