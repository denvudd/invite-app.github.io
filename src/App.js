import { useState, useEffect } from 'react';
import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSeatchValue] = useState('');

  const onChangeSearchValue = (e) => {
    setSeatchValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  };

  const onClickBack = () => {
    setSuccess(false);
  };

  const onSubmit = () => {
    setSuccess(true);
  };

  useEffect(() => {
    fetch('https://reqres.in/api/users')
          .then(res => res.json())
          .then(json => {
            return setUsers(json.data);
          })
          .catch(err => {
            console.warn(err);
          })
          .finally(() => setLoading(false))
  }, [])

  return (
    <div className="App">
      {
        success ? 
        <Success onClickBack={onClickBack}
                 count={invites.length}/> :
        <Users  searchValue={searchValue} 
                items={users} 
                isLoading={isLoading}
                onChangeSearchValue={onChangeSearchValue}
                invites={invites}
                onClickInvite={onClickInvite}
                onSubmit={onSubmit}/>
      }
      
      {/* <Success /> */}
    </div>
  );
}

export default App;
