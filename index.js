const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI =
	'mongodb+srv://hixstore:4dFeK1zbgQGSHPZY@cluster0.rafsdqy.mongodb.net/?retryWrites=true&w=majority' // Замените на свою строку подключения

let db
let productsCollection

app.use(bodyParser.json())

// Настройка соединения с MongoDB
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
	if (err) throw err
	db = client.db('YOUR_DB_NAME') // Замените на имя вашей базы данных
	productsCollection = db.collection('products')
})

app.post('/api/addProduct', (req, res) => {
	const productData = req.body
	productsCollection.insertOne(productData, (err, result) => {
		if (err) throw err
		res.status(201).json({ message: 'Product added successfully' })
	})
})

app.delete('/api/deleteProduct/:code', (req, res) => {
	const codeToDelete = req.params.code
	productsCollection.deleteOne({ code: codeToDelete }, (err, result) => {
		if (err) throw err
		res.json({ message: 'Product deleted successfully' })
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
