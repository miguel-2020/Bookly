import express from "express"
import cors from "cors"
import login from "./controllers/login.js"

import auth from "../auth/auth.js"
import books from "./controllers/books.js"
import logout from "./controllers/logout.js"
import search from "../database/dbHelpers/search.js"
import db from "../database/_db.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('src/public'))
const port = 3000

app.post("/api/v1/logout",logout);
app.post("/api/v1/login",login);

app.patch("/api/v1/favorite",auth.protect,(req,res)=>{
 db.update("users",req.user,req.body.bookID,(data)=>{
  if(data[0] == "error"){
    res.status()
  }
  res.status(204);
  res.end();

 })
})


app.get('/api/v1',auth.protect, books)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})