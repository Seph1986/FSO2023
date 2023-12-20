import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, handleLike, user, handleDelete }) => {
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          user={user}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default BlogList