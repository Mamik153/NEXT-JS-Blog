import { useState, useEffect } from 'react'
import Head from "next/head";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";
import Categories from "../components/Categories";
import { getPosts } from "../services";
import FeaturedPosts from "../components/FeaturedPosts";


export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res));
  }, [])
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>WebNews</title>
        <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet"></link>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="col-span-1 lg:col-span-10 lg:col-start-2">
          <FeaturedPosts />
        </div>

        <div className="col-span-1 lg:col-span-6 lg:col-start-2">
          {
            posts.map((post, i) => (
              <PostCard post={post.node} key={post.title} />
            
            ))
          }
        </div>
       
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-24">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>

      
    </div>
  );
}

// export async function getStaticProps() {
//   const posts = (await getPosts()) || [];

//   return {
//     props: { posts }
//   }
// }