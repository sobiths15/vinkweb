const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers

})

server.listen(4000,()=>{
    console.log("Listening")
})