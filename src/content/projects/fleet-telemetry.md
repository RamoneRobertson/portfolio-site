---
title: Fleet Telemetry Pipeline
order: 12
published: false
domain: Mobility / IoT
tagline: Streams sensor data from thousands of vehicles and flags anomalies in seconds.
summary: Ingests vehicle telemetry over gRPC, buffers it in Kafka, stores it in TimescaleDB and raises alerts on anomalies. Runs on EKS with Prometheus and Grafana for observability.
context: Personal project
stack: [Go, gRPC, Kafka, TimescaleDB, EKS, Helm, Prometheus, Grafana]
metrics:
  - { value: "50k", label: "messages per second ingested" }
  - { value: "< 2 s", label: "from sensor reading to alert" }
  - { value: "5,000", label: "simulated vehicles" }
diagram:
  - ["Vehicle simulator | 5k devices"]
  - ["Ingest gateway | Go, gRPC"]
  - ["Kafka | partitioned by vehicle"]
  - ["Writer | batch inserts", "Anomaly detector | Go"]
  - ["TimescaleDB", "Alerts | Slack + webhook"]
repo: https://github.com/RamoneRobertson/fleet-telemetry
---

## The problem

Connected vehicles send a constant stream of small readings: speed, battery, temperature, location. The backend has to absorb bursts, keep per-vehicle ordering, store months of time-series data cheaply, and notice when something looks wrong.

## How it works

- **Ingest.** A stateless Go gateway accepts gRPC client streams, validates readings, and produces them to Kafka keyed by vehicle ID so each vehicle's data stays in order.
- **Backpressure.** The gateway scales horizontally on EKS with a Horizontal Pod Autoscaler. Kafka absorbs bursts so downstream consumers can catch up at their own pace.
- **Storage.** A consumer group batches inserts into TimescaleDB hypertables, with continuous aggregates for 1-minute and 1-hour rollups and a retention policy for raw data.
- **Anomaly detection.** A second consumer keeps a rolling window per vehicle and flags readings outside expected bounds, such as battery temperature spikes, then sends alerts.

## Delivery

Everything ships as Helm charts. Terraform provisions EKS and managed Kafka (MSK). A vehicle simulator generates realistic traffic for load tests.

## Results

Sustained 50,000 messages per second from 5,000 simulated vehicles, with alerts firing in under two seconds of a bad reading. Grafana dashboards show consumer lag, ingest rate and p99 write latency.

## What I'd add next

Over-the-air config pushes back to vehicles over the same gRPC channel, and tiering cold data to S3.
