const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await prisma.user.findMany();
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
    },
    user: async (parent, args) => {
      try {
        return await prisma.user.findUnique({ where: { id: parseInt(args.id) } });
      } catch (error) {
        throw new Error(`Failed to fetch user with id ${args.id}: ${error.message}`);
      }
    },
    chats: async () => {
      try {
        return await prisma.chat.findMany();
      } catch (error) {
        throw new Error(`Failed to fetch chats: ${error.message}`);
      }
    },
    chat: async (parent, args) => {
      try {
        return await prisma.chat.findUnique({ where: { id: parseInt(args.id) } });
      } catch (error) {
        throw new Error(`Failed to fetch chat with id ${args.id}: ${error.message}`);
      }
    },
    messages: async () => {
      try {
        return await prisma.message.findMany();
      } catch (error) {
        throw new Error(`Failed to fetch messages: ${error.message}`);
      }
    },
    message: async (parent, args) => {
      try {
        return await prisma.message.findUnique({ where: { id: parseInt(args.id) }});
      } catch (error) {
        throw new Error(`Failed to fetch message with id ${args.id}: ${error.message}`);
      }
    },
    userMessages: async(parent,args)=>{
      try {
        return await prisma.message.findUnique({where:{userId:parseInt(args.userId)}})
      } catch(error) {
        throw new Error(`Failed to fetch message with id ${args.userId}:${error.message}`)
      }
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        return await prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
          },
        });
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    updateUser: async (parent, args) => {
      try {
        return await prisma.user.update({
          where: { id: parseInt(args.id) },
          data: {
            name: args.name,
            email: args.email,
          },
        });
      } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        return await prisma.user.delete({
          where: { id: parseInt(args.id) },
        });
      } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
    },
    createChat: async (parent, args) => {
      try {
        return await prisma.chat.create({
          data: {
            chatName: args.chatName,
            users: {
              connect: args.userIds.map(id => ({ id })),
            },
          },
        });
      } catch (error) {
        throw new Error(`Failed to create chat: ${error.message}`);
      }
    },
    updateChat: async (parent, args) => {
      try {
        return await prisma.chat.update({
          where: { id: parseInt(args.id) },
          data: {
            chatName: args.chatName,
            users: {
              connect: args.userIds.map(id => ({ id })),
            },
          },
        });
      } catch (error) {
        throw new Error(`Failed to update chat: ${error.message}`);
      }
    },
    deleteChat: async (parent, args) => {
      try {
        return await prisma.chat.delete({
          where: { id: parseInt(args.id) },
        });
      } catch (error) {
        throw new Error(`Failed to delete chat: ${error.message}`);
      }
    },
    createMessage: async (parent, args) => {
      try {
        return await prisma.message.create({
          data: {
            content: args.content,
            chat: { connect: { id: parseInt(args.chatId) } },
            user: { connect: { id: parseInt(args.userId) } },
            parent: args.parentId ? { connect: {id: parseInt(args.parentId)}} : undefined
          },
        });
      } catch (error) {
        throw new Error(`Failed to create message: ${error.message}`);
      }
    },
    updateMessage: async (parent, args) => {
      try {
        return await prisma.message.update({
          where: { id: parseInt(args.id) },
          data: {
            content: args.content,
          },
        });
      } catch (error) {
        throw new Error(`Failed to update message: ${error.message}`);
      }
    },
    deleteMessage: async (parent, args) => {
      try {
        return await prisma.message.delete({
          where: { id: parseInt(args.id) },
        });
      } catch (error) {
        throw new Error(`Failed to delete message: ${error.message}`);
      }
    },
    replyToMessage: async(parent,args)=>{
      const originalMessage = await prisma.message.findUnique({ where: { id: parseInt(args.messageId) }});
      if(!originalMessage) throw new Error('message not found')
      try {
        return await prisma.message.create({
          data:{
            content:args.content,
            chatId:originalMessage.chatId,
            userId:originalMessage.userId,
            parentId:originalMessage.id

          }
        })
      } catch (error) {
      }
    }
  },
  User: {
    messages: async (parent) => {
      console.log(parent);
      try {
        return await prisma.message.findMany({ where: { userId: parent.id } });
      } catch (error) {
        throw new Error(`Failed to fetch messages for user with id ${parent.id}: ${error.message}`);
      }
    },
    chats: async (parent) => {
      console.log(parent)
      try {
        // return await prisma.chat.findMany({ where: { users: { some: { id: parent.id } } } });
        return await prisma.chat.findMany({where:{users:{some:{id:parent.id}}}})
      } catch (error) {
        throw new Error(`Failed to fetch chats for user with id ${parent.id}: ${error.message}`);
      }
    },
    replies: async(parent) =>{
      console.log(parent)
      try {
        return await prisma.message.findMany({where:{parentId:parent.id}})
      } catch (error) {
        throw new Error(`Failed to fetch replies for user with id ${parent.id}: ${error.message}`);
      }
    },
  },
  Chat: {
    messages: async (parent) => {
      console.log(parent)
      try {
        return await prisma.message.findMany({ where: { chatId: parent.id } });
      } catch (error) {
        throw new Error(`Failed to fetch messages for chat with id ${parent.id}: ${error.message}`);
      }
    },
    users: async (parent) => {
      console.log(parent)
      try {
        return await prisma.user.findMany({ where: { Chat: { some: { id: parent.id } } } });
      } catch (error) {
        throw new Error(`Failed to fetch users for chat with id ${parent.id}: ${error.message}`);
      }
    },
  },
  Message: {
    chat: async (parent) => {
      try {
        return await prisma.chat.findUnique({ where: { id: parent.chatId } });
      } catch (error) {
        throw new Error(`Failed to fetch chat for message with id ${parent.id}: ${error.message}`);
      }
    },
    user: async (parent) => {
      try {
        return await prisma.user.findUnique({ where: { id: parent.userId } });
      } catch (error) {
        throw new Error(`Failed to fetch user for message with id ${parent.id}: ${error.message}`);
      }
    },
    parent: async(parent) => {
      if(!parent.parentId) return null;
      try{
        return await prisma.message.findUnique({where:{id:parent.parentId}})
      } catch(error){
        console.error(`Error fetching parent message for message ${parent.id}:`, error);
        throw new Error("Failed to fetch parent message for message");
      }
    },
    replies: async(parent) => {
      console.log(parent)
      try {
        return await prisma.message.findMany({where:{parentId:parent.id}})
      } catch (error) {
        console.error(`Error fetching replies for message ${parent.id}:`, error);
        throw new Error("Failed to fetch replies for message");
      }
    }
}
}

module.exports = resolvers;
