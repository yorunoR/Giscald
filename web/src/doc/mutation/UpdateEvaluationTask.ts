const MUTATION = /* GraphQL */ `
  mutation UpdateEvaluationTask($id: ID!) {
    updateEvaluationTask(id: $id) {
      id
    }
  }
`
export default MUTATION
