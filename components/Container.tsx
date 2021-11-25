import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import Footer from 'components/Footer';
import Header from './Header';
import BioPagePrompt from './BioPagePrompt';
import NewsletterSubscribe from './NewsletterSubscribe';
import ExploreTopics from './ExploreTopics';

type ContainerProps = Partial<{
  title: string;
  description: string;
  image: string;
  date: string;
  type: 'article' | 'note' | 'website';
}> & { topicsData: Array<[string, number]> };

export default function Container(props: PropsWithChildren<ContainerProps>) {
  const { children, topicsData, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Lucas Homer – Developer, tinkerer, creator.',
    description: `Learning, building, writing things down.`,
    image: 'https://leerob.io/static/images/banner.png', // TODO - REPLACE THIS!
    type: 'website',
    ...customMeta
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://lucashomer.com${router.asPath}`}
        />
        <link rel="canonical" href={`https://lucashomer.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Lucas Homer" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lucas_c_homer" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Header />
      <main
        id="skip"
        className="flex flex-col justify-center bg-gray-100 dark:bg-gray-800"
      >
        {/* TODO -- this should comprise: main content of the page + any of the following in this order -- the get-to-know-me box, the newsletter box, and the topics box */}
        {children}
      </main>
      <aside className="flex flex-col justify-center bg-gray-100 dark:bg-gray-800">
        <BioPagePrompt />
      </aside>
      <aside className="flex flex-col justify-center bg-gray-700 dark:bg-gray-200">
        <NewsletterSubscribe />
        <ExploreTopics topicsData={topicsData} />
      </aside>
      <Footer />
    </div>
  );
}
