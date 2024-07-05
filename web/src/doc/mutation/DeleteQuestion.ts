const MUTATION = /* GraphQL */ `
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`
export default MUTATION
