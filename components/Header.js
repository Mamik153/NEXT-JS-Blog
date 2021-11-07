import { useContext, useState, useEffect  } from "react"
import Link from "next/link"
import { getCategories } from "../services"



const Header = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
            .then((result) => setCategories(result))
    }, [])
    return (
        <div className="mx-auto px-10 mb-8 bg-white shadow-md sticky top-0 z-10">
            <div className="w-full inline-block py-4">
                <div className="block md:float-left">
                    <Link href="/">
                        <span className="cursor-pointer font-semibold text-3xl text-black hover:text-blue-800 transition-all duration-300 ease-in-out" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                            WebNews9
                        </span>
                    </Link>
                </div>

                <div className="hidden md:float-right md:contents">
                    {
                        categories.map((category, i) => (
                            <Link key={i} href={`/category/${category.slug}`}>
                                <span className="mt-2 align-middle ml-4 font-semibold cursor-pointer text-gray-400 hover:text-blue-900 transition-all duration-500 ease-in-out md:float-right ">{ category.name }</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
