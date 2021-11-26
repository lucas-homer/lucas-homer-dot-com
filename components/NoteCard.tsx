import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import styles from 'styles/NoteCard.module.css';

export default function NoteCard({ title, description, lastUpdated, slug }) {
  const { resolvedTheme } = useTheme();

  return (
    <Link href={`/notes/${slug}`}>
      <a className="border-2 border-grey-200 dark:border-gray-800 rounded p-4 w-full bg-white dark:bg-gray-900 hover:border-blue-600 dark:hover:border-blue-600 transition">
        <h4
          className={`tracking-widest uppercase text-sm inline pb-2 ${
            resolvedTheme === 'dark' ? styles.darkDate : styles.date
          }`}
        >
          {format(parseISO(lastUpdated), 'MMMM dd, yyyy')}
        </h4>
        <h3 className="text-3xl font-semibold text-left mt-4 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 prose prose-lg text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </a>
    </Link>
  );
}
