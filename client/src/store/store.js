import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import adminProductsSlice from "./admin/productSlice.js";
import adminOrderSlice from "./admin/orderSlice.js";
import shopProductsSlice from "./shop/productSlice.js";
import shopCartSlice from "./shop/cartSlice.js";
import shopAddressSlice from "./shop/addressSlice.js";
import shopOrderSlice from "./shop/orderSlice.js";
import shopSearchSlice from "./shop/searchSlice.js";
import shopReviewSlice from "./shop/reviewSlice.js";
import commonFeatureSlice from "./common/featureSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature : commonFeatureSlice,
  },
});

export default store;
