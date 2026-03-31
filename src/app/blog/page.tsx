import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, blog, person, newsletter } from "@/resources";
import { getPosts } from "@/app/utils/utils";
import { BlogContent } from "@/components/blog/BlogContent";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  const allPosts = getPosts(["src", "app", "blog", "posts"]);

  const sortedPosts = allPosts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  return (
    <Column maxWidth="s">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BlogContent posts={sortedPosts} title={blog.title} />
    </Column>
  );
}
