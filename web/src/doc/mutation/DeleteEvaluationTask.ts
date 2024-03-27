const MUTATION = /* GraphQL */ `
  mutation DeleteEvaluationTask($id: ID!) {
    deleteEvaluationTask(id: $id) {
      id
    }
  }
`
export default MUTATION
