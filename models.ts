// =================== User ===================
export interface IUser {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  created?: string;
}

export interface IUserInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IAuthInput {
  email: string;
  password: string;
}

// =================== Token ===================
export interface IToken {
  token: string;
}

// =================== Dish ===================
export interface IDish {
  id?: string;
  dishName: string;
  protein: string;
  carbohydrates: string;
  vegetables: string;
  inStock: number;
  price: number;
  created?: string;
}

export interface IDishInput {
  dishName: string;
  protein: string;
  carbohydrates: string;
  vegetables: string;
  inStock: number;
  price: number;
}

export interface IDishInputUpdate {
  dishName?: string;
  protein?: string;
  carbohydrates?: string;
  vegetables?: string;
  inStock?: number;
  price?: number;
}

// =================== Client ===================
export interface IClient {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  phoneNumber?: string;
  order: string;
  created?: string;
  user?: string; // user ID
}

export interface IClientInput {
  name: string;
  lastname: string;
  email: string;
  phoneNumber?: string;
  order: string;
}

// =================== Order ===================
export interface IOrderGroup {
  id?: string; // dish ID
  quantity: number;
}

export interface IOrder {
  id?: string;
  order: IOrderGroup[];
  total: number;
  table: number;
  persons: number;
  client: string; // client ID
  user?: string; // user ID
  created?: string;
  state: OrderState;
}

export interface IOrderInput {
  order: IOrderGroup[];
  total: number;
  table: number;
  persons: number;
  client: string; // client ID
  state?: OrderState;
}

// Enum for state
export type OrderState = 'PENDING' | 'COMPLETED' | 'CANCELLED';

// =================== Aggregations ===================
export interface ITopClient {
  total: number;
  client: IUser[];
}

export interface ITopUser {
  total: number;
  user: IClient[];
}

// =================== Todo ===================
export interface ITodo {
  id?: string;
  text: string;
  complete: boolean;
}

export interface ITodoInput {
  text: string;
  complete: boolean;
}
