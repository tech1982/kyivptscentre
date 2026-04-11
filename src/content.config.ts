import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections for bilingual (UK/EN) editing via Sveltia CMS.
 *
 * File naming convention: `slug.uk.md` / `slug.en.md`
 * CMS editors pick a language, edit the content, and publish.
 */

const siteSettings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
  schema: z.object({
    companyName: z.string(),
    tagline: z.string(),
    foundedYear: z.number(),
    phones: z.array(z.string()),
    email: z.string().email(),
    address: z.string(),
    workingHours: z.string(),
    social: z
      .object({
        facebook: z.string().url().optional(),
        linkedin: z.string().url().optional(),
      })
      .optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z
      .object({
        title: z.string(),
        subtitle: z.string(),
        badge: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
    sections: z
      .array(
        z.object({
          heading: z.string(),
          body: z.string(),
        })
      )
      .optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    features: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    location: z.string(),
    year: z.number().optional(),
    description: z.string(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  siteSettings,
  pages,
  products,
  services,
  projects,
  news,
};
