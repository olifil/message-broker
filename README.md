# @olifil/message-broker

Source of truth for message broker subjects and payloads in a microservices architecture.

This package defines the **contracts** between services — subjects (topics) and their validated payloads — so that publishers and subscribers share a single, type-safe definition without being coupled to each other.

## Installation

This package is published to GitHub Packages. Add a `.npmrc` at your project root so npm knows to resolve `@olifil/*` from GitHub:

```
@olifil:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @olifil/message-broker zod
```

> `zod` is a peer dependency and must be installed alongside this package.
> Authentication: GitHub Packages requires a token even for reads of private packages. See [GitHub's docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

## Concepts

The package is organized into three layers:

| Layer       | Purpose                                                                     |
| ----------- | --------------------------------------------------------------------------- |
| `subjects`  | String constants identifying each message topic, grouped by bounded context |
| `payloads`  | Zod schemas and inferred TypeScript types for each message's data           |
| `contracts` | Combines a subject with its schema — the primary import for services        |

Each bounded context (e.g. `user`, `notification`) owns its subjects and payloads. Adding a new context means adding files in all three layers and re-exporting them.

## Available contracts

### User context

| Contract              | Subject        | Description                    |
| --------------------- | -------------- | ------------------------------ |
| `UserCreatedContract` | `user.created` | A new user account was created |

## Adding a new bounded context

1. **Subject** — create `src/subjects/order.ts` and export from `src/subjects/index.ts`

```typescript
// src/subjects/order.ts
export const OrderSubjects = {
  Created: 'order.created',
} as const;

export type OrderSubject = (typeof OrderSubjects)[keyof typeof OrderSubjects];
```

2. **Payload** — create `src/payloads/order/created.ts` and export from `src/payloads/index.ts`

```typescript
// src/payloads/order/created.ts
import { z } from 'zod';

export const OrderCreatedPayloadSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  totalAmount: z.number().positive(),
  createdAt: z.string().datetime(),
});

export type OrderCreatedPayload = z.infer<typeof OrderCreatedPayloadSchema>;
```

3. **Contract** — create `src/contracts/order/created.ts` and export from `src/contracts/index.ts`

```typescript
// src/contracts/order/created.ts
import { OrderSubjects } from '../../subjects/order';
import { OrderCreatedPayloadSchema, type OrderCreatedPayload } from '../../payloads/order/created';

export const OrderCreatedContract = {
  subject: OrderSubjects.Created,
  schema: OrderCreatedPayloadSchema,
} as const;

export type OrderCreatedEvent = {
  subject: typeof OrderSubjects.Created;
  data: OrderCreatedPayload;
};
```

## Scripts

```bash
npm run build       # compile to dist/
npm run dev         # watch mode
npm test            # run tests
npm run typecheck   # type-check without emitting
```
