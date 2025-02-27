import React from "react";

// src/context/OrderFormContext.tsx
export interface Order {
  orderNumber: string;
  date: string;
  status: string;
  items: string[];
  // Additional fields as needed (e.g., buyer info)
}

export interface OrderDetails {
  variant: string;
  size: string;
  quantity: number;
  customIngredients: string[];
}

export interface BuyerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface OrderState {
  step: number;
  orderDetails: OrderDetails;
  buyerDetails: BuyerDetails;
  orderSubmitted: boolean;
  orderNumber: string;
  orders: Order[]; // New array to store confirmed orders
}

const initialState: OrderState = {
  step: 1,
  orderDetails: {
    variant: "",
    size: "",
    quantity: 1,
    customIngredients: [],
  },
  buyerDetails: {
    name: "",
    phone: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  },
  orderSubmitted: false,
  orderNumber: "",
  orders: [], // Initially empty
};

type OrderAction =
  | { type: "SET_ORDER_DETAILS"; payload: Partial<OrderDetails> }
  | { type: "SET_BUYER_DETAILS"; payload: Partial<BuyerDetails> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_ORDER"; payload: string }
  | { type: "RESET_FORM" }
  | { type: "REORDER"; payload: Order }; // Added REORDER action

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SET_ORDER_DETAILS":
      return {
        ...state,
        orderDetails: { ...state.orderDetails, ...action.payload },
      };
    case "SET_BUYER_DETAILS":
      return {
        ...state,
        buyerDetails: { ...state.buyerDetails, ...action.payload },
      };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SUBMIT_ORDER": {
      const newOrder: Order = {
        orderNumber: action.payload,
        date: new Date().toISOString(),
        status: "Pending", // or "Confirmed" depending on your logic
        items: state.orderDetails.variant ? [state.orderDetails.variant] : [],
      };
      return {
        ...state,
        orderSubmitted: true,
        orderNumber: action.payload,
        orders: [...state.orders, newOrder], // Append the new order
      };
    }
    case "RESET_FORM":
      return initialState;
    case "REORDER":
      return {
        ...state,
        // Assuming you want to set orderDetails from the order payload:
        orderDetails: {
          variant: action.payload.items[0] || "",
          size: "", // Adjust based on your order structure
          quantity: 1,
          customIngredients: [],
        },
        // Optionally reset buyerDetails, step, etc.
        step: 1,
        orderSubmitted: false,
        orderNumber: "",
      };
    default:
      return state;
  }
}

const OrderFormContext = React.createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
}>({ state: initialState, dispatch: () => null });

export const OrderFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(orderReducer, initialState);
  // Optionally persist state to localStorage here
  return (
    <OrderFormContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderFormContext.Provider>
  );
};

export const useOrderFormContext = () => React.useContext(OrderFormContext);
