import { z } from 'zod';
import { StepSchema } from './Step.zod';

export const WorkflowSchema = z.object({
    id: z.number(),
    libelle: z.string(),
    actif: z.boolean(),
    statut: z.string(),
    etapes: z.array(StepSchema),
})

export type Workflow = z.infer<typeof WorkflowSchema>;