import React from 'react'
import { Link } from 'react-router-dom'

function UsersList() {
  return (
    <div className="container ">
      <section className="mx-auto my-5 row" >
      <Link to={`/user/4`}>
        <div className="card card-form mt-2 mb-4 col-md-3 p-0 cardContent" style={{ maxWidth: "60%" }}>
          <div className="card-body rounded-top pink darken-4 p-0">
            <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
          </div>
          <div className="card card-form-2 mb-0 z-depth-0">
            <div className="card-body">
              <h1>hlo</h1>
              <h1>city</h1>
              <h1>namelo</h1>
            </div>
          </div>
        </div>

   </Link>
      </section>
    </div>
  )
}

export default UsersList