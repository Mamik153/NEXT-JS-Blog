import Head from 'next/head'

import { getPosts, getPostDetails } from '../../services'
import PostDetail from '../../components/PostDetail'
import Author from '../../components/Author'
import CommentsForm from '../../components/CommentsForm'
import Comments from '../../components/Comments'
import PostWidget from '../../components/PostWidget'
import Categories from '../../components/Categories'

const PostDetails = ({ post }) => {
    //console.log(post.author);
    return (
        <div className="container mx-auto lg:px-10 mb-8">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet"></link>
            </Head>
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
        </div>
    )
}

export default PostDetails


export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data }
  }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: false,
    }
}