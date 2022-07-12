import { Link } from "react-router-dom";

export default function Navbar() {


    return (<nav
        className="nav">
        <a href="/" className="stile-title">Romanov</a>
        <ul>
            <li>
                <Link to="/api/registration">Sing up</Link>
            </li>
            <li>
                <Link to="/api/login">Sing in</Link>
            </li>
            <li>
            <Link to="/api/users">Users</Link>
            </li>
        </ul>
    </nav>
    )
}