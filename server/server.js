const testMovies = require('../data/testMovies');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    movie(id: String): Movie
    movies: [Movie]
    hello: String
    pokemonData: Pokemon
  }

  type Movie {
    id: String
    title: String
    year: Int
    rating: Float
    genre: [String]
    directors: [String]
    writers: [String]
    cast: [String]
    plot: String
    poster: String
  }

  type Pokemon {
    name: String
    species: String
    weight: Float
    height: Float
    base_happiness: Int
    capture_rate: Int
    color: Color
    egg_groups: [EggGroup]
    evolution_chain: EvolutionChain
    evolves_from_species: PokemonSpecies
    flavor_text_entries: [FlavorTextEntry]
  }

  type Color {
    name: String
    url: String
  }

  type EggGroup {
    name: String
    url: String
  }

  type EvolutionChain {
    url: String
  }

  type PokemonSpecies {
    name: String
    url: String
  }

  type FlavorTextEntry {
    flavor_text: String
    language: Language
    version: Version
  }

  type Language {
    name: String
    url: String
  }

  type Version {
    name: String
    url: String
  }
`;

// Create a resolver
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',

    movie: ({ id }) => {
      return testMovies.find((movie) => movie.id === id) || null;
    },
    movies: () => {
      console.log('in movies');
      return testMovies;
    },
    pokemonData: async () => {
       // Make a fetch request to the desired API endpoint
       const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/aegislash');
       const data = await response.json();
       console.log(data);
       // Return the fetched data
       return data;
    }
  },
};
const myPlugin = {
  async requestDidStart(requestContext) {
    // Check if the request is an introspection request
    if (requestContext.request.operationName === 'IntrospectionQuery') {
      return null; // Skip logging for introspection requests
    }

    console.log('Request started!');

    return {
      async parsingDidStart(requestContext) {
        console.log('Parsing started!', requestContext);
      },

      async validationDidStart(requestContext) {
        console.log('Validation started!');
      },
    };
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [
  //   myPlugin
  // ]
});


server.listen().then(({ url }) => {
  console.log('server is ready at ' + url);
});
