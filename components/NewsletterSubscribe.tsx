import * as React from 'react';
import { ArrowRightIcon } from '@heroicons/react/solid';

import LoadingSpinner from 'components/LoadingSpinner';
import { FormStatuses, FormState } from 'lib/types';

interface Props {}

export default function NewsletterSubscribe({}: Props): React.ReactElement {
  const [form, setForm] = React.useState<FormState>({
    status: FormStatuses.Initial
  });
  const inputEl = React.useRef(null);

  return (
    <div className="w-full max-w-2xl mx-auto px-8 sm:px-0 ">
      <div className="w-full p-10 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl text-black dark:text-gray-100">
          Keep in touch
        </h2>
        <p className="text-gray-500 dark:text-gray-200 my-2.5 font-serif text-lg">
          When I publish something new, be the first to know.
        </p>
        <form className="relative my-4" onSubmit={() => {}}>
          <input
            ref={inputEl}
            aria-label="Email for newsletter"
            placeholder="jsnow@thewall.gov"
            type="email"
            autoComplete="email"
            required
            className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            className=" absolute right-1 top-1 pl-2 pr-2 py-1 font-medium h-8 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded w-9"
            type="submit"
          >
            {form.status === FormStatuses.Loading ? (
              <LoadingSpinner />
            ) : (
              <ArrowRightIcon className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
