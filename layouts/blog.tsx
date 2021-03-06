import { parseISO, format } from 'date-fns';
import Image from 'next/image';

import Container from 'components/Container';

const editUrl = (slug) =>
  `https://github.com/lucas-homer/lucas-homer-dot-com/edit/master/data/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://lucashomer.com/blog/${slug}`
  )}`;

export default function BlogLayout({ children, topicsData, frontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} – Lucas Homer`}
      description={frontMatter.summary}
      image={`https://lucashomer.com${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
      topicsData={topicsData}
    >
      <Image
        title={frontMatter.imageCredit}
        alt={`Hero image - ${frontMatter.imageAlt}`}
        height={600}
        width={1000}
        priority
        src={frontMatter.image}
      />
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-32 px-8 sm:px-0">
        <div className="w-full py-16 border-t-4 border-b-4 border-opacity-50 border-gray-600 dark:border-gray-300">
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center ">
            <div className="flex items-center">
              <p className="text-gray-700 dark:text-gray-300">
                {'Lucas Homer / '}
                {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
              </p>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
              {frontMatter.readingTime.text}
              {` • `}
            </p>
          </div>
          <h1 className="mb-4 mt-8 text-5xl font-serif font-black tracking-tight text-black md:text-5xl dark:text-white">
            {frontMatter.title}
          </h1>
          <p className="mt-1 font-sans text-xl leading-relaxed text-gray-500 dark:text-gray-300">
            {frontMatter.summary}
          </p>
        </div>
        <div className="w-full my-4 prose prose-lg dark:prose-dark max-w-none ">
          {children}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 flex flex-row w-full gap-4 justify-end">
          <a
            href={discussUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Discuss on Twitter'}
          </a>
          {` | `}
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
