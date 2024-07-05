const MUTATION = /* GraphQL */ `
  mutation CreateQuestion(
    $benchId: ID!
    $questionNumber: Int!
    $category: String!
    $turn: String!
    $correctAnswer: String
    $evalAspect: String
  ) {
    createQuestion(
      benchId: $benchId
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
