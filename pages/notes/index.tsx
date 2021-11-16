import Container from 'components/Container';
import NoteCard from 'components/NoteCard';
import { getAllFilesFrontMatter } from 'lib/mdx';
import { pick } from 'lib/utils';
import type { InferGetStaticPropsType } from 'next';

export default function Notes({
  notes
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container
      title="Notes"
      description="A collection of code notes, interesting resources on a topic, and other odds and ends."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto px-8 sm:px-0 mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Notes
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          A collection of code notes, interesting resources on a topic, and
          other odds and ends.
        </p>
        <div className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2">
          {notes.map((note) => (
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

export async function getStaticProps() {
  const notes = await getAllFilesFrontMatter('notes');

  return { props: { notes } };
}
