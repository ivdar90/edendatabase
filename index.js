' use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const User = require('./models/user')

const app = express('./models/user')
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/user', (req,res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `request error: ${err}`})   
    if (!users) return res.status(404).send({message: 'usersdon´t exists'})

    res.send(200, {users})
  }) 
})

app.get('/api/user/: userId', (req,res) => {
 let userId = req.params.userId

 User.findById(userId, (err, user) => {
     if (err) return res.status(500).send({message: `request error: ${err}`})
     if (!user) return res.status(404).send({message: `user don´t exist`})
    
    res.status(200).send({user})
  })
})

app.post('/api/user', (req, res) => {
console.log('POST/api/user') 
console.log(req.body)

let user = new User()
user.name = req.body.name
user.lastname = req.body.lastname
user.email = req.body.email
user.phone = req.body.phone
user.description = req.body.description

user.save((err, userSaved) => {
    if (err) res.Status(500).send({message: `error to save database: ${err}`})

res.status(200).send({user: userSaved})
  })
})

app.put('/api/user/:userId', (req, res)  => {
let userId = req.params.userId
let update = req.body

User.findByIdAndUpdate(userId, (err, userUpdated) => {
    if (eer) res.status(500).send({message: `error to update user: ${err}`})
 
     res.estatus(200).send({user: userUpdated})
 })
})

app.delete('/api/user/:/userId', (req, res) => {
let userId = req.params.userId

User.findById(userId, (err, user) => {
    if (er) res.status(500).send({message: `error to delete user: ${err}`})

user.remove(err => {
    if (err) res.status(500).send({message: `error to delete user: ${err}`})
    res.status(200).send({message: 'user deleted'})
   })
  })
})

mongoose.connect('mongodb://edenadmin:1234abcd@ds037468.mlab.com:37468/edenusersdb', (err, res) => {
    if(err) {
        return console.log(`error al conectar a la base de datos: ${err}`)
    }
    console.log('conexion a la base de datos realizada')

    app.listen(port, ()  => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})



