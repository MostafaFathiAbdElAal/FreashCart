import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
    return <>
        <Navbar />
        <div className="container pb-[280px] pt-[96px] min-h-[60vh]">
        <Outlet />
        </div>
        <Footer />
    </>
}