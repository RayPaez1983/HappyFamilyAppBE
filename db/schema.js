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

  type Home {
    id: ID
    name: String
    areas: [Area]
    finance: Finance
  }

  type Area {
    id: ID
    name: String
    tasks: [Todo]
  }

  type Todo {
    id: ID
    task: String!
    complete: Boolean!
  }
  type Expenses {
    fixedExpenses: Float!
    entertainment: Float!
    discretionarySpending: Float!
  }

  type Finance {
    id: ID
    expenses: Expenses
    income: Float
    saving: Float
    total: Float
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
  input HomeInput {
    name: String!
    areas: [AreaInput]
    finance: FinanceInput!
  }

  input AreaInput {
    name: String
    tasks: [TodoInput]
  }

  input TodoInput {
    task: String!
    complete: Boolean!
  }

  input homeInputUpdate {
    name: String!
    areas: [AreaInput]
    finance: FinanceInput
  }

  input clientInput {
    name: String!
    lastname: String!
    email: String!
    phoneNumber: String
    order: String!
  }

  input ExpensesInput {
    fixedExpenses: Float!
    entertainment: Float!
    discretionarySpending: Float!
  }

  input FinanceInput {
    expenses: ExpensesInput!
    income: Float!
    saving: Float! # en vez de Int!
    total: Float!
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

    getHomes: [Home]
    getHome(id: ID!): Home
    getHomeAreas(id: ID!): [Area] # trae solo las áreas de un Home
    getHomeTask(id: ID!): [Todo]
    getFinance(id: ID!): Finance

    getClients: [Client]
    getClientUser: [Client]
    getClient(id: ID!): Client

    getOrders: [Order]
    getOrdersUser: [Order]
    getOrder(id: ID!): Order
    getOrderState(state: String!): [Order]

    bestClients: [TopClient]
    bestuser: [Topuser]
    searchHome(text: String!): [Home]

    getTodos: [Todo]
  }
  type Mutation {
    #products
    newHome(input: HomeInput!): Home
    updateHome(id: ID!, input: homeInputUpdate): Home
    deleteHome(id: ID!): String

    #areas
    newArea(id: ID!, input: homeInputUpdate): Area
    updateArea(homeId: ID!, areaId: ID!, input: AreaInput): Area
    deleteArea(homeId: ID!, areaId: ID!): String

    #tasks
    newTask(homeId: ID!, areaId: ID!, input: TodoInput): Todo
    updateTask(homeId: ID!, areaId: ID!, taskId: ID!, input: TodoInput): Todo
    deleteTask(homeId: ID!, areaId: ID!, taskId: ID!): String

    #finance
    newFinance(input: FinanceInput): Finance
    updateFinance(id: ID!, input: FinanceInput): Finance
    deleteFinance(id: ID!): String

    #users

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
