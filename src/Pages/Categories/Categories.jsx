import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {

    async function getCategories() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/categories`,
            method: "GET"
        }
        return await axios.request(options)
    }
    let { data, isLoading } = useQuery({
        queryKey: ["Categories"],
        queryFn: getCategories,
        refetchOnMount: false,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
        refetchInterval: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        maxPages: 2,
    })
    return <>
        <Helmet>
            <title>
                Categories
            </title>
        </Helmet>
        <section>
            <h2 className="text-3xl text-Success text-center font-medium mb-7">All Categories</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-5">
                {isLoading ? <div className="col-span-12"><Loading /></div> : data.data.data.map((category) => <div key={category._id}
                    className="col-span-3 w-[85%] hover:-translate-y-3 mx-auto md:mx-0 md:w-full shadow-lg main-shadow transition-[box-shadow,transform] duration-300 h-80 overflow-hidden border border-1 rounded-md border-solid border-[b1b1b1]">
                    <div className="h-[88%]">
                        <img className="w-full aspect-square object-cover h-full" src={category.image} alt={category.name} />
                    </div>
                    <div className="h-[12%] flex items-center justify-center">
                        <h3 className="text-Success text-lg font-semibold">{category.name}</h3>
                    </div>
                </div>)}
            </div>
        </section>
    </>
}