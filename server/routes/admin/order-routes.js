import express from "express";
import { getAllOrdersOfAllUsers, updateOrderStatus,getOrderDetailsForAdmin } from "../../controllers/admin/order-controller.js";

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

export default router;
