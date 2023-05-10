import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className='nav-style'>
            <div>
                <nav>
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item" style={{ fontSize: "18px", padding: "20px" }}>
                            <img className='logo-style' src="https://seeklogo.com/images/B/bulma-logo-45B5145BF4-seeklogo.com.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                            <h1><b>Hr Portal</b></h1>
                        </Link>
                    </div>
                </nav>
            </div>
            <div>
                <div className="navbar-menustyle">
                    <Link to="/adduser">
                        <button className="button is-primary">Add User</button>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default Navbar