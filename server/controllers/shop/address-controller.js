import Address from "../../models/Address.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      res.status(400).json({
        success: false,
        message: "Ivalid data provided",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User and Address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate({ _id: addressId, userId }, formData, {new : true});


    if(!address){
        res.status(404).json({
            success : false,
            message : "Address Not Found"
        })
    }

    res.status(200).json({
        success : true,
        data : address
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {

    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User and Address id is required!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if(!address){
        res.status(404).json({
            success : false,
            message : "Address Not Found"
        })
    }

    res.status(200).json({
        success : true,
        message : "Address Deleted Successfully"
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export { addAddress, editAddress, fetchAllAddress, deleteAddress };
