import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getPosts, getPostDetails } from '../../services'
import PostDetail from '../../components/PostDetail'
import Author from '../../components/Author'
import CommentsForm from '../../components/CommentsForm'
import Comments from '../../components/Comments'
import PostWidget from '../../components/PostWidget'
import Categories from '../../components/Categories'
import { useRouter } from 'next/router'


const PostDetails = () => {
    const router = useRouter()
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState({})
    const [loading, setLoading] = useState(true);

    const postSlug = router.asPath.split('/')[2];

    useEffect(async () => {
        const posts = await getPosts()
        let data
        if (postSlug !== '[slug]') {
            data = await getPostDetails(postSlug);
        }
        

        setPost(data);
        setLoading(false)
    }, [])
    
    return (
        
        <div className="container mx-auto lg:px-10 mb-8">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet"></link>
            </Head>
            {
                loading ? (
                    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-blue-400 h-12 w-12"></div>
                            <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-blue-400 rounded"></div>
                                <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12">
            
                            <div className="col-span-1 lg:col-span-6 lg:col-start-2">
                                <PostDetail post={post} />
                                <Author author={post.author} />
                                <Comments slug={post.slug} />
                                <CommentsForm slug={post.slug} />
                            </div>

                            <div className="col-span-1 lg:col-span-4">
                                <div className="relative lg:sticky top-24">
                                
                                    <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                                    <Categories />
                                    
                                </div>
                            </div>
                            
                        </div>
                )
            }
            
        </div>
            
    )
}

export default PostDetails


// export async function getStaticProps({ params }) {
//   const data = await getPostDetails(params.slug);

//   return {
//     props: { post: data }
//   }
// }

// export async function getStaticPaths() {
//     const posts = await getPosts()

//     return {
//         paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
//         fallback: false,
//     }
// }