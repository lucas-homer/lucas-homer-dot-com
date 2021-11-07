import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import components from "components/MDXComponents";
import NoteLayout from "layouts/note";
import { allNotes } from ".contentlayer/data";
import type { Note } from ".contentlayer/types";
import { GetStaticPropsContext } from "next";

export default function NotePage(note: Note) {
  const Component = useMemo(
    () => getMDXComponent(note.body.code),
    [note.body.code]
  );

  return (
    <NoteLayout note={note}>
      <Component components={components as any} />
    </NoteLayout>
  );
}

export function getStaticPaths() {
  return {
    paths: allNotes.map(s => ({ params: { slug: s.slug } })),
    fallback: false
  };
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  const note = allNotes.find(note => note.slug === params?.slug);

  return { props: note };
}
