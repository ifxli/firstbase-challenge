import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import getPeople from './data'
import { Person } from '../../common/types'

interface People {
  people: Person[]
}

function Home() {
  const { loading, data } = useQuery<People>(
    getPeople,
    { fetchPolicy: 'network-only' }
  );

  return (
    <div>
      <h3>People</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data && data.people.map((person, index) => (
              <tr key={index}>
                <td><img src={person.picture.thumbnail} alt="thumbnail" /></td>
                <td>{`${person.name.first} ${person.name.last}`}</td>
                <td>{person.email}</td>
                <td>
                  <Link to={`/detail?id=${person.id}`}>Edit</Link>
                  <Link style={{marginLeft: 5}} to={`/view?id=${person.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
