const express = require('express')
const app = express()
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config()

const port = process.env.PORT || 5000;
const user = process.env.DB_USER
const password = process.env.DB_PASS
const name = process.env.DB_NAME

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${password}@cluster0.ez7qy.mongodb.net/${name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json())


client.connect(err => {
  console.log("connection error", err);
  const collection = client.db("dreamShop").collection("products");
  const ordersCollection = client.db("orderDetails").collection("orders");
  console.log("data connected");


  app.post('/addProducts', (req, res) => {
    const product = req.body;
    collection.insertOne(product)
      .then(result => {
        console.log("insertedCount", result.insertedCount);
        res.send(result.insertedCount > 0)
      })

  })


  app.get('/products', (req, res) => {
    collection.find()

      .toArray((err, items) => {
        res.send(items)
      })

  })


  app.delete('/delete/:id', (req, res) => {
    collection.deleteOne({ _id: ObjectID(req.params.id) })

      .then((result) => {
        res.send(result.insertedCount > 0)
      })

  })


  app.post('/orderDetails', (req, res) => {
    const ordersDetails = req.body;
    ordersCollection.insertOne(ordersDetails)

      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/orders', (req, res) => {

    ordersCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents)
      })

  })



});

app.get('/',(req,res)=>{

  res.send('Working')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})









// const express = require('express')
// const app = express()
// const cors=require('cors');
// const ObjectID =require('mongodb').ObjectID;
// require('dotenv').config()

// const port = process.env.PORT || 5000;
// const user =process.env.DB_USER
// const password=process.env.BD_PASS
// const name=process.env.DB_NAME
// const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://${user}:${password}@cluster0.ez7qy.mongodb.net/${name}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(cors());
// app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
