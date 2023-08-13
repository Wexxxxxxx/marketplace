import express from "express"
import mysql from "mysql"
import cors from 'cors'
const app= express()

const db= mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root123",
    database: "marketplace"


})
 
app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello, this is the backend")
})

app.get("/vcards", (req, res)=>{
    const q= "SELECT * FROM vcards"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    } )
})
app.post("/vcards", (req, res)=>{
    const q= "INSERT INTO vcards (`prod_name`, `prod_description`, `image`, `price`) VALUES(?)";
    const values = [
       
       req.body.prod_name,
       req.body.prod_description,
       req.body.image,
       req.body.price,

       
    ];
    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Succesfuly executed")
    })
})


app.delete("/vcards/:id", (req, res)=>{
    const vcardId= req.params.id;
    const q= "DELETE FROM vcards WHERE id =?"

    db.query(q,[vcardId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Succesfuly deleted")
    })
})

app.put("/vcards/:id", (req, res)=>{
    const vcardId= req.params.id;
    const q= "UPDATE vcards set `prod_name`=?, `prod_description`=?, `image`=?, `price`=? WHERE id=?"
    const values = [
       
        req.body.prod_name,
        req.body.prod_description,
        req.body.image,
        req.body.price,
 
        
     ];

    db.query(q,[...values, vcardId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("item has been successfully updated")
    })
})


app.listen(8800, ()=>{
    console.log("connected to backend")
})