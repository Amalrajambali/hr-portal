import { ChangeEvent, useContext } from "react";
import { UsersContext } from "../context/AppContext";

function SearchUsers() {
    const context = useContext(UsersContext)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase();
        const searchItems = context?.userData.filter(user => user.name.toLowerCase().includes(text))
        if(searchItems){
        context?.setSearch(searchItems)
        }
        
    }
    return (
        <div className="search">
            <input className="input is-primary" type="text" placeholder="Search" onChange={handleChange}/>
        </div>

    )
}

export default SearchUsers