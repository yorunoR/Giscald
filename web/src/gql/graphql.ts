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
}

export type GenerationTaskType = {
  __typename?: 'GenerationTaskType'
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  modelName: Scalars['String']['output']
  name: Scalars['String']['output']
  status: StatusType
}

export type Mutation = {
  __typename?: 'Mutation'
  signin: UserType
}

export type Query = {
  __typename?: 'Query'
  currentUser: UserType
  ping: Scalars['String']['output']
}

export enum StatusType {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Started = 'Started'
}

export type UserType = {
  __typename?: 'UserType'
  activated: Scalars['Boolean']['output']
  email: Scalars['String']['output']
  generationTasks: Array<GenerationTaskType>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  profileImage?: Maybe<Scalars['String']['output']>
  role: Scalars['Int']['output']
}

export type SigninMutationVariables = Exact<{ [key: string]: never }>

export type SigninMutation = {
  __typename?: 'Mutation'
  signin: { __typename?: 'UserType'; id: string; name: string; email: string }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser: { __typename?: 'UserType'; email: string }
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
      status: StatusType
      createdAt: string
    }>
  }
}

export type PingQueryVariables = Exact<{ [key: string]: never }>

export type PingQuery = { __typename?: 'Query'; ping: string }

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
