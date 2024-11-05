import mongoose from "mongoose"
import Product from "../models/product.model.js"

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log("Error in fetching items:", error.message)
    res.status(500).json({ success: false, message: "Data fetching failed from server side." })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'All fields must be entered.' })
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    console.error("Error in Creating item:", error.message)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params

  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid ID." })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.error("Updating failed: ", error.message)
    res.status(500).json({ success: false, message: "Server Error." })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: "Product deleted." })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server side Error." })
  }
}