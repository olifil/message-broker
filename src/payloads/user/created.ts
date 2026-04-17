import { z } from 'zod';

/**
 * Zod schema for the `user.created` event payload.
 *
 * Cross-field rule: at least one of `email` or `phoneNumber` must be provided.
 * Publishers should `.parse()` before emitting; subscribers should `.parse()`
 * on receive to validate the wire payload.
 *
 * @example
 * ```ts
 * const payload = UserCreatedPayloadSchema.parse({
 *   id: crypto.randomUUID(),
 *   email: 'jane@example.com',
 *   firstName: 'Jane',
 *   lastName: 'Doe',
 *   createdAt: new Date().toISOString(),
 * });
 * ```
 */
export const UserCreatedPayloadSchema = z
  .object({
    id: z.uuid(),
    email: z.email().optional(),
    phoneNumber: z.string().optional(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    createdAt: z.iso.datetime(),
  })
  .refine((data) => data.email !== undefined || data.phoneNumber !== undefined, {
    message: 'At least one of email or phoneNumber must be provided',
  });

/**
 * TypeScript type inferred from {@link UserCreatedPayloadSchema}.
 */
export type UserCreatedPayload = z.infer<typeof UserCreatedPayloadSchema>;
