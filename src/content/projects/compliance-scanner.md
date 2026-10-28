---
title: Compliance-as-Code Scanner
order: 16
published: false
domain: Security
tagline: Checks Linux hosts against CIS benchmarks and reports drift.
summary: A Go CLI and small API that run CIS benchmark checks across fleets of Linux hosts over SSH and publish pass/fail reports. Reworks the scan automation I built at Boeing using only public benchmarks.
context: Personal project
stack: [Go, PostgreSQL, Docker, GitHub Actions]
metrics:
  - { value: "120+", label: "CIS checks implemented" }
  - { value: "50", label: "hosts scanned in parallel" }
diagram:
  - ["Scanner CLI | Go"]
  - ["Hosts | SSH, parallel"]
  - ["Results API | Go"]
  - ["PostgreSQL | scan history"]
repo: https://github.com/RamoneRobertson/compliance-scanner
---

## How it works

Checks are defined as data (YAML) rather than code, so adding a benchmark rule doesn't need a new release. The scanner runs checks concurrently over SSH, sends results to a small API, and stores history in PostgreSQL so drift between scans is easy to see. Uses public CIS benchmarks only, with no employer material.
