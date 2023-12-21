import { z } from 'zod';

export const SubstepSchema = z.object({
    id: z.number(),
    libelle: z.string(),
    description: z.string().optional()
})

export type Substep = z.infer<typeof SubstepSchema>;