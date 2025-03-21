import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const PORT = Number(process.env.PORT) || 8000;

const server = new ApolloServer({
  typeDefs: `type Query{hello:String}`,
  resolvers: {
    Query: {
      hello: () => "hello",
    },
  },
});

startStandaloneServer(server, {
  listen: {
    port: PORT,
  },
})
  .then(() => console.log("success"))
  .catch((err) => console.log(err));
