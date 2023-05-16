import { ChangeEvent, useContext } from "react";
import { UsersContext } from "../context/AppContext";

function SearchUsers() {
    const context = useContext(UsersContext)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase();
        const searchItems = context?.userData.filter(user => user.name.toLowerCase().includes(text))
        if (searchItems) {
            context?.setSearch(searchItems)
        }
    }
    const TotalUsers=context?.userData?.length

    return (
        <div className="search">
            <div>
                <input className="input is-primary" type="text" placeholder="Search" onChange={handleChange} />
             </div>
            <div className="m-2 tot-users">
                <h3> # {TotalUsers} Users</h3>
            </div>
        </div>

    )
}

export default SearchUsers