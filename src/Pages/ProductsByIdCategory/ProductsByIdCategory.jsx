import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/Card/ProductCard";
export default function ProductsByIdCategory() {
    const [products, setProducts] = useState(null)
    const { id } = useParams()
    async function getProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
                method: "GET"
            }
            const { data } = await axios.request(options)
            setProducts(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    return <>
        {
            products ? products.length > 0 ? <div className="grid grid-cols-12 gap-4">
                {products.map((product) => (
                    <ProductCard productDetails={product} key={product._id} />
                ))}
            </div> : <section className="rounded-md bg-slate-200 p-5 space-y-3 flex flex-col items-center justify-center mt-8">
                <header>
                    <h2 className="font-semibold text-lg text-center">Oops! his category currently has no products.</h2>
                    <h3 className="font-semibold text-sm text-center">Try another category, otherwise press the button to go back</h3>
                </header>
                <Link className="btn-success block w-fit font-semibold" to={"/Categories"}>Back to Categories</Link>
            </section> : <Loading />
        }
    </>
}