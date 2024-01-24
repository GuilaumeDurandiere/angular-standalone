import { z } from 'zod';

const workflowItemResponseSchema = z.object({
  id: z.number().optional(),
  libelle: z.string().optional()
})

const refOfferTypeSchema = z.object({
  id: z.number(),
  code: z.string(),
  libelle: z.string()
})

export const subthemeSchema = z.object({
  accessibleATous: z.boolean(),
  accessible: z.boolean().optional(),
  couleur: z.string(),
  description: z.string().optional(),
  icone: z.string(),
  id: z.number(),
  libelle: z.string(),
  lienExterne: z.string().optional(),
  mailReferent: z.string().optional(),
  workflowTravauxSimplifie: z.boolean(),
  workflow: workflowItemResponseSchema.optional(),
  refTypeOffre: refOfferTypeSchema,
})


export type RefOfferType = z.infer<typeof refOfferTypeSchema>
export type Subtheme = z.infer<typeof subthemeSchema>;
export type WorkflowItemResponse = z.infer<typeof workflowItemResponseSchema>