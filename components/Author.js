import Image from 'next/image'

const Author = ({ author }) => {
 
    return (
        <div className="text-center my-20 p-12 relative rounded-3xl bg-blue-400 shadow-md">
            {/* <div className="absolute -top-14 left-0 right-0">
                 <Image
                src={author.photo.url}
                alt={author.name}
                height={100}
                width={100}
                className="rounded-full align-middle"
            />
            </div> */}
            <Image
                src={author.photo.url}
                alt={author.name}
                height={100}
                width={100}
                className="rounded-full align-middle shadow-lg"
            />
           
            <div>
                <h3 className="my-3 text-xl font-semibold">{author.name}</h3>
                <p className="text-white text-lg">
                    {author.bio}
                </p>
            </div>
            
      
        </div>
    )
}

export default Author
