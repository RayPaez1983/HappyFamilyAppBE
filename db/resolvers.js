/* eslint-disable no-empty-pattern */
import User from '../models/user.js';
import Home from '../models/homeModel.js';
import Client from '../models/clients.js';
import Todo from '../models/toDo.js';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (user, secretWord) => {
  const { id, email, name, lastname, role } = user;
  return jwt.sign(
    { id, email, name, lastname, role },
    secretWord,
    {
      algorithm: 'HS256',
    },
    {
      expiresIn: '24h',
    }
  );
};

const resolvers = {
  Query: {
    getUser: async (_, { token }) => {
      const userId = await jwt.verify(token, process.env.SECRET_WORD);
      return userId;
    },
    getHomes: async () => {
      try {
        const home = await Home.find({});
        return home;
      } catch (error) {
        console.log(error);
      }
    },
    getHome: async (_, { id }) => {
      const homeId = await Home.findById(id);
      if (!homeId) {
        throw new Error('Home does not exists');
      }
      return homeId;
    },

    getHomeAreas: async (_, { id }) => {
      const home = await Home.findById(id);
      if (!home) throw new Error('Home not found');
      return home.areas;
    },

    getHomeTask: async (_, { id }) => {
      const home = await Home.findById(id);
      if (!home) throw new Error('Home not found');
      return home.areas.flatMap((area) => area.tasks);
    },
    getFinance: async (_, { id }) => {
      const home = await Home.findById(id);
      if (!home) throw new Error('Home not found');
      return home.finance;
    },
    getClients: async () => {
      try {
        const clients = await Client.find({});
        return clients;
      } catch (error) {
        console.log(error);
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    getClientUser: async (_, {}, context) => {
      console.log(context, 'ctx');
      try {
        const clients = await Client.find({
          user: context.user.id.toString(),
        });
        return clients;
      } catch (error) {
        console.log(error);
      }
    },
    getClient: async (_, { id }, context) => {
      const client = await Client.findById(id);
      console.log(id, client, 'info here', context);

      if (!client) {
        throw new Error('Client does not exists');
      }
      if (client.user.toString() !== context.user.id) {
        throw new Error('Check your credentials');
      }
      return client;
    },

    getTodos: async (_, { homeId }) => {
      try {
        const home = await Home.findById(homeId);
        if (!home) throw new Error('Home not found');

        // Extraer solo los tasks de todas las áreas
        const allTasks = home.areas.flatMap((area) => area.tasks);
        return allTasks;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    searchHome: async (_, { text }) => {
      const home = await Home.find({
        $text: {
          $search: text,
        },
      });
      return home;
    },
  },

  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      //check if teh user already exist

      const UserExists = await User.findOne({ email });
      if (UserExists) {
        throw new Error('the user already exists');
      }

      // hash the passsword
      const salt = await bcryptjs.genSaltSync(10);
      input.password = bcryptjs.hashSync(password, salt);

      // save the user
      try {
        const user = new User(input);
        user.save(); // save in the db
        return user;
      } catch (error) {
        console.log(error);
      }
    },

    newTodo: async (_, { input }) => {
      const { id, text, complete } = input;
      console.log(id, text, complete);

      try {
        const todo = new Todo(input);
        todo.save(); // save in the db
        return todo;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTodo: async (_, { id }) => {
      // revisar si el producto existe o no
      let toDoDelete = await Todo.findById(id);

      if (!toDoDelete) {
        throw new Error('Todo does not exist');
      }
      await toDoDelete.deleteOne({ _id: id });

      return 'Todo Delete Succesfull';
    },
    updateTodo: async (_, { id, input }) => {
      // revisar si el producto existe o no
      let todo = await Todo.findById(id);

      if (!todo) {
        throw new Error('Todo does not exist');
      }

      // guardarlo en la base de datos
      todo = await Todo.findOneAndUpdate({ _id: id }, input, { new: true });
      console.log(todo);
      return todo;
    },
    authUser: async (_, { input }) => {
      const { email, password } = input;
      // verify if email exists
      const userExists = await User.findOne({ email });
      if (!userExists) {
        throw new Error("This user doesn't have an account");
      }

      // verify if the password is correct

      const correctPassword = await bcryptjs.compare(
        password,
        userExists.password
      );
      if (!correctPassword) {
        throw new Error('Wrong password');
      }
      // create the token
      return {
        token: createToken(userExists, process.env.SECRET_WORD),
      };
    },
    newHome: async (_, { input }) => {
      console.log(input.areas, 'que pasa aqui');
      const { name } = input;
      const homeExists = await Home.findOne({ name });
      if (homeExists) {
        throw new Error('Home already exist');
      }
      try {
        const home = new Home(input);
        const result = await home.save();
        return result;
      } catch (error) {
        console.log(error);
      }
    },

    updateHome: async (_, { id, input }) => {
      // revisar si el producto existe o no
      let home = await Home.findById(id);

      if (!home) {
        throw new Error('Home does not exist');
      }

      // guardarlo en la base de datos
      home = await Home.findOneAndUpdate({ _id: id }, input, { new: true });
      console.log(home);
      return home;
    },
    deleteHome: async (_, { id }) => {
      // revisar si el producto existe o no
      let homeDelete = await Home.findById(id);

      if (!homeDelete) {
        throw new Error('Home does not exist');
      }
      await homeDelete.deleteOne({ _id: id });

      return 'Home Delete Succesfull';
    },

    newArea: async (_, { id, input }) => {
      let home = await Home.findById(id);
      if (!home) {
        throw new Error('Home does not exist');
      }
      home.areas.push(input);
      home = await Home.findOneAndUpdate({ _id: id }, home, { new: true });
      return home.areas[home.areas.length - 1];
    },
    updateArea: async (_, { homeId, areaId, input }) => {
      const home = await Home.findById(homeId);
      if (!home) {
        throw new Error('Home does not exist');
      }
      const area = home.areas.id(areaId);
      if (!area) {
        throw new Error('Area does not exist');
      }
      area.set(input);
      await home.save();
      return area;
    },
    deleteArea: async (_, { homeId, areaId }) => {
      const home = await Home.findById(homeId);
      if (!home) {
        throw new Error('Home does not exist');
      }
      const area = home.areas.id(areaId);
      if (!area) {
        throw new Error('Area does not exist');
      }
      area.remove();
      await home.save();
      return 'Area deleted successfully';
    },

    newTask: async (_, { homeId, areaId, input }) => {
      const home = await Home.findById(homeId);
      if (!home) {
        throw new Error('Home does not exist');
      }
      const area = home.areas.id(areaId);
      if (!area) {
        throw new Error('Area does not exist');
      }
      area.tasks.push(input);
      await home.save();
      return area.tasks[area.tasks.length - 1];
    },

    newClient: async (_, { input }, context) => {
      console.log(context, 'here the contex', input);
      const { email } = input;
      const client = await Client.findOne({ email });
      if (client) {
        throw new Error('client already exist');
      }
      const NewClient = new Client(input);
      NewClient.user = context.user.id;
      try {
        const result = await NewClient.save();
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    updateClient: async (_, { id, input }, context) => {
      //check if the client exist or not
      let client = await Client.findById(id);
      if (!client) {
        throw new Error('Client does not exist');
      }
      //check if the user is the client owner
      if (client.user.toString() !== context.user.id) {
        throw new Error('Check your credentials');
      }
      // save the client
      client = await Client.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return client;
    },
    deleteClient: async (_, { id }, context) => {
      let client = await Client.findById(id);
      if (!client) {
        throw new Error('Client does not exist');
      }
      if (client.user.toString() !== context.user.id) {
        throw new Error('Check your credentials');
      }
      client = await Client.findOneAndDelete({ _id: id });
      return 'Client was deleted';
    },
    deleteUser: async (_, { id }) => {
      let user = await User.findById(id);
      if (!user) {
        throw new Error('User does not exist');
      }
      user = await User.findOneAndDelete({ _id: id });
      return 'Client was deleted';
    },
  },
};
const Resolvers = resolvers;
export default Resolvers;
