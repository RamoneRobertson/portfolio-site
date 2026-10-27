---
title: Payments Ledger API
order: 11
published: false
domain: Payments
tagline: A double-entry ledger service that never loses or double-counts money.
summary: Wallet-style payments backend with idempotent transfers, a double-entry ledger in PostgreSQL and reliable event publishing through a transactional outbox. Runs on ECS Fargate, provisioned with Terraform.
context: Personal project
stack: [Go, PostgreSQL, SQS, ECS Fargate, Terraform, OpenAPI, k6, GitHub Actions]
metrics:
  - { value: "2,000", label: "transfers per second sustained" }
  - { value: "38 ms", label: "p99 latency at peak load" }
  - { value: "0", label: "balance drift across 10M transfers" }
diagram:
  - ["Client | REST + Idempotency-Key"]
  - ["ALB"]
  - ["Ledger API | Go on ECS Fargate"]
  - ["PostgreSQL | ledger + outbox", "Redis | idempotency cache"]
  - ["Outbox relay | Go worker"]
  - ["SQS | payment events"]
repo: https://github.com/RamoneRobertson/payments-ledger
---

## The problem

Payment systems fail in boring ways: a client retries after a timeout and gets charged twice, a balance update succeeds but the notification never fires, or two concurrent transfers overdraw an account. I wanted a service that is correct under all three.

## How it works

- **Double-entry ledger.** Every transfer writes two immutable entries (debit and credit) inside one PostgreSQL transaction. Balances are derived from entries, so the books always sum to zero.
- **Idempotency keys.** Clients send an `Idempotency-Key` header. The first request stores its result; retries with the same key return the stored response instead of moving money again. Redis caches hot keys and PostgreSQL holds the source of truth.
- **No overdrafts under concurrency.** Transfers lock the source account row with `SELECT … FOR UPDATE` in a consistent order, which prevents both overdrafts and deadlocks.
- **Transactional outbox.** The `payment.completed` event is written to an outbox table in the same transaction as the ledger entries. A separate relay publishes to SQS, so an event is never lost or sent for a rolled-back transfer.

## Delivery

Terraform provisions the VPC, ALB, ECS service, RDS PostgreSQL, ElastiCache and SQS. GitHub Actions runs unit and integration tests against a real PostgreSQL container, builds the image, and rolls it out to ECS. The API is documented with OpenAPI.

## Results

Load-tested with k6 at 2,000 transfers per second with a p99 of 38 ms. A reconciliation job replayed 10 million randomized transfers, including forced retries and crashes mid-transaction, with zero balance drift.

## What I'd add next

Multi-currency accounts with FX entries, and partitioning the entries table by month to keep indexes small.
