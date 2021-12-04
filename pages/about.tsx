import Link from 'next/link';
import type { InferGetStaticPropsType } from 'next';

import Container from 'components/Container';
import { getTopics } from 'lib/mdx';

export default function Notes({
  topicsData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container
      topicsData={topicsData}
      title="About"
      description="A little background on myself, Lucas Homer."
    >
      <div className="flex flex-col items-start justify-center gap-8 w-full max-w-2xl mx-auto px-8 sm:px-0 mt-16 mb-32">
        <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          About Me
        </h1>
        <p className="text-gray-600 dark:text-gray-300 prose prose-lg">
          Hey hey! I'm Lucas. I'm a developer, and you've made it all the way to
          my humble web home. Thanks for visiting. I hope you stay a while!
        </p>
        <p className="text-gray-600 dark:text-gray-300 prose prose-lg">
          At my job at SelectQuote, where we follow{' '}
          <a href="https://engineering.atspotify.com/2014/03/27/spotify-engineering-culture-part-1/">
            the Spotify model
          </a>
          , I started using our frontend chapter meetings (think "brown bag" or
          "knowledge transfer") as a vehicle to learn by teaching. It's been a
          boon for myself and others involved, but I want to do more, and{' '}
          <a href="https://www.swyx.io/learn-in-public/">learn in public</a>.
          How about the open web, then?
        </p>
        <p className="text-gray-600 dark:text-gray-300 prose prose-lg">
          Things here fall into two buckets —{' '}
          <Link href="/blog">
            <a>blogs</a>
          </Link>{' '}
          and{' '}
          <Link href="/notes">
            <a>notes</a>
          </Link>{' '}
          — the former being more fully formed thoughts, and the latter more
          loose references, or maybe a{' '}
          <a href="https://maggieappleton.com/garden-history">digital garden</a>
          , if you will? Perhaps more of a, erm, digital compost pile (dibs!).
          My hope is the notes pile up, break down (have I lost you yet?), and
          over time turn into more fully formed blog posts.
        </p>
        <p className="text-gray-600 dark:text-gray-300 prose prose-lg">
          Outside of extending tenuous metaphors, I love to spend time outdoors,
          hiking and trail running. I'm also an avid cook, and love exploring
          the embarrassment of riches that is California's food and wine scene.
          A native Midwesterner, I'm originally from Kansas City, and hold
          undergraduate and law degrees from the University of Kansas.
        </p>
        <p className="text-gray-600 dark:text-gray-300 prose prose-lg">
          After several years working in litigation, I switched gears to
          software, completing the{' '}
          <a href="https://launchcode.org">Launchcode</a> LC101 and
          Apprenticeship programs. Whether it's music, statutes, or code, it's
          all language and patterns to me. Among other reasons, I especially
          love software because I get that perfect mix of creativity and
          analysis.
        </p>
        <p className="text-gray-600 dark:text-gray-300 prose prose-lg">
          Want to chat? Don't be a stranger.{' '}
          <a href="https://twitter.com/lucas_c_homer">Tweet at me</a> or{' '}
          <a href="mailto:lucas.homer@hey.com">send me an email</a>. I'd love to
          hear from you.
        </p>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const topicsData = await getTopics();

  return { props: { topicsData } };
}
