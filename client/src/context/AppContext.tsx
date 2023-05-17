import * as React from 'react'
import { useState, ReactNode, useEffect } from 'react'
import { createContext } from 'react'
import axios from 'axios';

interface IUser {
  Id?: number;
  name: string;
  department: string,
  designation: string
  city: string,
  email: string,
  phone: number,
  gender: string,
  imageUrl?: string
}

interface ISearch {
  name: string,
  department: string,
  designation: string
  city: string,
  email: string,
  phone: number,
  gender: string,
  imageUrl?: string
}

interface MyContextType {
  userData: IUser[],
  setUserData: React.Dispatch<React.SetStateAction<IUser[]>>,
  search: ISearch[],
  setSearch: React.Dispatch<React.SetStateAction<ISearch[]>>,
  getAllUsers: Function,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}


export const UsersContext = createContext<MyContextType | null>(null)

function AppContext({ children }: { children: ReactNode }) {

  const [userData, setUserData] = useState<IUser[]>([]);
  const [search, setSearch] = useState<ISearch[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  let allUser
  const getAllUsers = async () => {
    try {
      setIsLoading(true)
      allUser = await axios.get("http://localhost:8081/users")
      setIsLoading(false)
      setUserData(allUser.data)
    }
    catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [allUser])

  return <UsersContext.Provider value={{ userData, setUserData, search, setSearch, getAllUsers, isLoading, setIsLoading }}>
    {children}
  </UsersContext.Provider>
}

export default AppContext