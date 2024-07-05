const MUTATION = /* GraphQL */ `
  mutation UpdateQuestion(
    $id: ID!
    $questionNumber: Int!
    $category: String!
    $turn: String!
    $correctAnswer: String
    $evalAspect: String
  ) {
    updateQuestion(
      id: $id
      questionNumber: $questionNumber
      category: $category
      turn: $turn
      correctAnswer: $correctAnswer
      evalAspect: $evalAspect
    ) {
      id
    }
  }
`
export default MUTATION
