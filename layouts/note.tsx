import Container from 'components/Container';

export default function NoteLayout({ children, frontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} - Code Note`}
      description="A collection of code frontMatters, interesting resources on a topic, and other odds and ends."
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 px-8 sm:px-0 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-extrabold font-serif text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {frontMatter.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {frontMatter.description}
            </p>
          </div>
        </div>
        <div className="prose prose-lg dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
