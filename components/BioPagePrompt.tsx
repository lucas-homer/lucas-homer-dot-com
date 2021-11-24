import React, { ReactElement } from 'react';
import Link from 'next/link';

export default function BioPagePrompt(): ReactElement {
  return (
    <div className="w-full max-w-2xl mx-auto px-8 sm:px-0">
      <div className="w-full p-10 bg-blue-600">
        <h2 className="text-3xl text-white">Get to know me</h2>
        <p className="text-gray-200 my-2.5 font-serif text-lg">
          Visit the bio page to get the spiel and get in touch.
        </p>
        <Link href="/about" passHref>
          <a className="tracking-widest font-sans text-white underline">BIO</a>
        </Link>
      </div>
    </div>
  );
}
