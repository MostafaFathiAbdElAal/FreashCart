import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loading from "../../Components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { CartContext } from "../../Context/Cart.context";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../Components/Card/ProductCard";
import "Swiper/css"
import { Helmet } from "react-helmet";
export default function ProductDetails() {
    const { id } = useParams()
    const [productDetails, setProductDetails] = useState(null)
    const { addProductToCart } = useContext(CartContext)
    const [relatedProduct, setRelatedProduct] = useState(null)
    useEffect(() => {
        getProductDetails()
    }, [id])
    useEffect(() => {
        if (productDetails) getRelatedProduct();
    }, [productDetails])
    async function getProductDetails() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: "GET"
            }
            const { data } = await axios.request(options)
            setProductDetails(data.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    async function getRelatedProduct() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: "GET"
            }
            const { data } = await axios.request(options)
            setRelatedProduct(data.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    function dateFromAPI(DateFromAPI) {
        const dateString = DateFromAPI
        const date = new Date(dateString)
        const dateFull = date.getFullYear() + "/" + `${date.getMonth() + 1}` + "/" + date.getDate()
        const timeFull = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            milliseconds: date.getMilliseconds(),
            "Year/Month/Day": dateFull,
            "Hours:Minutes:Seconds": timeFull
        }
    }
    return <>
        <Helmet>
            <title>Product details</title>
        </Helmet>
        {
            productDetails ? <>
                <Helmet>
                    <title>{productDetails.title}</title>
                </Helmet>
                <div className="grid gap-5 grid-cols-3 sm:grid-cols-6 md:grid-cols-12 shadow-lg p-5 ">
                    <div className="col-span-5 imageSlider shadow-md ">
                        <ReactImageGallery showPlayButton={false} showNav={false} showFullscreenButton={false} items={productDetails.images.map((image) => {
                            return {
                                original: image,
                                thumbnail: image,

                            }
                        })} />
                    </div>
                    <div className="col-span-7 relative">
                        <h3 className="text-3xl text-black font-medium leading-7 mt-2">{productDetails.title}</h3>
                        <h2 className="text-Success font-semibold mx-1 mt-1">{productDetails.subcategory[0].name}</h2>
                        <div className="flex items-center gap-1 mt-2">
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            <span className="text-sm font-semibold text-[#656565] ">{productDetails.ratingsAverage}</span>
                            <span className="text-sm font-semibold text-[#656565]  ms-3">{productDetails.ratingsQuantity} Review</span>
                            <span className="text-sm font-semibold text-[#656565] ms-3">{productDetails.sold} Sold</span>
                            <pre className="text-sm font-extrabold text-[#656565] ms-3">Updated on {dateFromAPI(productDetails.updatedAt)["Year/Month/Day"]} {dateFromAPI(productDetails.updatedAt)["Hours:Minutes:Seconds"]}</pre>
                        </div>
                        <div className="mt-2 flex gap-2 items-center">
                            <span className={`text-xl text-black font-semibold  ${productDetails.priceAfterDiscount > 0 ? "PreDiscount text-opacity-50 pt-1" : null}`}>{productDetails.price} EGP </span>
                            {productDetails.priceAfterDiscount > 0 ? <span className="text-xl text-black font-semibold">
                                {productDetails.priceAfterDiscount} EGP
                            </span> : null}
                        </div>
                        <div className="mt-4">
                            <span className="text-3xl text-black font-semibold ">Brand :<span className="font-bold text-lg ps-1 text-slate-600 ">{productDetails.brand.name}</span></span>
                        </div>

                        <div>
                            <img src={productDetails.brand.image} alt={productDetails.brand.name} className="w-full h-28 object-contain" />
                        </div>
                        <span className="text-3xl text-black font-semibold">Description</span>
                        <p className="text-slate-500 font-semibold text-base mt-1">{productDetails.description}</p>
                        <div className="absolute bottom-0  flex gap-3 w-full p-4 flex-col ">
                            <p className="text-black font-semibold text-lg self-end px-1">In stock : <span className="text-sm font-bold">{productDetails.quantity} Pcs</span></p>
                            {
                                productDetails.quantity === 0 ? <div className="w-full p-3 bg-red-400 text-lg text-center font-bold text-white rounded-md">
                                    Not available in stock</div> : <button onClick={() => {
                                        addProductToCart({ productId: productDetails._id })
                                    }} className="btn-success  uppercase py-2 grow border border-solid border-opacity-25 hover:bg-black text-white hover:text-white bg-black bg-opacity-85 transition-colors duration-500 font-bold">add to cart</button>
                            }
                        </div>
                    </div>
                </div>
                <section className="mt-10">
                    <h4 className="text-2xl font-semibold px-4 mb-3">Related products</h4>
                    {relatedProduct ? <Swiper slidesPerView={4} spaceBetween={"8px"} loop={true} autoplay={true}>
                        {relatedProduct.map((product) => {
                            return <SwiperSlide className="flex " key={product._id}>
                                <div className="p-2"><ProductCard productDetails={product} /></div>
                            </SwiperSlide>
                        })}
                    </Swiper> : null}
                </section>
            </> : <Loading />
        }
    </>
}