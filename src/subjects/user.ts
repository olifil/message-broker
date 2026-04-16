/**
 * Message broker subjects (topic names) for the `user` bounded context.
 *
 * Subjects follow the `<context>.<event>` dot-namespaced convention and are
 * used as the transport identifier when publishing or subscribing.
 */
export const UserSubjects = {
  /** Emitted when a new user account has been created. */
  Created: 'user.created',
} as const;

/**
 * Union of all valid subject strings in the `user` context.
 *
 * Useful for narrowing discriminated unions of events.
 */
export type UserSubject = (typeof UserSubjects)[keyof typeof UserSubjects];
