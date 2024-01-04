import { z } from 'zod';
import { SubstepSchema } from './Substep.zod';

export const StepSchema = z.object({
    id: z.number(),
    libelle: z.string(),
    description: z.string().optional(),
    statut: z.string(),
    sousetapes: z.array(SubstepSchema).optional()
})

export type Step = z.infer<typeof StepSchema>

export type TmpStep = {
    contentType: string;
    statusCode: number;
    value: Step;
}

export type TmpSteps = {
    contentType: string;
    statusCode: number;
    value: Step[];
}