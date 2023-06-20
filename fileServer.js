const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
const port = 8080

app.get("/files", (req, res) => {
  fs.readdir(__dirname + "/files", (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve files" })
    }
    res.json(files)
  })
})

app.get("/file/:filename", (req, res) => {
  const fileName = req.params.filename
  fs.readFile(__dirname + `/files/${fileName}`, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).send("File not found")
    }
    res.send(data)
  })
})

app.get("*", (req, res) => {
  res.status(404).send("Route not found")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:8080`)
})

module.exports = app
