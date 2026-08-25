const totalLikes = (blogs) => {
  const reducer = (sum, current) => {
    return sum + current.likes
  }

  return blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (currentMostLikes, currentBlog) => {
    return currentMostLikes.likes >= currentBlog.likes
      ? currentMostLikes
      : currentBlog
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const authors = []
  blogs.forEach(blog => {
    let index = authors.findIndex(author => author.author === blog.author)
    if (-1 === index) {
      authors.push({
        author: blog.author,
        blogs: 1
      })
    } else {
      authors[index].blogs += 1
    }
  })
  
  const reducer = (mostIndex, curr, index) => {
    return authors[mostIndex].blogs >= curr.blogs
      ? mostIndex
      : index
  }
  
  return authors[authors.reduce(reducer, 0)]
}

const authorMostLIkes = (blogs) => {
  const authors = []
    blogs.forEach(blog => {
    let index = authors.findIndex(author => author.author === blog.author)
    if (-1 === index) {
      authors.push({
        author: blog.author,
        likes: blog.likes
      })
    } else {
      authors[index].likes += blog.likes
    }
  })

  const reducer = (mostIndex, curr, index) => {
    return authors[mostIndex].likes >= curr.likes
      ? mostIndex
      : index
  }

  return authors[authors.reduce(reducer, 0)]
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  authorMostLIkes,
}