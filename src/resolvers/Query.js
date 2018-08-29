const selectionSet = `{
  id
  url
  description
  createdAt
  postedBy {
    id
    name
    email
  }
}`

let feeds = (parent, args, context, info) => {
  return context.db.query.links({}, info)
}



module.exports = {
  feeds,
} 