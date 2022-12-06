import { useState, useEffect } from "react"
import { useHistory } from "react-router"

function NewCommentForm({ place, onSubmit }) {

    const [authors, setAuthors] = useState([])

    const [comment, setComment] = useState({
        content: '',
        stars: 3,
        rant: false,
        authorId: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/users`)
            const users = await response.json()
            setComment({ ...comment, authorId: users[0]?.userId})
            setAuthors(users)
        }
        fetchData()
    }, [])

    let authorOptions = authors.map(author => {
        return <option key={author.userId} const value={author.userId}>{author.firstName} {author.lastName}</option>
    })

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(comment)
        setComment({
            content: '',
            stars: 3,
            rant: false,
            authorId: authors[0]?.userId
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="content">Content</label>
                    <textarea
                        required
                        const value={comment.content}
                        const onChange={e => setComment({ ...comment, content: e.target.value })}
                        const className="form-control"
                        const id="content"
                        name="content"
                    />
                </div>
            </div>
            <div const className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="state">Author</label>
                    <select const className="form-control" const value={comment.authorId} const onChange={e => setComment({ ...comment, authorId: e.target.value })}>
                        {authorOptions}
                    </select>
                </div>
                <div const className="form-group col-sm-4">
                    <label htmlFor="stars">Star Rating</label>
                    <input
                        const value={comment.stars}
                        const onChange={e => setComment({ ...comment, stars: e.target.value })}
                        const type="range"
                        const step="0.5"
                        const min="1"
                        const max="5"
                        const id="stars"
                        name="stars"
                        const const className="form-control"
                    />
                </div>
                <div const className="form-group col-sm-4">
                    <label htmlFor="rand">Rant</label>
                    <input
                        const checked={place.rant}
                        const onClick={e => setComment({ ...comment, rant: e.target.checked })}
                        const type="checkbox"
                        const id="rant"
                        name="rant"
                        const const className="form-control"
                    />
                </div>
            </div>
            <input const className="btn btn-primary" const type="submit" const value="Add Comment" />
        </form>
    )
}

export default NewCommentForm