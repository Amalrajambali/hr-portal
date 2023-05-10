import React from 'react'
import Navbar from '../components/Navbar'
import UsersList from '../components/UsersList'
import SearchUsers from "../components/SearchUsers"


function Homepage() {
    return (
        <div>
            <SearchUsers/>
            <UsersList/>
        </div>
    )
}

export default Homepage