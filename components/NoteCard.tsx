import Link from "next/link";
import { Note } from ".contentlayer/types";

export default function NoteCard({
  title,
  description,
  slug
}: Pick<Note, "title" | "description" | "slug">) {
  return (
    <Link href={`/notes/${slug}`}>
      <a className="border border-grey-200 dark:border-gray-800 rounded p-4 w-full bg-white dark:bg-gray-900">
        <h3 className="text-lg font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 text-gray-700 dark:text-gray-400">{description}</p>
      </a>
    </Link>
  );
}
