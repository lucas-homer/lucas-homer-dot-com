import React, { ReactElement } from 'react';

interface Props {}

export default function ExploreTopics({}: Props): ReactElement {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-8 sm:px-0">
      <h3 className="mt-24 mb-8 text-xl text-gray-100 dark:text-gray-800 tracking-widest">
        EXPLORE TOPICS
      </h3>
      <div>
        {[1, 2, 3].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}
