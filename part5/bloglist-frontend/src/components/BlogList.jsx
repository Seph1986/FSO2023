import Blog from "./Blog"

const BlogList = ({blogs, handleLike, user, handleDelete}) => {
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

export default BlogList