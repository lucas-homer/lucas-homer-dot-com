import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { useTheme } from 'next-themes';

import styles from 'styles/FeaturedPost.module.css';

export default function FeaturedPost({ frontMatter }) {
  const { title, summary, slug, publishedAt, image, imageAlt, imageCredit } =
    frontMatter;
  const { resolvedTheme } = useTheme();

  return (
    <Link href={`/blog/${slug}`}>
      <a className={`w-full bg-gray-100 dark:bg-gray-800 ${styles.link}`}>
        <Image
          title={imageCredit}
          alt={imageAlt}
          src={image}
          layout="responsive"
          width={600}
          height={340}
          priority
        />
        <div className="border-t-4 border-gray-800 dark:border-gray-100 pt-4">
          <h4
            className={`tracking-widest uppercase text-sm inline pb-2 ${
              resolvedTheme === 'dark' ? styles.darkDate : styles.date
            }`}
          >
            {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
          </h4>
          <h3 className="text-5xl font-serif font-black my-5 text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="mt-1 font-sans text-xl leading-relaxed text-gray-500 dark:text-gray-300">
            {summary}
          </p>
        </div>
      </a>
    </Link>
  );
}
