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
    const content = readFileSync(join(process.cwd(), 'data', 'blog', name));
    const frontMatter = matter(content);

    feed.item({
      title: frontMatter.title,
      url: `https://lucashomer.com/blog/${frontMatter.slug}`,
      date: frontMatter.publishedAt,
      description: frontMatter.summary
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
