import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { useTheme } from 'next-themes';

import styles from 'styles/BlogPostPreview.module.css';

export default function BlogPost({ title, summary, slug, publishedAt }) {
  const { resolvedTheme } = useTheme();

  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-full bg-gray-100 pt-4 border-t-4 border-gray-800 dark:border-gray-100 dark:bg-gray-800 hover:dark:border-blue-600 hover:border-blue-600">
        <h4
          className={`tracking-widest uppercase text-sm inline pb-2 ${
            resolvedTheme === 'dark' ? styles.darkDate : styles.date
          }`}
        >
          {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
        </h4>
        <h3 className="text-3xl font-semibold text-left mt-4 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 font-serif text-lg text-gray-500 dark:text-gray-300">
          {summary}
        </p>
      </a>
    </Link>
  );
}
