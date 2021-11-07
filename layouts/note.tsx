import Container from "components/Container";
import type { PropsWithChildren } from "react";
import type { Note } from ".contentlayer/types";

export default function NoteLayout({
  children,
  note
}: PropsWithChildren<{ note: Note }>) {
  return (
    <Container
      title={`${note.title} - Code Note`}
      description="A collection of code notes, interesting resources on a topic, and other odds and ends."
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {note.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {note.description}
            </p>
          </div>
        </div>
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
