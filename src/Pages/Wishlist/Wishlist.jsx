import { useContext, useEffect } from "react";
import { WishListContext } from "../../Context/WishList.context";
import Loading from "../../Components/Loading/Loading";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Wishlist() {
    const { addProductToCart } = useContext(CartContext)
    const { getWishlistUser, wishlistProducts, removeItemWishList, setWishlistProducts } = useContext(WishListContext)
    useEffect(() => {
        getWishlistUser()
    }, [])
    useEffect(() => {
        return function () {
            setWishlistProducts(null)
        }
    }, [])
    return <>
        <Helmet>
            <title>Wishlist</title>
        </Helmet>
        {wishlistProducts ? <section>
            <div className="bg-gray-100 py-5 px-5">
                <h2 className="text-2xl font-semibold mb-2">My Wish List</h2>
                <div className="items space-y-5">
                    {wishlistProducts.map((product) => <div key={product._id} className="relative grid grid-cols-12 border-b border-[#dee2e6] pb-2">
                        <div className="col-span-12 md:col-span-4">
                        <img className="h-52 w-full object-contain" src={product.imageCover} alt={product.title} />
                        </div>
                        <div className="col-span-12 md:col-span-8 px-5 font-semibold grid grid-cols-12 gap-2">
                            <div className="col-span-12 mt-4">
                                <h3 className="text-xl">{product.title}</h3>
                                <div className="space-x-1 flex gap-2 items-center">
                                    <span className={`${product.priceAfterDiscount > 0 ? "PreDiscount text-opacity-50 pt-1" : "text-Success"}`}>{product.price} EGP</span>
                                    {
                                        product.priceAfterDiscount > 0 ? <p><span className="text-Success">{product.priceAfterDiscount}</span> EGP</p> : null}
                                </div>
                                <button onClick={() => {
                                    removeItemWishList(product._id)

                                }} className="text-red-500 hover:text-red-700 transition-colors duration-300"><span><i className="fa-solid fa-trash"></i></span> Remove</button>
                                <button onClick={() => {
                                    addProductToCart({ productId: product._id })
                                }} className="ms-10 text-Success text-opacity-70 hover:text-opacity-100 transition-colors duration-300">Add to cart <i className="fa-solid fa-cart-plus text-lg"></i></button>
                            </div>


                        </div>
                    </div>)}
                </div>
            </div>
        </section> : wishlistProducts === 0 ? <div className="rounded-md bg-slate-200 p-5 space-y-3 flex flex-col items-center justify-center mt-8">
            <div>
                <h2 className="font-semibold text-lg text-center">Oops! your wishlist is empty.</h2>
                <h3 className="font-semibold text-sm text-center">Start shopping now by clicking the button below and find something you love!</h3>
            </div>
            <Link className="btn-success block w-fit font-semibold" to={"/"}>Back to Home</Link>
        </div> : <Loading />}
    </>
}