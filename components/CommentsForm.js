import { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'


const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false)
    const [localStorage, setLocalStorage] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const commentEl = useRef()
    const nameEl = useRef()
    const emailEl = useRef()
    const storeDataEl = useRef()

    useEffect(() => {
        nameEl.current?.value = window.localStorage.getItem('name')
        emailEl.current?.value = window.localStorage.getItem('email') 
    }, [])


    const handleCommentSubmit = () => {
        setError(false);

        const { value: comment } = commentEl.current
        const { value: name } = nameEl.current
        const { value: email } = emailEl.current
        const { checked: storeData } = storeDataEl.current

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = { name, email, comment, slug };
        
        
        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        }

        submitComment(commentObj)
            .then((res) => {
                setShowSuccessMessage(true);

                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000)
            })
    }

    return (
        <div className="bg-white rounded-3xl shadow-md p-8 pb-12 mb-8">
            <h3 className="text-xl font-semibold">Leave a reply</h3>
            <p className="text-gray-400 text-xs mt-2 border-b pb-4 mb-8">Your email address will not be published</p>

            <div className="grid grid-cols-1 gap-4 my-2">
                <textarea
                    placeholder="Comment"
                    name="comment"
                    ref={commentEl} className="p-4 outline-none w-full rounded-xl focus:ring-gray-200 text-gray-700 border border-blue-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
           
                <input placeholder="Name"
                    type="text"
                    ref={nameEl}
                    name="name"
                    className="p-4 outline-none w-full rounded-xl focus:ring-gray-200 text-gray-700 border border-blue-500"
                />

                <input
                    placeholder="Email"
                    type="email"
                    ref={emailEl}
                    name="email"
                    className="p-4 outline-none w-full rounded-xl focus:ring-gray-200 text-gray-700 border border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 my-2">
                <div className="flex items-center">
                    <input
                        ref={storeDataEl}
                        type="checkbox"
                        id="storeData"
                        name="storeData"
                    />
                    <label
                        htmlFor="storeData"
                        className="ml-2 text-sm text-gray-500  cursor-pointer"
                    >
                        Save my name &amp; email in this browser for the next time I comment.
                    </label>
                </div>
            </div>

            {
                error && <p className="text-xs text-red-500">All fields are required</p>
            }

            <div className="mt-8">
                <button
                    className="transition duration-500 ease-in-out bg-blue-500 text-xs lg:text-sm text-white px-5 py-3 rounded-full hover:bg-blue-600 hover:shadow-md hover:-translate-y-1 flex items-center"
                    type="button"
                    onClick={handleCommentSubmit}
                >
                    Post Comment&nbsp;&nbsp;
                    <span className="material-icons text-md">send</span>
                </button>
                {
                    showSuccessMessage && <span className="text-sm float-right font-semibold mt-3 text-green-500">Comment Submitted For Review</span>
                }
            </div>

            
        </div>
    )
}

export default CommentsForm
