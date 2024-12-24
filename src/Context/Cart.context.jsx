import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
export const CartContext = createContext(null)
export default function CartProvider({ children }) {
    const { token } = useContext(UserContext)
    const [cartInfo, setCartInfo] = useState(null)
    async function addProductToCart({ productId }) {
        let toastId;
        try {
            toastId = toast.loading("Adding product...")
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }
            const { data } = await axios.request(options)
            console.log(data)
            if (data.status === "success") {
                toast.success("The product has been added to the cart",{duration: 700})
                getUserCart()
            }
        } catch (error) {
            
        } finally {
            toast.dismiss(toastId)
        }
    }
    async function getUserCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                },
            }
            const { data } = await axios.request(options)
            setCartInfo(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    async function removeProductCart({ productId }) {
        let toastId;
        try {
            toastId = toast.loading("Removing your item...")
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token
                },

            }
            const { data } = await axios.request(options)
            if (data.status === "success") {
                setCartInfo(data)
                toast.success("Your product has been deleted" ,{duration: 1000 })
            }
            console.log(data)
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    async function clearUserCart() {
        let toastId;
        try {
            toastId = toast.loading("Removing your cart...")
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token
                }
            }
            const { data } = await axios.request(options)
            if (data.message === "success") {
                toast.success("Cart has been cleared")
                setCartInfo({ numOfCartItems: 0 })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    async function updateCountProduct({ productId, count }) {
        let toastId;
        try {
            toastId = toast.loading("Waiting...")
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"PUT",
                headers:{
                    token
                },
                data:{
                    count
                }
            }
            const {data} = await axios.request(options)
            if(data.status === "success"){
                setCartInfo(data)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            toast.dismiss(toastId)
        }
    }
    return <CartContext.Provider value={{ addProductToCart, getUserCart, cartInfo, clearUserCart, removeProductCart,updateCountProduct }}>
        {children}
    </CartContext.Provider>
}