import { useState, useEffect } from "react"
import moment from "moment"
import parse from 'html-react-parser'
import { getComments } from "../services"
import { comment } from "postcss"

const Comments = ({ slug }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(slug)
            .then((res) => setComments(res))
    }, [])

    return (
        <>
            {
                comments.length > 0 && (
                    <div className="bg-white shadow-md rounded-3xl p-8 pb-12 mb-8">
                        <h3 className="text-xl mb-8 font-semibold border-b pb-4">{ comments.length }&nbsp; Comments</h3>
                        {
                            comments.map((comment) => (
                                
                                <div key={ comment.createdAt } className="border-b border-gray-100 mb-4 pb-4">
                                    <p className="mb-4 flex items-center">
                                        {/* <span className="bg-gray-300 text-gray-50 px-3 py-1.5 rounded-full mr-2">{ comment.name.charAt(0).toUpperCase() }</span> */}
                                        <span>{ comment.name }</span>
                                        &nbsp;
                                        .
                                        &nbsp;
                                        <span className="text-sm text-gray-400">
                                            {
                                                moment(comment.createdAt).format('MMM DD, YYYY')
                                            }

                                            &nbsp;
                                            at
                                            &nbsp;
                                            {
                                                moment(comment.createdAt).format('LT')
                                            }
                                        </span>
                                        
                                    </p>
                                    <p className="whitespace-pre-line text-gray-600 w-full pl-2">
                                        { parse(comment.comment) }
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default Comments
