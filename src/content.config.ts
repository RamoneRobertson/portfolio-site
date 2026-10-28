import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    // Set to false to hide a project everywhere without deleting it.
    published: z.boolean().default(true),
    // "in-progress" adds an In progress label wherever the project appears.
    status: z.enum(["live", "in-progress"]).default("live"),
    domain: z.string(),
    tagline: z.string(),
    summary: z.string(),
    context: z.string(),
    stack: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    // Left-to-right architecture: each inner list is one column of boxes.
    // Write a box as "Name | detail", e.g. "Ledger API | Go".
    diagram: z.array(z.array(z.string())).default([]),
    // Demo media for the hero carousel and the top of the case study.
    // Put files in public/projects/ and write e.g. "/projects/payments-ledger.mp4".
    // A video plays muted on loop; the image is its poster frame, or is shown alone.
    // With neither, the slide shows a small architecture sketch instead.
    video: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional()
  })
});

export const collections = { projects };
