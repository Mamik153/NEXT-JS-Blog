import React from "react";
import moment from "moment"
import Image from 'next/image'

const PostDetail = ({ post }) => {

    const getContentFragment = (index, text, obj, type) => {
      let modifiedText = text;

      if (obj) {
        if (obj.bold) {
          modifiedText = (<b key={index}>{text}</b>);
        }

        if (obj.italic) {
          modifiedText = (<em key={index}>{text}</em>);
        }

        if (obj.underline) {
          modifiedText = (<u key={index}>{text}</u>);
        }
      }

      switch (type) {
        case 'heading-three':
          return <h3 key={index} className="text-2xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
        case 'paragraph':
          return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
        case 'heading-four':
          return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
        case 'image':
          return (
            <img
              key={index}
              alt={obj.title}
              height={obj.height}
              width={obj.width}
              src={obj.src}
            />
          );
        default:
          return modifiedText;
      }
    };


    return (
        <div className="bg-white shadow-mg rounded-3xl pb-12 mb-8">
            <div className="relative overflow-hidden mb-6">
                <img className="w-full object-contain rounded-t-3xl object-top" src={post.featuredImage.url}  alt="..." />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex text-center px-4 items-center mb-8 w-full mt-8">
                    <div className="flex items-center justify-center lg:mb-0 lg:w-auto">
                        <Image src={post.author.photo.url} alt={post.author.name} width={30} height={30} className="rounded-full" />
                        
                    </div>
                    <div className="ml-3">
                        <p className="inline text-gray-600 text-sm">{post.author.name}</p>
                        <p className="text-gray-400 text-xs flex items-center">
                            <span className="material-icons text-sm">calendar_today</span>
                            &nbsp;{moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="px-8">
                <h1 className="mb-20 pt-8 text-center text-2xl lg:text-4xl font-semibold">{post.title}</h1>

                {
                    post.content.raw.children.map((typeObj, i) => {
                        const children = typeObj.children.map((item, i) => getContentFragment(i, item.text, item))


                        return getContentFragment(i, children, typeObj, typeObj.type)
                    })
                }
            </div>
        </div>
    )
}

export default PostDetail
