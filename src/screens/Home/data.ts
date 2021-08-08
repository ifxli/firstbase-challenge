import gql from 'graphql-tag'

export default gql`
  query {
    people {
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