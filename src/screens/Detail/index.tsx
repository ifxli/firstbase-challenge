import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom'
import { getPerson, editPersonMutation } from './data'
import { Person, PersonInput } from '../../common/types'
import { FBInput } from '../../components'

interface PersonOutput {
  person: Person
}

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

function Detail() {  
  let query = useUrlQuery()
  const strUserId = query.get('id')
  const userId = strUserId ? parseInt(strUserId) : -1
  const [person, setPerson] = useState<PersonInput>()

  const { loading, data } = useQuery<PersonOutput>(
    getPerson,
    {
      fetchPolicy: 'network-only',
      variables: { id: userId },
      onCompleted: (data) => {
        let newPerson = {
          title: data.person.name.title,
          first: data.person.name.first,
          last: data.person.name.last,
          email: data.person.email
        }
        setPerson(newPerson)
      }
    }
  );

  const [editPerson, { loading: updatingPerson, error, data: newUser }] = useMutation<
    { editPerson: PersonInput },
    { id: number, payload: PersonInput}
  >(editPersonMutation, {
    variables: { id: userId, payload: person! }
  });
  
  const changeInput = (field: string) => (value: string) => {
    const updatePerson = person ? { ...person } : null;
    if (updatePerson === null) {
      return;
    }
    switch (field) {
      case 'title':
        updatePerson.title = value
        break
      case 'first':
        updatePerson.first = value
        break
      case 'last':
        updatePerson.last = value
        break
      case 'email':
        updatePerson.email = value
        break
      default: return;
    }
    setPerson(updatePerson)
  }

  return (
    <div>
      <Link to="/">Go Back</Link>

      {(loading || updatingPerson) ? (
        <p>Loading ...</p>
      ) : 
      data ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            editPerson({
              variables: {
                id: data ? data.person.id : -1,
                payload: person ? person: {}
              }
            })
          }}
        >
          <FBInput
            label="Title"
            value={data?.person.name.title}
            onChange={changeInput('title')}
          />
          <FBInput
            label="First Name"
            value={data?.person.name.first}
            onChange={changeInput('first')}
          />
          <FBInput
            label="Last Name"
            value={data?.person.name.last}
            onChange={changeInput('last')}
          />
          <FBInput
            label="Email"
            value={data?.person.email}
            onChange={changeInput('email')}
          />
          <button type="submit">Save</button>
        </form>
      ) : null}      
    </div>
  );
}

export default Detail;
