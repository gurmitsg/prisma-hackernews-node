const { GraphQLServer } = require('graphql-yoga')


let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
        ,
    },
    {
        id: 'link-1',
        url: 'www.google.com',
        description: 'Google search engine'
        ,
    }
]
let idCount = links.length

const resolvers = {
    Query: {
        info: () => `Testing info`,
        feeds: () => links,
        feed: (_, {id}) => links.find(link => link.id === id)
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            console.log(root)
            console.log(args)
            links.push(link)
            return link
        },
        put: (_, { id, description, url }) => {
            let updatedLink
            console.log(id, description, url)

            links = links.map(link => {
                if (link.id === id) {
                    updatedLink = {
                        id,
                        description,
                        url
                    }
                    return updatedLink
                }
                else {
                    return link
                }
            })

            return updatedLink
        },
        delete: (_,{id}) => {
            let deletedLink = links.find(link => link.id === id)
            console.log(deletedLink)
            links = links.filter(link => link.id !== id)
            return deletedLink
        }
    },
}


const opts = {
    port: 4001,
    endpoint: '/graphql'
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    opts
})
server.start(() => console.log(`Server is running at http://localhost:${opts.port}${opts.endpoint}`))
