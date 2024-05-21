const {gql} = require('apollo-server')

const typeDefs = gql`
    scalar DateTime

    type User{
        id: ID!
        name: String!
        email: String!    
        createdAt: DateTime!
        updatedAt: DateTime!
        messages: [Message!]!
        chats:[Chat!]!
        replies: [Message!]!
    }

    type Chat{
        id:ID!
        chatName:String!
        createdAt: DateTime!
        updatedAt: DateTime!
        messages: [Message!]!
        users: [User!]!
    }

    type Message{
        id:ID!
        content:String!
        sentAt:DateTime!
        chat:Chat!
        user:User!
        parent:Message  
        replies:[Message!]!    
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        chats: [Chat!]!
        chat(id: ID!): Chat
        messages: [Message!]!
        message(id: ID!): Message
        userMessages(userId:ID!): [Message!]!
    }

    type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): User!

    createChat(userIds: [Int!]!, chatName: String!): Chat!
    updateChat(id: ID!, chatName: String!, userIds: [Int!]!): Chat!
    deleteChat(id: ID!): Chat! 

    createMessage(content: String!, chatId: Int!, userId: Int!, parentId: Int!): Message!
    updateMessage(id: ID!, content: String): Message!
    deleteMessage(id: ID!): Message!

    addUserToChat(chatId:ID!,userId:ID!):Chat!
    removeUserFromChat(chatId:ID!,userId:ID!):Chat!

    replyToMessage(messageId:ID!,content:String!):Message!

    
  }
`
module.exports = typeDefs;

//This is the chatbox typeDefs
