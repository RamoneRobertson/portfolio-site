---
title: Flash Sale Order Service
order: 13
published: false
domain: E-commerce
tagline: Sells limited stock to a traffic spike without overselling a single item.
summary: Order and inventory services that survive a flash sale. Redis reserves stock atomically, a saga coordinates payment and fulfillment over Kafka, and rate limiting protects the system at the edge.
context: Personal project
stack: [Java 21, Spring Boot, Kafka, Redis, PostgreSQL, Docker, k6]
metrics:
  - { value: "10k", label: "requests per second at sale start" }
  - { value: "0", label: "oversold items" }
  - { value: "99.9%", label: "orders resolved within 5 s" }
diagram:
  - ["Shoppers | burst traffic"]
  - ["Rate limiter | Redis token bucket"]
  - ["Order service | Spring Boot"]
  - ["Redis | stock reservations", "Kafka | order saga"]
  - ["Payment service", "Inventory service | PostgreSQL"]
repo: https://github.com/RamoneRobertson/flash-sale-orders
---

## The problem

When 10,000 people try to buy 500 items at the same second, a naive "check stock, then decrement" approach oversells, and the database becomes the bottleneck for everyone.

## How it works

- **Atomic reservations.** Stock lives in Redis during the sale. A Lua script checks and decrements in one atomic step, so two buyers can never claim the last unit.
- **Saga over Kafka.** A reservation starts an order saga: payment, then inventory confirmation in PostgreSQL. If payment fails or times out, a compensating event releases the reservation back to stock.
- **Edge protection.** A Redis token-bucket rate limiter caps requests per user and overall, returning clear `429` responses instead of letting the system fall over.
- **Idempotent consumers.** Every Kafka consumer records processed event IDs, so redelivered messages are harmless.

## Delivery

Each service is a Spring Boot app in Docker, with Testcontainers integration tests for Kafka, Redis and PostgreSQL. Docker Compose runs the whole system locally for load tests.

## Results

Handled a 10,000 requests-per-second spike at sale start with zero oversold items, and 99.9% of orders reached a final state (paid or released) within five seconds.

## What I'd add next

A virtual waiting room to queue users fairly before the sale opens.
