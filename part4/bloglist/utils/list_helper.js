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

module.exports = {
  totalLikes,
  favoriteBlog,
}