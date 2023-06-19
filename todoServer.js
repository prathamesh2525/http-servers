
  
const express = require("express")
const bodyParser = require("body-parser")
const { v4: uuidv4 } = require("uuid")

const app = express()
const port = 8080
let todos = []

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/todos", (req, res) => {
  res.json(todos)
})

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => {
    return todo.id === req.params.id
  })
  if (todo) {
    res.json(todo)
  } else {
    res.status(404).send("404 not found")
  }
})

app.post("/todos", (req, res) => {
  const todo = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    completed: false,
  }
  todos.push(todo)
  res.status(201).json(todo)
})

app.put("/todos/:id", (req, res) => {
  const id = req.params.id
  const updatedTodo = req.body
  const index = todos.findIndex((todo) => todo.id === id)
  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      ...updatedTodo,
    }
    res.json(todos[index])
  } else {
    res.status(404).send("Todo item not found...")
  }
})

app.delete("/todos/:id", (req, res) => {
  let found = false
  const id = req.params.id
  todos = todos.filter((todo) => {
    found = true
    todo.id !== id
  })
  if (found) {
    res.status(200).send("Todo Item found and deleted")
  } else {
    res.status(404).send("Todo Item not found...")
  }
})

app.get("/*", (req, res) => {
  res.status(404).send("Error: Route not found")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:8080`)
})

module.exports = app
