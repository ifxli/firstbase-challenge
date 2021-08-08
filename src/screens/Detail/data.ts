import gql from 'graphql-tag'

export const getPerson = gql`
  query person($id: ID!){
    person(id: $id) {
      id
      name {
        title
        first
        last
      }
      email
      picture {
        large
        medium
        thumbnail
      }
    }
  }
`

export const editPersonMutation = gql`
  mutation editPerson($id: ID!, $payload: EditPerson) {
    editPerson(id: $id, payload: $payload) {
      id
      name {
        title
        first
        last
      }
      email
      picture {
        large
        medium
        thumbnail
      }
    }
  }
`