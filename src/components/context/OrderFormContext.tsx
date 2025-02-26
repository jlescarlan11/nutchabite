// context/OrderFormContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";

export interface OrderDetails {
  variant: string;
  size: string;
  quantity: number;
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
}

const initialState: OrderState = {
  step: 1,
  orderDetails: {
    variant: "",
    size: "",
    quantity: 1,
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
};

type OrderAction =
  | { type: "SET_ORDER_DETAILS"; payload: Partial<OrderDetails> }
  | { type: "SET_BUYER_DETAILS"; payload: Partial<BuyerDetails> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_ORDER"; payload: string }
  | { type: "RESET_FORM" };

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
    case "SUBMIT_ORDER":
      return { ...state, orderSubmitted: true, orderNumber: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

interface OrderFormProviderProps {
  children: ReactNode;
}

const OrderFormContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
}>({ state: initialState, dispatch: () => null });

export const OrderFormProvider: React.FC<OrderFormProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderFormContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderFormContext.Provider>
  );
};

export const useOrderFormContext = () => useContext(OrderFormContext);
