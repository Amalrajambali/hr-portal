import {ChangeEvent, useState} from "react"


let initialState = {
    name: "",
    email: "",
    department: "",
    gender: "",
    city: "",
    Title: "",
    phone: 0
}


function AddUser() {

    const [form, setForm] = useState(initialState)

    const handleChange = (e: ChangeEvent<any>): void => {
        const { name: key, value } = e.target;
        setForm({ ...form, [key]: value, Title: "user" });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (form.name) {
            // const addedUser = await sp.web.lists.getByTitle("users").items.add(form)
            // // localStorage.setItem("users", JSON.stringify(context?.userData))

            // await sp.web.getFolderByServerRelativePath("usersLibrary").addSubFolderUsingPath(`${addedUser.data.Id}`)

            // context?.userData.push(form)
            // navigate(`/user/${addedUser.data.Id}`)
            console.log(form)

        }
    }

    return (
        <div className='adduser'>
            <form onSubmit={handleSubmit}>
            <h2 className="adduser-heading">User Registeration</h2>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input"  name="name" onChange={handleChange}/>
                </div>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Email input" name="email" onChange={handleChange}/>
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p className="help is-danger">This email is invalid</p>
            </div>


            <div className="field">
                <label className="label">Department</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Department" name="department"onChange={handleChange} />
                </div>
            </div>

            <input type="password" id="form3Example4cd" className="form-control" />
            <div className="field" style={{ display: "flex" ,justifyContent:"space-between"}}>
                <label className="label">District</label>
                <label className="label">Gender</label>
            </div>
            <div className="field" style={{ display: "flex" }}>
                <div className="control">
                    <div className="select">
                        <select onChange={handleChange} name="city">
                            <option >Select City</option>
                            <option value="Kozhikode">Kozhikode</option>
                            <option value="Malappuram">Malappuram</option>
                            <option value="Thrissur"> Thrissur</option>
                            <option value="Ernakulam">Ernakulam</option>
                            <option value="Kannur">Kannur</option>
                            <option value="Kollam">Kollam</option>
                            <option value="Trivandrum">Trivandrum</option>
                        </select>
                    </div>
                </div>
 
                <div className="control" style={{marginLeft: "31%"}}>
                    <label className="radio">
                        <input type="radio" name="gender" onChange={handleChange} value="Male" />
                        Male
                    </label>
                    <label className="radio">
                        <input type="radio" name="gender"onChange={handleChange} value="Female" />
                        Female
                    </label>
                </div>
            </div>



            <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                    <input className="input" type="number" placeholder="Phone Number" name="phone" onChange={handleChange}/>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" type="submit">Submit</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default AddUser