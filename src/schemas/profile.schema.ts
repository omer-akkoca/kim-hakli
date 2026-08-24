import { z } from 'zod';

const fullNameRegex = /^\p{L}[\p{L}\p{N}\s'_’?–-]*$/u;

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Ad soyad en az 2 karakter olmalı.')
    .max(60, 'Ad soyad en fazla 60 karakter olabilir.')
    .regex(fullNameRegex, 'Ad soyad harfle başlamalı.'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;