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

interface ICity{
  _id:string,
  city:string
}

interface MyContextType {
  userData: IUser[],
  setUserData: React.Dispatch<React.SetStateAction<IUser[]>>,
  search: ISearch[],
  setSearch: React.Dispatch<React.SetStateAction<ISearch[]>>,
  getAllUsers: Function,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  cities:ICity[],
  }


export const UsersContext = createContext<MyContextType | null>(null)

function AppContext({ children }: { children: ReactNode }) {

  const [userData, setUserData] = useState<IUser[]>([]);
  const [search, setSearch] = useState<ISearch[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [cities,setCities]=useState<ICity[]>([])

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

  let Allcities
  const getCities = async () => {
    try {
      Allcities= await axios.get("http://localhost:8081/city")
      setCities(Allcities.data)
      console.log(Allcities.data)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllUsers()
    getCities()
  }, [allUser])

  return <UsersContext.Provider value={{ userData, setUserData, search, setSearch, getAllUsers, isLoading, setIsLoading,cities}}>
    {children}
  </UsersContext.Provider>
}

export default AppContext