const resolvers = {
  Query: {
    hi() {
      return "Hello WORLDLSL!"
    },
    users() {
      return [
        {
          _id: "dagflglfhjm",
          name: "Davey T"
        }
      ]
    }
  }
}

export default resolvers;