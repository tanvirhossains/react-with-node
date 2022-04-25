import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const user = { name, email }
    console.log(email, name)


    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers)
        console.log(data)

      }
      )

  }
  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder='name' />
        <input type="text" name="email" id="" placeholder='email' />
        <input type="submit" value="user" />
      </form>
      <h1>My Own data : {users.length} </h1>

      <ul>
        {
          users.map(user => <li key={user.id}>{user.name} email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
