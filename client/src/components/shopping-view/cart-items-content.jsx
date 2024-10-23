import { Button } from "../ui/button";
import { FaMinus, FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch();
  const { toast } = useToast();

  async function handleCartItemDelete(getCartItem) {
    try {
      const result = await dispatch(
        deleteCartItem({
          userId: user?.id,
          productId: getCartItem?.productId,
        })
      ).unwrap();

      if (result.success) {
        toast({
          title: "Cart item deleted successfully",
        });
      }
    } catch (error) {
      console.error("Failed to delete cart item", error);
    }
  }
  

  async function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;

          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }
    try {
      const result = await dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: getCartItem?.productId,
          quantity:
            typeOfAction === "plus"
              ? getCartItem?.quantity + 1
              : getCartItem?.quantity - 1,
        })
      ).unwrap();

      if (result.success) {
        toast({
          title: "Cart item updated successfully",
        });
      }
    } catch (error) {
      console.error("Failed to update cart quantity", error);
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => {
              handleUpdateQuantity(cartItem, "minus");
            }}
          >
            <FaMinus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            onClick={() => {
              handleUpdateQuantity(cartItem, "plus");
            }}
          >
            <FaPlus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <FaRegTrashCan
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
