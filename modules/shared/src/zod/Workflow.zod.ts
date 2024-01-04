import { z } from 'zod';
import { StepSchema } from './Step.zod';

export const WorkflowSchema = z.object({
    id: z.number(),
    libelle: z.string(),
    actif: z.boolean(),
    statut: z.string().optional(), // TODO à modifier dans le backend
    etapes: z.array(StepSchema),
})

export type Workflow = z.infer<typeof WorkflowSchema>;
