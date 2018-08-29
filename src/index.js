const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
}

const opts = {
    port: 4001,
    endpoint: '/graphql'
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://192.168.99.100:4466',
            secret: 'welcome',
            debug: true,
        }),
    }),
})





server.start(() => console.log(`Server is running at http://localhost:${opts.port}${opts.endpoint}`))
