import { imageUploadUtils } from "../../helpers/cloudinary.js";
import Product from '../../models/Product.js'

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newProduct.save();
    res.status(200).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

//fetch all product

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured in get",
    });
  }
};

//Edit a product

const editProduct = async (req, res) => {
  try {
    const  {id}  = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    let findProduct = await Product.findById(id);
    
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? '0': price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? '0': salePrice  || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

      await findProduct.save();
      res.status(200).json({
        success:true,
        data: findProduct
      })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured in Edit",
    });
  }
};

//Delete a product

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product) return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });

    res.status(200).json({
      success:true,
      message:"Product Deleted Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
