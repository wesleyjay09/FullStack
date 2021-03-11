const express = require("express");
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const pool = require('./pg.js');
const app = express();
const cors = require("cors");

app.use(cors())
app.use(express.json());
app.use(morgan('combined'))
app.use(express.static('public'))



//create task

app.post("/api/todo", cors(), async(req, res)=>{
    try {
      const  {task} = req.body;
      const newTodo = await pool.query("INSERT INTO todo (task) VALUES ($1) RETURNING *", [task]);
      res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//update task complete
app.post("/api/completed", async(req, res)=>{
    try {
      const  {todo_id, completed} = req.body;
      const newCompleted = await pool.query("INSERT INTO completed (todo_id, completed) VALUES ($1, $2) RETURNING *", [todo_id, completed]);
      res.json(newCompleted.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get all todos
app.get("/api/todo", async(req, res)=>{
    try {
      const  allTodos = await pool.query ("SELECT * FROM todo");
      res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
});

//get all completed
app.get("/api/completed", async(req, res)=>{
    try {
      const  allCompleted = await pool.query ("SELECT * FROM completed");
      res.json(allCompleted.rows)
    } catch (err) {
        console.error(err.message)
    }
});
//getting a single task
app.get("/api/todo/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const  singleTodos = await pool.query ("SELECT *FROM todo WHERE todo_id = $1", [id]);
      res.json(singleTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
});
//getting a single completed
app.get("/api/completed/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const  singleCompleted = await pool.query ("SELECT *FROM completed WHERE todo_id = $1", [id]);
      res.json(singleCompleted.rows)
    } catch (err) {
        console.error(err.message)
    }
});
//delete task
app.delete('/api/todo/:id', async (req, res) => {
    let {id} = req.params
try {
    const deleteTask = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json(deleteTask)
    res.end("Task Deleted")
} catch (err) {
    console.error(err.message)
}
})

//delete completed task
app.delete('/api/completed/:id', async (req, res) => {
    let {id} = req.params
try {
    const deleteComplete = await pool.query("DELETE FROM completed WHERE todo_id = $1", [id])
    res.json(deleteComplete)
    res.end("Deleted")
} catch (err) {
    console.error(err.message)
}
})

//update task
app.put('/api/todo/:id', async (req,res) => {
    let {id} = req.params
    let {task} = req.body
    try {
        const updateTodo = await pool.query("UPDATE todo SET (task) = $1 WHERE todo_id = $2", [task, id])
        res.json(updateTodo)
        res.send("Task Updated")
    } catch (err) {
        console.error(err.message)    
    }
})
app.put('/api/todo/:id', async (req,res) => {
    let {id} = req.params
    let {completed} = req.body
    try {
        const updateCompleted = await pool.query("UPDATE completed SET (completed) = $1 WHERE todo_id = $2", [completed, id])
        res.json(updateCompleted)
        res.send("Task Updated")
    } catch (err) {
        console.error(err.message)    
    }
})

app.listen(PORT, ()=>{
    console.log('On PORT 8k')
});
