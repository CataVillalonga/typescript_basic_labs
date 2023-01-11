import React, { useEffect, useState } from 'react'
import UserAddress from './Components/UserAddress/UserAddress'
import UserAge from './Components/UserAge/UserAge'
import UserName from './Components/UserName/UserName'
import UserNameChange from './Components/UserNameChange/UserNameChange'
import { UserData } from './types'

interface IUserNameChangeComponentProps {
  user : UserData,
  onNameChanged(e: React.ChangeEvent<HTMLInputElement>): void
}

function App() {
  const [user, setUser] = useState<UserData>({
    name: '',
    age: 0,
    address: '',
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const value = e.currentTarget.value

    setUser({ ...user, name: value })
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()

      const firstUser = data.results[0]

      setUser(prev => {
        return {
          ...prev,
          name: firstUser.name.first,
          age: firstUser.dob.age,
          address: firstUser.location.street.name,
        }
      })
    }

    getData()
  }, [])

  return (
    <main>
      <section>
        <h1>{user.name}</h1>
        <i>{user.age}</i>
        <i>{user.address}</i>
      </section>
      <section>
        <h1>Change the name of '{user.name}' here</h1>
        <input type="text" value={user.name} onChange={handleNameChange} />
     </section>
    </main>
  )
}

export default App
