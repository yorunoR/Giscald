const MUTATION = /* GraphQL */ `
  mutation DeleteGenerationTask($id: ID!) {
    deleteGenerationTask(id: $id) {
      id
    }
  }
`
export default MUTATION
