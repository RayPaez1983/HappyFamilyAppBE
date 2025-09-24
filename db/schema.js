import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastname: String
    email: String
    created: String
    role: Role
  }
  type Token {
    token: String
  }
  type Dish {
    id: ID
    dishName: String
    protein: String
    carbohydrates: String
    vegetables: String
    inStock: Int
    price: Float
    created: String
  }
  type Client {
    id: ID
    name: String
    lastname: String
    email: String
    phoneNumber: String
    order: String
    created: String
    user: ID
  }
  type OrderGroup {
    id: ID
    quantity: Int
  }
  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    table: Float
    persons: Float
    client: ID
    user: ID
    created: String
    state: OrderState
  }

  type TopClient {
    total: Float
    client: [User]
  }

  type Topuser {
    total: Float
    user: [Client]
  }

  type Todo {
    id: ID
    text: String!
    complete: Boolean!
  }

  input userInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
    role: String!
  }
  input authInput {
    email: String!
    password: String!
  }
  input dishInput {
    dishName: String!
    protein: String!
    carbohydrates: String!
    vegetables: String!
    inStock: Int!
    price: Float!
  }
  input dishInputUpdate {
    dishName: String
    protein: String
    carbohydrates: String
    vegetables: String
    inStock: Int
    price: Float
  }
  input clientInput {
    name: String!
    lastname: String!
    email: String!
    phoneNumber: String
    order: String!
  }

  input TodoInput {
    text: String!
    complete: Boolean!
  }

  input OrderGroupInput {
    id: ID
    quantity: Int
  }

  input OrderInput {
    order: [OrderGroupInput]
    total: Float!
    table: Float!
    persons: Float!
    client: ID!
    state: OrderState
  }

  enum OrderState {
    PENDING
    COMPLETED
    CANCELLED
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    getUser(token: String!): User
    getUsers: [User]

    getMenu: [Dish]
    getDish(id: ID!): Dish

    getClients: [Client]
    getClientUser: [Client]
    getClient(id: ID!): Client

    getOrders: [Order]
    getOrdersUser: [Order]
    getOrder(id: ID!): Order
    getOrderState(state: String!): [Order]

    bestClients: [TopClient]
    bestuser: [Topuser]
    searchDish(text: String!): [Dish]

    getTodos: [Todo]
  }
  type Mutation {
    #products
    newDish(input: dishInput): Dish
    updateDish(id: ID!, input: dishInputUpdate): Dish
    deleteDish(id: ID!): String

    newUser(input: userInput): User
    authUser(input: authInput): Token

    newClient(input: clientInput): Client
    updateClient(id: ID!, input: clientInput): Client
    deleteClient(id: ID!): String
    deleteUser(id: ID!): String

    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): String

    newTodo(input: TodoInput): Todo
    updateTodo(id: ID!, input: TodoInput): Todo
    deleteTodo(id: ID!): String
  }
`;
const TyeDefs = typeDefs;
export default TyeDefs;
