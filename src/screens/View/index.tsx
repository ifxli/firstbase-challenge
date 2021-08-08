import { useQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom'
import { getPerson } from './data'
import { Person } from '../../common/types'

interface PersonOutput {
  person: Person
}

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

function View() {  
  let query = useUrlQuery()
  const strUserId = query.get('id')
  const userId = strUserId ? parseInt(strUserId) : -1

  const { loading, data } = useQuery<PersonOutput>(
    getPerson,
    { fetchPolicy: 'network-only', variables: { id: userId } }
  );

  return (
    <div>
      <Link to="/">Go Back</Link>

      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <img src={data?.person.picture.large} alt="person" />
          <div>User: {`${data?.person.name.title} - ${data?.person.name.first} ${data?.person.name.last}`}</div>
          <div>Email: {data?.person.email}</div>
        </div>
      )}      
    </div>
  );
}

export default View;
