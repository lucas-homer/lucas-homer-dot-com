import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import components from 'components/MDXComponents';
import NoteLayout from 'layouts/note';
import { GetStaticPropsContext } from 'next';
import { getFileBySlug, getFiles, getTopics } from 'lib/mdx';

export default function Note({ note, topicsData }) {
  const Component = useMemo(() => getMDXComponent(note.code), [note.code]);

  return (
    <NoteLayout topicsData={topicsData} frontMatter={note.frontMatter}>
      <Component components={components as any} />
    </NoteLayout>
  );
}

export async function getStaticPaths() {
  const notes = await getFiles('notes');

  return {
    paths: notes.map((note) => ({
      params: { slug: note.replace(/\.mdx/, '') }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const note = await getFileBySlug('notes', params.slug);
  const topicsData = await getTopics();

  return { props: { note, topicsData } };
}
