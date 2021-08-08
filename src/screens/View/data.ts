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
  mutation editPerson($id: Int, $person: EditPerson) {
    editPerson(id: $id, person: $person) {
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