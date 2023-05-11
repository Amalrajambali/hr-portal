import { Link } from 'react-router-dom'
import { UsersContext } from '../context/AppContext'
import { useContext } from 'react'
import "../App.css"

function UsersList() {

  const context = useContext(UsersContext)


  let data: any = context?.search.length != 0 ? context?.search : context?.userData

  if(context?.isLoading){
    return <h1>Loading</h1>
  }

  return (

      <div className="container mt-5">
        <div className='grid'>
          
        {data?.map((user:any) => {
          return (
            <Link to={`/user/${user.Id}`}>
            <div className="card card-form mt-2 mb-4 p-0 cardContent"  >
              <div className="p-0">
                <img src={ user.imageUrl?`https://2mxff3.sharepoint.com${user.imageUrl}`:"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}  style={{ minWidth:"275px", height: "250px", width:"500px"}}/>
              </div>
              <div className="card card-form-2 mb-0  z-depth-0 grid" style={{paddingLeft:"5px",paddingRight:"5px"}}>
                <div className="card-body mr-auto ml-auto ">
                  <ul>
                    <li className="list-group-item"><b>{user.name}</b></li>
                    <li className="list-group-item">{user.department}</li>
                    <li className="list-group-item">{user.phone}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>)
        })}
        </div>
      </div>

  )
}

export default UsersList