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
  name: string;
  price: number;
  category: string;
  color:string;
  description: string;
  image: string;
}
