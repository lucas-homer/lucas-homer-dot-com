import { GetStaticPropsContext } from 'next';

import Container from 'components/Container';
import { getContentByTopic, getTopics } from 'lib/mdx';
import { convertSlugToName, convertToSlug } from 'lib/utils';

export default function Topic({ topicName, contentWithTopic, topicsData }) {
  return (
    <Container
      title={`Topic - ${topicName}`}
      description={`Notes and Blog posts relevant to: ${topicName}`}
      topicsData={topicsData}
    >
      <div>topic page TK</div>
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
