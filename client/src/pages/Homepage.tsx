import React from 'react'
import Navbar from '../components/Navbar'
import SearchUsers from "../components/SearchUsers"
import UsersList from '../components/UsersList'


function Homepage() {
    return (
        <div>
            <SearchUsers/>
            <UsersList/>
        </div>
    )
}

export default Homepage