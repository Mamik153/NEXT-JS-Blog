import moment from "moment"
import Link from 'next/link'
import Image from 'next/image'

const PostCard = ({ post }) => {

    //console.log(post);

    return (
        <div className="bg-white shadow-md rounded-3xl p-0 lg:pb-8 mb-8">
            <div className="relative overflow-hidden lg:p-5">
                <img className="w-full object-contain rounded-t-3xl lg:rounded-3xl" src={post.featuredImage.url}  alt="..." />
            </div>
            
            <div className="p-5 lg:p-10 lg:py-5">
                <div className="flex flex-wrap items-center my-5">
                    {
                        post.categories.map((category, i) => (
                            
                            <span  className="px-5 py-2 rounded-full bg-green-500 text-white text-xs mr-2">
                                {category.name}
                            </span>
                        
                            
                        ))
                    }
                </div>

                <h1 className="transition duration-300 mb-8 cursor-pointer hover:text-blue-900 text-xl md:text-2xl font-semibold">
                    <Link href={`/post/${post.slug}`}>
                        { post.title }
                    </Link>
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 line-clamp-3">
                { post.excerpt }
                </p>

                <div className="flex text-center items-center mb-8 w-full mt-8">
                    <div className="flex items-center justify-center lg:mb-0 lg:w-auto">
                        <Image src={post.author.photo.url} alt={post.author.name} width={30} height={30} className="rounded-full" />
                        
                    </div>
                    <div className="ml-3">
                        <p className="inline text-gray-600 text-sm">{post.author.name}</p>
                        <p className="text-gray-400 text-xs flex items-center"><span className="material-icons text-md">calendar_today</span> &nbsp;{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                    </div>
                </div>
            <Link href={`/post/${post.slug}`}>
                <span className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-xs lg:text-sm text-white px-10 py-3 mt-10 rounded-3xl shadow-md justify-center mx-auto flex w-max items-center text-center cursor-pointer hover:-translate-y-1">
                    Continue reading <span className="material-icons ml-3">trending_flat</span>
                </span>
            </Link>
            
            </div>
            
        </div>
    )
}

export default PostCard
