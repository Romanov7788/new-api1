import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./reducers/userReducer";

export default function Navbar() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (<nav
        className="nav">
        <a href="/" className="stile-title">Romanov</a>
        <ul>
            <li>
                {!isAuth && <Link to="/api/registration">Sing up</Link>}
            </li>
            <li>
                {!isAuth && <Link to="/api/login">Sing in</Link>}
            </li>
            <li>
                {isAuth && <div onClick={() => dispatch(logout())}>Sing out</div>}
            </li>
        </ul>
    </nav>
    )
}