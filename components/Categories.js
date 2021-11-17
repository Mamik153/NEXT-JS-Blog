import { useState, useEffect } from "react"
import Link from 'next/link'
import { getCategories } from "../services"

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
            .then((result) => setCategories(result))
    }, [])

    //categories?.map(item => console.log(item))
    return (
        <div className="bg-white rounded-3xl shadow-md p-6 mb-10">
            <h3 className="text-md mb-4 font-semibold pb-4 border-b">Categories</h3>
            <div className="flex flex-wrap">
                {
                    categories?.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="px-5 py-2 rounded-full bg-green-400 hover:bg-green-500 transition duration-500 cursor-pointer text-white text-xs mr-2 mt-2">{ category.name }</span>
                        </Link>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Categories
