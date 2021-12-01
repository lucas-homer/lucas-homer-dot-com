// import Image from 'next/image';
import { getTopics } from 'lib/mdx';
import Link from 'next/link';
// import { ArrowRightIcon } from '@heroicons/react/solid';

import Container from '../components/Container';
// import styles from 'styles/Home.module.css';
// import BlogPostCard from '../components/BlogPost';
// import Subscribe from '../components/Subscribe';
/**
 *
 * TODO:
 * "Get to know me"
 * - add arrow icon (or content="->") and animate hover
 *
 *
 */

export default function Home({ topicsData }) {
  return (
    <Container topicsData={topicsData}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto mb-32 px-8 sm:px-0">
        <div>
          <div className="flex flex-col">
            {/* TODO -- animate a box outline with the below text inside */}
            {/* <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Lucas Homer
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              Application Development Supervisor at{' '}
              <span className="font-semibold">SelectQuote</span>
            </h2> */}
            <p className="text-gray-600 dark:text-gray-400 my-16 text-lg text-center">
              <strong>Hey, I’m Lucas.</strong> I like learning, building things
              with code, and writing, in no particular order. <br />
              <br />
              Mostly I write about about code, but sometimes it’s more than
              that.
            </p>
          </div>
        </div>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Featured Posts
        </h3>
        <div className="flex gap-6 flex-col md:flex-row">
          {/* <BlogPostCard
            title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
            slug="style-guides-component-libraries-design-systems"
            gradient="from-[#D8B4FE] to-[#818CF8]"
          />
          <BlogPostCard
            title="Past, Present, and Future of React State Management"
            slug="react-state-management"
            gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
          />
          <BlogPostCard
            title="Which Back End Should I Use As A Front-End Developer?"
            slug="backend"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          /> */}
        </div>
        <Link href="/blog">
          <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
            Read all posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
          </a>
        </Link>

        <span className="h-16" />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const topicsData = await getTopics();

  return { props: { topicsData } };
}
