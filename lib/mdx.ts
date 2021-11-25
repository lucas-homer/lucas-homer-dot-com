import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';

import { Frontmatter } from 'lib/types';

export async function getFiles(type) {
  return readdirSync(join(process.cwd(), 'data', type));
}

export async function getFileBySlug(type, slug?) {
  const source = slug
    ? readFileSync(join(process.cwd(), 'data', type, `${slug}.mdx`), 'utf8')
    : readFileSync(join(process.cwd(), 'data', `${type}.mdx`), 'utf8');

  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ]
      ] as any;
      return options;
    }
  });

  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter
    } as Frontmatter
  };
}

export async function getAllFilesFrontMatter(type: 'blog' | 'notes') {
  const files = readdirSync(join(process.cwd(), 'data', type));

  return files.reduce((allPosts, postSlug) => {
    const source = readFileSync(
      join(process.cwd(), 'data', type, postSlug),
      'utf8'
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', '')
      },
      ...allPosts
    ];
  }, []);
}

function buildTopicsObject(
  frontMatterData: Array<Frontmatter>
): Record<string, number> | {} {
  /**
   * loop over list of frontmatter objects, and loop over each object's topics list,
   * and if the topic already exists in the master list, add 1 to the count,
   * and if not, create new topic in master list with count = 1
   */
  return frontMatterData.reduce((masterTopicsObj, contentItem) => {
    const hasTopics = contentItem?.topics?.length;
    if (!hasTopics) {
      return masterTopicsObj;
    }

    contentItem.topics.forEach((topic) => {
      if (masterTopicsObj[topic]) {
        masterTopicsObj = {
          ...masterTopicsObj,
          [topic]: masterTopicsObj[topic] + 1
        };
        return;
      }

      masterTopicsObj = {
        ...masterTopicsObj,
        [topic]: 1
      };
    });

    return masterTopicsObj;
  }, {});
}

export async function getTopics() {
  const notes = await getAllFilesFrontMatter('notes');
  const posts = await getAllFilesFrontMatter('blog');

  const aggregatedTopics = buildTopicsObject([...notes, ...posts]);

  return Object.entries(aggregatedTopics);
}
