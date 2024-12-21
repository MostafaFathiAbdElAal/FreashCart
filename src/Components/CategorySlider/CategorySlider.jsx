import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import "Swiper/css"
import { SwiperSlide,Swiper } from "swiper/react"
export default function CategorySlider() {
    const [Categories, setCategories] = useState(null)
    try {
        async function getCategories() {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/categories",
                method: "GET"
            }
            const { data } = await axios.request(options)
            setCategories(data.data)
        }
        useEffect(() => {
            getCategories()
        }, [])
    } catch (error) {
        toast.error(error.response.data.message)
    }

    return <>
        {Categories ? <section className="pb-8">
            <h2 className="font-semibold mb-2">Shop Popular Categories</h2>
            <Swiper loop={true} autoplay={true} slidesPerView={1} breakpoints={{
                400:{
                slidesPerView:2
                },
                500:{
                slidesPerView:3
                },
                600:{
                slidesPerView:4
                },
                700:{
                slidesPerView:5
                },
                800:{
                slidesPerView:6
                },
            }}>
                {Categories.map((category) => <SwiperSlide key={category._id}>
                    <Link to={`category/${category._id}`}>
                    <div >
                    <img src={category.image} className="w-full aspect-square object-contain" alt=""/>
                    </div>
                    </Link>

                    <h3 className="text-xs font-semibold  text-gray-800 text-center mt-2">{category.name}</h3>
                </SwiperSlide>)}
            </Swiper>
        </section> : null}
    </>
}