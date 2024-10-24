import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderID"));

      dispatch(capturePayment({paymentId, payerId, orderId})).then(data=>{
        if(data?.payload?.success){
          sessionStorage.removeItem('currentOrderId');
          window.location.href = '/shop/paypal-success'
        }
      })
    }
  }, [paymentId, payerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
