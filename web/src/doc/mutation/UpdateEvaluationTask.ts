const MUTATION = /* GraphQL */ `
  mutation UpdateEvaluationTask($id: ID!, $plotName: String) {
    updateEvaluationTask(id: $id, plotName: $plotName) {
      id
    }
  }
`
export default MUTATION
