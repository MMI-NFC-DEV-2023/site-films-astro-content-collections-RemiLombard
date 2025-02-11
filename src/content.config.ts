import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

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

const films = defineCollection({
  loader: glob({ base: "src/data/films", pattern: "**/*.md" }),
  schema: z.object({
    titre: z.string(),
    dateSortie: z.date(),
    realisateur: reference("personnes").optional(),
    scenaristes: z.array(reference("personnes")).optional(),
    roles: z.array(
      z.object({ acteur: reference("personnes"), role: z.string() })
    ),
  }),
});

export const collections = { personnes, films };
