import express from "express"
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js"

const router = express.Router()

// api for obtaining items
router.get("/", getProduct)

// api to add a new item
router.post("/", createProduct)

//api to update an item
router.put("/:id", updateProduct)

// api to delete a certain item
router.delete("/:id", deleteProduct)

export default router