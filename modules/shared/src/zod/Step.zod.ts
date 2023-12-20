import { z } from 'zod';

export const StepSchema = z.object({
    id: z.number(),
    libelle: z.string(),
    description: z.string().optional(),
    statut: z.string()
})

export type Step = z.infer<typeof StepSchema>