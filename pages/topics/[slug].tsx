import { GetStaticPropsContext } from 'next';

import Container from 'components/Container';
import NoteCard from 'components/NoteCard';
import BlogPost from 'components/BlogPostPreview';
import { getContentByTopic, getTopics } from 'lib/mdx';
import { convertSlugToName, convertToSlug } from 'lib/utils';

export default function Topic({ topicName, contentWithTopic, topicsData }) {
  const { notes, blog } = contentWithTopic;
  const totalCount = notes.length + blog.length || 0;

  return (
    <Container
      title={`Topic - ${topicName}`}
      description={`Notes and Blog posts relevant to: ${topicName}`}
      topicsData={topicsData}
    >
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto px-8 sm:px-0 mt-16 mb-32">
        <h3 className="mb-2 text-gray-900 text-xl dark:text-gray-100">TOPIC</h3>
        <h2 className="mb-8 text-gray-900 text-4xl dark:text-gray-100">
          {topicName}
        </h2>
        {/* <p className="mb-4 text-gray-600 dark:text-gray-400">
          A collection of code notes, interesting resources on a topic, and
          other odds and ends.
        </p> */}
        <>
          <h3 className="mb-1 text-gray-900 text-xl dark:text-gray-100">
            {`Blog posts (${contentWithTopic.blog?.length ?? 0})`}
          </h3>
          <div className="grid w-full grid-cols-1 gap-4 mb-16 mt-4 sm:grid-cols-2">
            {contentWithTopic.blog?.length ? (
              contentWithTopic.blog.map((post) => (
                <BlogPost
                  key={post.slug}
                  title={post.title}
                  slug={post.slug}
                  summary={post.summary}
                  publishedAt={post.publishedAt}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-300">
                No Blog posts associated with this topic
              </p>
            )}
          </div>
        </>

        <h3 className="mb-1 text-gray-900 text-xl dark:text-gray-100">{`Notes (${
          contentWithTopic.notes?.length ?? 0
        })`}</h3>
        <div className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2">
          {contentWithTopic.notes?.length ? (
            contentWithTopic.notes.map((note) => (
              <NoteCard
                key={note.slug}
                title={note.title}
                slug={note.slug}
                description={note.description}
                lastUpdated={note.lastUpdated}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No Notes associated with this topic
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const topicsData = await getTopics();

  return {
    paths: topicsData.map(([topic]) => ({
      params: { slug: convertToSlug(topic) }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const topicName = convertSlugToName(slug);
  const contentWithTopic = await getContentByTopic(topicName);
  const topicsData = await getTopics();

  return { props: { topicName, contentWithTopic, topicsData } };
}
