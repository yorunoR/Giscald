/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** Date with time (isoformat) */
  DateTime: { input: string; output: string }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export enum EvaluationTaskStatusType {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Started = 'Started'
}

export type EvaluationTaskType = {
  __typename?: 'EvaluationTaskType'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  points: Scalars['JSON']['output']
  status: EvaluationTaskStatusType
}

export enum GenerationTaskStatusType {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Started = 'Started'
}

export type GenerationTaskType = {
  __typename?: 'GenerationTaskType'
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  modelName: Scalars['String']['output']
  name: Scalars['String']['output']
  status: GenerationTaskStatusType
}

export type Mutation = {
  __typename?: 'Mutation'
  createEvaluationTask: EvaluationTaskType
  createGenerationTask: GenerationTaskType
  signin: UserType
  updateEvaluationTask: EvaluationTaskType
}

export type MutationCreateEvaluationTaskArgs = {
  evalName: Scalars['String']['input']
  model: Scalars['String']['input']
  name: Scalars['String']['input']
  workerCount: Scalars['Int']['input']
}

export type MutationCreateGenerationTaskArgs = {
  description?: InputMaybe<Scalars['String']['input']>
  host: Scalars['String']['input']
  modelName: Scalars['String']['input']
  name: Scalars['String']['input']
  paramStr?: InputMaybe<Scalars['String']['input']>
  workerCount: Scalars['Int']['input']
}

export type MutationUpdateEvaluationTaskArgs = {
  id: Scalars['ID']['input']
}

export type Query = {
  __typename?: 'Query'
  currentUser: UserType
  ping: Scalars['String']['output']
}

export type UserType = {
  __typename?: 'UserType'
  activated: Scalars['Boolean']['output']
  email: Scalars['String']['output']
  evaluationTasks: Array<EvaluationTaskType>
  generationTasks: Array<GenerationTaskType>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  profileImage?: Maybe<Scalars['String']['output']>
  role: Scalars['Int']['output']
}

export type CreateGenerationTaskMutationVariables = Exact<{
  name: Scalars['String']['input']
  modelName: Scalars['String']['input']
  host: Scalars['String']['input']
  workerCount: Scalars['Int']['input']
  paramStr?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
}>

export type CreateGenerationTaskMutation = {
  __typename?: 'Mutation'
  createGenerationTask: { __typename?: 'GenerationTaskType'; id: string }
}

export type SigninMutationVariables = Exact<{ [key: string]: never }>

export type SigninMutation = {
  __typename?: 'Mutation'
  signin: { __typename?: 'UserType'; id: string; name: string; email: string }
}

export type UpdateEvaluationTaskMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UpdateEvaluationTaskMutation = {
  __typename?: 'Mutation'
  updateEvaluationTask: { __typename?: 'EvaluationTaskType'; id: string }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser: { __typename?: 'UserType'; email: string }
}

export type EvaluationTasksQueryVariables = Exact<{ [key: string]: never }>

export type EvaluationTasksQuery = {
  __typename?: 'Query'
  currentUser: {
    __typename?: 'UserType'
    evaluationTasks: Array<{
      __typename?: 'EvaluationTaskType'
      id: string
      name: string
      status: EvaluationTaskStatusType
      points: any
      createdAt: string
    }>
  }
}

export type GenerationTasksQueryVariables = Exact<{ [key: string]: never }>

export type GenerationTasksQuery = {
  __typename?: 'Query'
  currentUser: {
    __typename?: 'UserType'
    generationTasks: Array<{
      __typename?: 'GenerationTaskType'
      id: string
      name: string
      modelName: string
      description?: string | null
      status: GenerationTaskStatusType
      createdAt: string
    }>
  }
}

export type PingQueryVariables = Exact<{ [key: string]: never }>

export type PingQuery = { __typename?: 'Query'; ping: string }

export const CreateGenerationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateGenerationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'host' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'workerCount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'paramStr' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createGenerationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'modelName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'modelName' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'host' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'host' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'workerCount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'workerCount' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paramStr' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'paramStr' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateGenerationTaskMutation, CreateGenerationTaskMutationVariables>
export const SigninDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Signin' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>
export const UpdateEvaluationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateEvaluationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateEvaluationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateEvaluationTaskMutation, UpdateEvaluationTaskMutationVariables>
export const CurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CurrentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>
export const EvaluationTasksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EvaluationTasks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'evaluationTasks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EvaluationTasksQuery, EvaluationTasksQueryVariables>
export const GenerationTasksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GenerationTasks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'generationTasks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'modelName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GenerationTasksQuery, GenerationTasksQueryVariables>
export const PingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Ping' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'ping' } }]
      }
    }
  ]
} as unknown as DocumentNode<PingQuery, PingQueryVariables>
