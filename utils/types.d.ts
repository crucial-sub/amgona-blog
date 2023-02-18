export interface PostDetailType {
  frontmatter: FrontmatterType
  slug?: string
  content: string
}

export interface PostListType {
  title: string
  posts: PostDetailType[]
}
