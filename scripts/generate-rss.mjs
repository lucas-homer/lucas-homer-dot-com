import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import RSS from 'rss';
import matter from 'gray-matter';

async function generate() {
  const feed = new RSS({
    title: 'Lucas Homer',
    site_url: 'https://lucashomer.com',
    feed_url: 'https://lucashomer/feed.xml'
  });

  const blogPosts = readdirSync(join(process.cwd(), 'data', 'blog'));
  blogPosts.map((name) => {
    const slug = name.replace('.mdx', '');
    const content = readFileSync(join(process.cwd(), 'data', 'blog', name));
    const { data } = matter(content);

    feed.item({
      title: data.title,
      url: `https://lucashomer.com/blog/${slug}`,
      date: data.publishedAt,
      description: data.summary
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
