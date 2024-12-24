import { useContext } from "react"
import { CartContext } from "../../Context/Cart.context"

export default function CartItem({ productInfo }) {
    const { count, price, product } = productInfo
    const { title, imageCover, category, id } = product
    const { removeProductCart ,updateCountProduct} = useContext(CartContext)
    return <>
        <section className="flex gap-1">
            <div className="grow grid grid-cols-12 bg-gray-200 p-5 items-center rounded-md">
                <figure className="col-span-2 flex items-center justify-center overflow-hidden ">
                    <img className="w-24 h-24 rounded-full object-cover border-4 over border-white" src={imageCover} alt="" />
                </figure>
                <header className="grid grid-cols-12 col-span-7 items-center">
                    <h3 className="col-span-9 text-left text-lg font-semibold text-slate-900">{title}</h3>
                    <h4 className="col-span-3 text-sm font-semibold text-slate-600">{category.name}</h4>
                </header>
                <div className="flex flex-col items-center justify-center col-span-1">
                    <div role="button" onClick={()=>{
                        updateCountProduct({productId:id,count:count+1})
                    }} className="cursor-pointer bg-gray-800 text-white w-6 h-6 flex items-center justify-center rounded-full">
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <p className="text-lg font-semibold font-mono">{count}</p>
                    <div className="flex flex-col">
                        <div role="button" onClick={()=>{
                            updateCountProduct({productId:id,count:count-1})
                        }} className="cursor-pointer bg-gray-800 text-white w-6 h-6 flex items-center justify-center rounded-full">
                            <i className="fa-solid fa-minus"></i>
                        </div>
                    </div>
                </div>
                <span className="col-span-2 mx-auto text-base font-semibold">{price * count} EGP</span>
            </div>
            <button type="button" onClick={() => {
                removeProductCart({productId:id})
            }} className="btn-success px-3 bg-gray-200 text-black hover:bg-gray-300"><i className="fa-solid fa-xmark"></i></button>
        </section>
    </>
}