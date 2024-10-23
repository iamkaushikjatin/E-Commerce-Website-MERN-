import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_KEY,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

 

export default paypal;