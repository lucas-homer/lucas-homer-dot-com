import Container from 'components/Container';

export default function NoteLayout({ children, topicsData, frontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} - Code Note`}
      description="A collection of code frontMatters, interesting resources on a topic, and other odds and ends."
      topicsData={topicsData}
      date={new Date(frontMatter.lastUpdated).toISOString()}
    >
      <article className="flex flex-col justify-center items-start w-full max-w-2xl mx-auto mb-16 px-8 sm:px-0 pt-12 py-24">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-extrabold font-serif text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {frontMatter.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {frontMatter.description}
            </p>
          </div>
        </div>
        <div className="prose prose-lg dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
