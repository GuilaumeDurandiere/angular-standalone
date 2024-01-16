import { z } from 'zod';
import { SubstepSchema } from './Substep.zod';

export const StepSchema = z.object({
    id: z.number(),
    libelle: z.string(),
    description: z.string().optional(),
    statut: z.string(),
    sousEtapes: z.array(SubstepSchema),
})

export type Step = z.infer<typeof StepSchema>
