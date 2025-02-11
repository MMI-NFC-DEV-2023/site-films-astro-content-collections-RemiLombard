import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const personnes = defineCollection({
  loader: glob({ base: "src/data/personnes", pattern: "**/*.md" }),
  schema: z.object({
    nom: z.string(),
    lieuNaissance: z.string(),
    dateNaissance: z.date(),
    dateDeces: z.date().optional(),
    nationalite: z.string(),
    profession: z
      .array(z.enum(["acteur", "réalisateur", "scénariste", "producteur"]))
      .optional(),
  }),
});

export const collections = { personnes };
