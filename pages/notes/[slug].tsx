import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import components from 'components/MDXComponents';
import NoteLayout from 'layouts/note';
import { GetStaticPropsContext } from 'next';
import { getFileBySlug, getFiles } from 'lib/mdx';

export default function Note({ note }) {
  const Component = useMemo(() => getMDXComponent(note.code), [note.code]);

  return (
    <NoteLayout frontMatter={note.frontMatter}>
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

  return { props: { note } };
}
