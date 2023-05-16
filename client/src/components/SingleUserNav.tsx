import axios from "axios"
import { useEffect, useState } from "react";
  
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
  
  type idData = {
    id?: string
  }
  
  let initialState = {
    name: "",
    email: "",
    department: "",
    designation: "",
    gender: "",
    city: "",
    Title: "",
    phone: 0
  }
function SingleUserNav({ id }:idData) {

    const [currentUser, setCurrentUser] = useState<IUser>(initialState)
    const getSingleUser = async () => {
        try {
          let user: any = await axios.get(`http://localhost:8081/users/${id}`)
          setCurrentUser(user.data)
        }
        catch (e) {
          console.log(e)
        }
      }
      
      useEffect(()=>{
        getSingleUser();
      },[id])
      
    return (

        <div className="usernav">
           <h3 className="pl-1">#</h3>
            <img  src={currentUser?.imageUrl ? `https://2mxff3.sharepoint.com${currentUser.imageUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYqfZBDYOPW8hB6ZYxcx3UZ0mvR-mxH8MABg&usqp=CAU"}
                        alt="Avatar" className="img-fluid usernav-img " />
            <h3>{currentUser.name}</h3>

        </div>
    )
}

export default SingleUserNav