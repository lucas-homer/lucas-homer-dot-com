import { parseISO, format } from 'date-fns';

import Container from 'components/Container';

const editUrl = (slug) =>
  `https://github.com/lucas-homer/lucas-homer-dot-com/edit/master/data/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://lucashomer.com/blog/${slug}`
  )}`;

export default function BlogLayout({ children, frontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} – Lucas Homer`}
      description={frontMatter.summary}
      image={`https://lucashomer.com${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-extrabold font-serif tracking-tight text-black md:text-5xl dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {'Lucas Homer / '}
              {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {frontMatter.readingTime.text}
            {` • `}
          </p>
        </div>
        <div className="w-full mt-4 prose prose-lg dark:prose-dark max-w-none">
          {children}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <a
            href={discussUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Discuss on Twitter'}
          </a>
          {` • `}
          <a
            href={editUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Edit on GitHub'}
          </a>
        </div>
      </article>
    </Container>
  );
}
