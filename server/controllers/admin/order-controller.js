import Order from "../../models/Order.js";

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      res.status(404).json({
        success: false,
        message: "No Orders Found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const updateOrderStatus = async(req,res)=>{
  try {
    const {id} = req.params;
    const {orderStatus} = req.body;

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    await Order.findByIdAndUpdate(id,{orderStatus});

    res.status(200).json({
      success: true,
      message: 'Order Status is updated successfully!'
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
}

export {getAllOrdersOfAllUsers ,updateOrderStatus, getOrderDetailsForAdmin};
