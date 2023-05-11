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
  gender:string,
  imageUrl?: string
}
interface ISearch {
  name: string,
  department: string,
  designation: string
  city: string,
  email: string,
  phone: number,
  gender:string,
  imageUrl?: string
}

interface MyContextType {
  userData: IUser[],
  setUserData: React.Dispatch<React.SetStateAction<IUser[]>>,
  search: ISearch[],
  setSearch: React.Dispatch<React.SetStateAction<ISearch[]>>,
  getAllUsers: Function,
  isLoading:boolean,
}




export const UsersContext = createContext<MyContextType | null>(null)

function AppContext({ children }: { children: ReactNode }) {

  const [userData, setUserData] = useState<IUser[]>([]);
  const [search, setSearch] = useState<ISearch[]>([]);
  const [isLoading,setIsLoading]=useState(false)

  const getAllUsers = async () => {
    setIsLoading(true)
    try{
      let allUser=await axios.get("http://localhost:8081/users")
      setUserData(allUser.data)
      setIsLoading(false)
    }
    catch(e)
    {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [userData])

  



  return <UsersContext.Provider value={{ userData, setUserData, search, setSearch, getAllUsers ,isLoading}}>
    {children}
  </UsersContext.Provider>
}

export default AppContext