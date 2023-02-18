export const sortByDate = (a: any, b: any) => {
  return (
    Number(new Date(b.frontmatter.date)) - Number(new Date(a.frontmatter.date))
  )
}
