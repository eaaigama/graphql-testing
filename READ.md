To run locally: 

$ nodemon server/server.js

Then go to http://localhost:4000/ - Apollo Studio will open by default. If you select the Apollo Studio, the browser redirects you to https://studio.apollographql.com/sandbox/explorer 

and sends an introspection query to retrieve the Schema info so the UI will already have Fields available from the Schema loaded.

The pokemonData resolver in the Graphql server makes a fetch request to this api
https://pokeapi.co/api/v2/pokemon-species/aegislash

and returns this data:
https://pokeapi.co/api/v2/pokemon-species/aegislash


You can use the Studio UI to add all fields to the query or just manually
Copy/paste this query to fetch data from the pokemon api:

query ExampleQuery {
  pokemonData {
    name
    species
    weight
    height
    base_happiness
    capture_rate
    color {
      name
      url
    }
    egg_groups {
      name
      url
    }
    evolution_chain {
      url
    }
    evolves_from_species {
      name
      url
    }
    flavor_text_entries {
      flavor_text
      language {
        name
        url
      }
      version {
        name
        url
      }
    }
  }
}




