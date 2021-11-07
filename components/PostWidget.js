import { useState, useEffect } from "react"
import moment from "moment"
import Link from 'next/link'
import Image from 'next/image'

import { getRecentPosts, getSimilarPosts } from "../services"

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
       }
    }, [slug])

    //console.log(relatedPosts);

    return (
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8">
            <h3 className="text-md mb-8 font-semibold pb-4 border-b">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
            {
                relatedPosts?.map((post) => (
                    <div key={post.title} className="flex items-center w-full mb-5">
                        <div className="w-16 flex-none">
                            <Image src={post.featuredImage.url} alt="..." height={60} width={60} className="align-middle rounded-full object-cover" />
                        </div>
                        <div className="flex-grow ml-4">
                            <p className="text-gray-500 text-xs font-extralight flex items-center">
                                <span className="material-icons text-sm">calendar_today</span> &nbsp;
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <Link href={`/post/${post.slug}`}>
                                <span className="cursor-pointer hover:text-blue-600">{ post.title }</span>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostWidget
