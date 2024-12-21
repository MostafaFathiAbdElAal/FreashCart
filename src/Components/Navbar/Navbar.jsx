import { Link, NavLink } from "react-router-dom"
import logo from "../../assets/images/freshcart-logo.svg"
import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/User.context"
import { CartContext } from "../../Context/Cart.context"
export default function Navbar() {
    const { token, logout } = useContext(UserContext)
    const { cartInfo, getUserCart } = useContext(CartContext)
    useEffect(() => {
        if (token) getUserCart();
    }, [])
    return <>
        <nav className="bg-light-white py-4 fixed top-0 left-0 right-0 z-50">
            <div className="container flex items-center gap-6">
                <h1>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </h1>
                {token ? <ul className="flex flex-1 gap-6 items-center">
                    <li>
                        <NavLink className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/"}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Wishlist"}>
                            Wish list
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Products"}>
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Categories"}>
                            Categories
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Brands"}>
                            Brands
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/allorders"}>
                            Orders
                        </NavLink>
                    </li>
                    <li className="mx-auto text-lg relative">
                        <NavLink to={"/Cart"} className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black
                            ${isActive ? "text-black" : "text-[#575757]"}`
                        }}>
                                <div className="flex items-center justify-center bg-Success rounded-md absolute -top-5 -right-2 w-6 h-5">
                                    {cartInfo !== null ? <span className="text-white">{cartInfo.numOfCartItems}</span> : <i className="fa-solid fa-spinner fa-spin-pulse text-white"></i>}
                                </div>
                            <i className="fa-solid fa-cart-shopping text-3xl"></i>

                        </NavLink>
                    </li>
                </ul> : ""}
                <div className="ms-auto flex gap-6">
                    <ul className="flex gap-4">
                        {
                            token ? "" : <div className="flex gap-4">
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                                before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                                ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                                    }} to={"/auth/Login"}>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                                before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                                ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                                    }} to={"/auth/Signup"}>Sign up</NavLink>
                                </li>
                            </div>
                        }
                        {
                            token ? <li onClick={logout}>
                                <Link className="flex justify-center items-center gap-2 font-semibold group text-slate-700"><span className="group-hover:text-black transition-colors duration-300">Logout</span><i className="fa-solid fa-right-from-bracket text-2xl group-hover:text-black transition-colors duration-300"></i></Link>
                            </li> : ""
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>
}