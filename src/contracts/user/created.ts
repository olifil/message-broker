import { UserSubjects } from '../../subjects/user';
import { UserCreatedPayloadSchema, type UserCreatedPayload } from '../../payloads/user/created';

/**
 * Contract for the `user.created` message.
 *
 * Binds the subject {@link UserSubjects.Created} to its payload schema
 * {@link UserCreatedPayloadSchema} so publishers and subscribers cannot
 * reference one without the other.
 *
 * @example Publisher
 * ```ts
 * const data = UserCreatedContract.schema.parse(input);
 * await broker.publish(UserCreatedContract.subject, data);
 * ```
 *
 * @example Subscriber
 * ```ts
 * broker.subscribe(UserCreatedContract.subject, (raw) => {
 *   const event = UserCreatedContract.schema.parse(raw);
 *   // event is fully typed
 * });
 * ```
 */
export const UserCreatedContract = {
  subject: UserSubjects.Created,
  schema: UserCreatedPayloadSchema,
} as const;

/**
 * Discriminated-union-friendly shape of a `user.created` event.
 *
 * The `subject` literal lets TypeScript narrow across a union of events
 * from multiple contracts.
 */
export type UserCreatedEvent = {
  subject: typeof UserSubjects.Created;
  data: UserCreatedPayload;
};
