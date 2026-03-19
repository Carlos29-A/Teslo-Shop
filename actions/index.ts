// Product
export * from "./product/product-pagination";
export * from "./product/get-product-by-slug";
export * from "./product/get-stock-by-slug";


// Auth
export * from "./auth/register";
export * from "./auth/login";


// Address
export * from "./address/set-user-address";
export * from "./address/delete-user-address";
export * from "./address/get-user-address";

// Order
export * from "./order/place-order";
export * from "./order/get-order-by-id";
export * from "./order/get-ordes-by-user";
export * from "./order/get-paginated-orders";

// Payments
export * from "./payments/set-transaction-id";
export * from "./payments/paypal-check-payment";

// User
export * from "./user/get-paginater-user";
export * from "./user/change-user-role";

// Category
export * from "./category/get-categories";