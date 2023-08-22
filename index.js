const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// Подключение к MongoDB
const MONGO_URI =
	'mongodb+srv://hixstore:Maksymovych1@cluster0.rafsdqy.mongodb.net/?retryWrites=true&w=majority'

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Error connecting to MongoDB', err))

// Определение схемы и модели
const ProductSchema = new mongoose.Schema({
	name: {
		en: String,
		uk: String,
		de: String,
		pl: String,
		hu: String,
	},
	description: {
		en: String,
		uk: String,
		de: String,
		pl: String,
		hu: String,
	},
	id: Number,

	brand: String,

	photo: String,
	price: String,
	code: String,
	part: String,
	// ... другие поля
})

const Product = mongoose.model('Product', ProductSchema)

app.use(bodyParser.json())
app.get('/api/products/:id', async (req, res) => {
	const productId = req.params.id

	try {
		const product = await Product.findOne({ id: productId })
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}
		res.json(product)
	} catch (err) {
		console.error('Ошибка при получении информации о продукте:', err)
		res.status(500).send('Ошибка на сервере')
	}
})
app.get('/api/products', async (req, res) => {
	try {
		const products = await Product.find()
		res.json(products)
	} catch (err) {
		console.error('Ошибка при получении товаров:', err)
		res.status(500).send('Ошибка на сервере')
	}
})

// Добавление продукта
app.post('/api/addProduct', async (req, res) => {
	const productData = req.body
	const newProduct = new Product(productData)

	try {
		await newProduct.save()
		res.status(201).json({ message: 'Product added successfully' })
	} catch (err) {
		res.status(500).json({ error: 'Error adding product' })
		console.error(err)
	}
})

// Удаление продукта
app.delete('/api/deleteProduct/:code', async (req, res) => {
	const codeToDelete = req.params.code

	try {
		await Product.findOneAndDelete({ code: codeToDelete })
		res.json({ message: 'Product deleted successfully' })
	} catch (err) {
		res.status(500).json({ error: 'Error deleting product' })
		console.error(err)
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
const cors = require('cors')
app.use(cors())
