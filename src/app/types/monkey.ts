import { z } from 'zod';
import { MonSchema } from './mon';

export const MonkeySchema = MonSchema.extend({
  knownFrom: z.string().trim().optional().nullable(),
  strength: z.string().trim().optional().nullable(),
  weaknesses: z.string().trim().optional().nullable(),
  speciesName: z.string().trim().optional().nullable(),
});

// export const MonkeySchemaNotNullable = MonkeySchema.extend({
//   knownFrom: z.string().trim().optional(),
//   strength: z.string().trim().optional(),
//   weaknesses: z.string().trim().optional(),
//   speciesName: z.string().trim().optional(),
//   description: z
//     .string()
//     .trim()
//     .max(300, {
//       message: 'Description can only have up to 300 characters',
//     })
//     .optional(),
//   image: z.string().trim().url({ message: 'Not a valid URL' }).optional(),
// });

export type Monkey = z.infer<typeof MonkeySchema>;

// export type MonkeyNotNullable = z.infer<typeof MonkeySchemaNotNullable>;
