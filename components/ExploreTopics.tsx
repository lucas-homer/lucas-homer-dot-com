import React, { ReactElement } from 'react';
import Link from 'next/link';

import { convertToSlug } from 'lib/utils';
import styles from 'styles/ExploreTopics.module.css';
interface Props {
  topicsData: Array<[string, number]>;
}

// TODO -- use `name` to link to /topics/[lowercase and hyphenated name]
export default function ExploreTopics({ topicsData }: Props): ReactElement {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-8 sm:px-0">
      <h3 className="mt-24 mb-8 text-xl text-gray-100 dark:text-gray-800 tracking-widest">
        EXPLORE TOPICS
      </h3>
      <ul className="flex flex-wrap w-full justify-center mb-24">
        {topicsData.map(([topic, count]) => (
          <li key={topic} className="m-4">
            <Link href={`/topics/${convertToSlug(topic)}`}>
              <a
                className={`border-solid border-2 border-gray-400 hover:cursor-pointer dark:border-gray-500 flex flex-nowrap items-center ${styles.topicListItem}`}
              >
                <span className="px-5 py-3 text-2xl text-gray-400 dark:text-gray-500">
                  {count}
                </span>
                <h1 className="px-5 py-3 text-2xl text-gray-100 dark:text-gray-900 border-solid border-l-2 border-gray-400 dark:border-gray-500">
                  {topic}
                </h1>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
