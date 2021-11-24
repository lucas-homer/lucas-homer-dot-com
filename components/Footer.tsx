import Link from 'next/link';
import * as React from 'react';

const footerTextClasses = `text-gray-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 transition`;

const ExternalLink = ({
  href,
  children
}: React.PropsWithChildren<{ href: string }>) => (
  <a
    className={footerTextClasses}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

// TODO -- handle form submissions
export default function Footer() {
  return (
    <footer className="flex flex-col justify-center bg-gray-900 dark:bg-gray-0 px-8 sm:px-0">
      <div className="flex items-center justify-between w-full relative max-w-2xl py-24 mx-auto">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className={footerTextClasses}>Home</a>
          </Link>
          <Link href="/about">
            <a className={footerTextClasses}>About</a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://twitter.com/lucas_c_homer">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://github.com/lucas-homer">
            GitHub
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/notes">
            <a className={footerTextClasses}>Notes</a>
          </Link>
          <Link href="/blog">
            <a className={footerTextClasses}>Blog</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
