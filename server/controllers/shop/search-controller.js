import Product from "../../models/Product.js";

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, 'i');

    const createSearchQuery = {
        $or : [
            {title : regEx},
            {description : regEx},
            {category : regEx},
            {brand : regEx},
        ]
    }

    const searchResults = await Product.find(createSearchQuery)

    return res.status(200).json({
        success: true,
        data : searchResults
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export { searchProducts };
