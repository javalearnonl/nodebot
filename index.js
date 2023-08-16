const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/api/addProduct', (req, res) => {
	// Получите данные товара из req.body
	const productData = req.body

	// Прочитайте файл JSON, обновите его и перезапишите
	const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
	products.push(productData)
	fs.writeFileSync('products.json', JSON.stringify(products, null, 2))

	res.status(201).json({ message: 'Product added successfully' })
})

app.delete('/api/deleteProduct/:code', (req, res) => {
	const codeToDelete = req.params.code

	// Прочитайте файл JSON, найдите и удалите товар
	const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
	const updatedProducts = products.filter(
		product => product.code !== codeToDelete
	)
	fs.writeFileSync('products.json', JSON.stringify(updatedProducts, null, 2))

	res.json({ message: 'Product deleted successfully' })
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
