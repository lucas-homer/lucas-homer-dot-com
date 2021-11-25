import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getFiles, getFileBySlug, getTopics } from 'lib/mdx';
import components from 'components/MDXComponents';
import BlogLayout from 'layouts/blog';

export default function Blog({ post, topicsData }) {
  const Component = useMemo(() => getMDXComponent(post.code), [post.code]);

  return (
    <BlogLayout frontMatter={post.frontMatter} topicsData={topicsData}>
      <Component components={components as any} />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('blog', params.slug);
  const topicsData = await getTopics();

  return { props: { post, topicsData } };
}
