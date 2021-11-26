import { GetStaticPropsContext } from 'next';

import Container from 'components/Container';
import NoteCard from 'components/NoteCard';
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
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto pt-8 mb-16">
        <h3 className="mb-2 text-gray-900 text-xl dark:text-gray-100">TOPIC</h3>
        <h2 className="mb-4 text-gray-900 text-4xl dark:text-gray-100">{`${topicName} (${totalCount})`}</h2>
        {/* <p className="mb-4 text-gray-600 dark:text-gray-400">
          A collection of code notes, interesting resources on a topic, and
          other odds and ends.
        </p> */}
        <div className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2">
          {contentWithTopic.notes?.map((note) => (
            <NoteCard
              key={note.slug}
              title={note.title}
              slug={note.slug}
              description={note.description}
            />
          ))}
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
