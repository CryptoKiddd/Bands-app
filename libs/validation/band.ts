import { z } from "zod";


export const sanitizeBandsObject = z.object({
    name: z.string().min(1),
    genre: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
})

export type BandRequestInput = z.infer< typeof sanitizeBandsObject>

