import { Frontmatter } from './types';

export function convertToSlug(name: string) {
  return name.toLowerCase().split(' ').join('-');
}

export function convertSlugToName(slug: string) {
  return slug.split('-').join(' ');
}

export function frontmatterHasTopic(frontmatterObj: Frontmatter, topicName) {
  return frontmatterObj.topics?.some(
    (topic) => topic.toLowerCase() === topicName
  );
}
