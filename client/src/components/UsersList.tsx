import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UsersContext } from '../context/AppContext'
import "../App.css"
import Loader from './loader/Loader'

function UsersList() {
  const context = useContext(UsersContext)

  let data: any = context?.search.length !== 0 ? context?.search : context?.userData

  //Loading Spinnner
  if (context?.isLoading) {
    return (<>
      <Loader />
    </>)
  }

  return (
    <div className="container mt-5">
      <div className='grid'>
        {data?.map((user: any) => {
          return (
            <Link to={`/user/${user.Id}`}>
              <div className="card card-form mt-2 mb-4 p-0 cardContent"  >
                <div className="p-0">
                  <img src={user.imageUrl ? `https://2mxff3.sharepoint.com${user.imageUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxCBqkRS9aoXRiY94dNvlNgbMT1rYTdb608A&usqp=CAU"} style={{ minWidth: "275px", height: "250px", width: "500px" }} alt='' />
                </div>
                <div className="card card-form-2 mb-0  z-depth-0 grid" style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <div className="card-body mr-auto ml-auto ">
                    <ul>
                      <li className="list-group-item"><b>{user.name}</b></li>
                      <li className="list-group-item">{user.department}</li>
                      <li className="list-group-item">{user.city}</li>
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