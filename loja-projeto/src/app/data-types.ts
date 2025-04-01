export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}

export interface product {
  id: string;
  productId: undefined | string;
  name: string;
  price: number;
  category: string;
  color:string;
  description: string;
  image: string;
  quantity: undefined | number;
}

export interface cart {
  id: string | undefined;
  name: string;
  price: number;
  category: string;
  color:string;
  description: string;
  image: string;
  quantity: undefined | number;
  userId: string;
  productId: string;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: string | undefined;
}