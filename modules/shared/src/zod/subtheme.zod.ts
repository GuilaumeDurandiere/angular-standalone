import { z } from 'zod';
import { OfferTypeEnum } from '../models/_index';

const workflowItemResponseSchema = z.object({
  id: z.number(),
  libelle: z.string()
})

const refOfferTypeSchema = z.object({
  id: z.number(),
  code: z.string(),
  libelle: z.string()
})

export const subthemeSchema = z.object({
  accessibleATous: z.boolean(),
  couleur: z.string(),
  refTypeOffreId: z.nativeEnum(OfferTypeEnum),
  description: z.string().optional(),
  icone: z.string(),
  id: z.number(),
  libelle: z.string(),
  lienExterne: z.string().optional(),
  mailReferent: z.string().optional(),
  workflowTravauxSimplifie: z.boolean(),
  workflow: workflowItemResponseSchema.optional(),
  refTyOffre: refOfferTypeSchema.optional(),
})


export type RefOfferType = z.infer<typeof refOfferTypeSchema>
export type Subtheme = z.infer<typeof subthemeSchema>;
export type WorkflowItemResponse = z.infer<typeof workflowItemResponseSchema>