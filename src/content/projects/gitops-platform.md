---
title: GitOps Kubernetes Platform
order: 15
published: false
domain: Platform engineering
tagline: An EKS platform where Git is the only way to change production.
summary: EKS cluster provisioned with Terraform and managed by Argo CD. Services deploy from Helm charts on merge, with Prometheus, Grafana and alerting built in. Builds on the Rancher work I led at Boeing.
context: Personal project
stack: [EKS, Terraform, Argo CD, Helm, Prometheus, Grafana, GitHub Actions]
metrics:
  - { value: "< 5 min", label: "from merge to running in the cluster" }
  - { value: "1 click", label: "rollback via Git revert" }
diagram:
  - ["Developer | pull request"]
  - ["GitHub Actions | build + push image"]
  - ["Config repo | Helm values"]
  - ["Argo CD | sync"]
  - ["EKS | services", "Prometheus + Grafana"]
repo: https://github.com/RamoneRobertson/gitops-platform
---

## How it works

Terraform builds the VPC and EKS cluster. Argo CD watches a config repository and keeps the cluster in sync with it, so every change is reviewed in a pull request and rolling back is a `git revert`. Application CI builds images and opens an automated PR to bump the image tag.

The cluster ships with the kube-prometheus-stack, preconfigured dashboards for the services, and alerts for error rate and latency.
