import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import styles from 'styles/NoteCard.module.css';

export default function NoteCard({ title, description, lastUpdated, slug }) {
  const { resolvedTheme } = useTheme();

  return (
    <Link href={`/notes/${slug}`}>
      <a className="w-full bg-gray-100 dark:bg-gray-800 pt-4 border-t-4 border-gray-800 dark:border-gray-100 hover:border-blue-600 hover:dark:border-blue-600">
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
        <p className="mt-1 font-serif text-lg text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </a>
    </Link>
  );
}
