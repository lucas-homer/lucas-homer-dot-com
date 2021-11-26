import type { InferGetStaticPropsType } from 'next';

import Container from 'components/Container';
import NoteCard from 'components/NoteCard';
import { getAllFilesFrontMatter, getTopics } from 'lib/mdx';

export default function Notes({
  notes,
  topicsData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container
      topicsData={topicsData}
      title="Notes"
      description="A collection of code notes, interesting resources on a topic, and other odds and ends."
    >
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto px-8 sm:px-0 mt-16 mb-32">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Notes
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          A collection of code notes, interesting resources on a topic, and
          other odds and ends.
        </p>
        <div className="grid w-full grid-cols-1 gap-12 my-2 mt-4 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard
              key={note.slug}
              title={note.title}
              slug={note.slug}
              description={note.description}
              lastUpdated={note.lastUpdated}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const notes = await getAllFilesFrontMatter('notes');
  const topicsData = await getTopics();

  return { props: { notes, topicsData } };
}
