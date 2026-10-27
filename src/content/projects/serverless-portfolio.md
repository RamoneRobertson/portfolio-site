---
title: Serverless Portfolio on AWS
order: 3
featured: true
domain: Cloud infrastructure
tagline: This website, built and deployed as production cloud infrastructure.
summary: A static Astro site on S3 behind CloudFront, with a live visitor counter served by API Gateway, Lambda and DynamoDB. Every resource is in Terraform and every push deploys through GitHub Actions.
context: Personal project, the site you're on
stack: [AWS, Terraform, Lambda, API Gateway, DynamoDB, CloudFront, Python, GitHub Actions, Astro]
metrics:
  - { value: "< 1 s", label: "page load worldwide via CloudFront" }
  - { value: "100%", label: "of infrastructure in Terraform" }
  - { value: "~$1", label: "monthly hosting cost" }
diagram:
  - ["Visitor"]
  - ["Route 53 | DNS", "CloudFront | CDN + TLS"]
  - ["S3 | static site", "API Gateway | /v1/visitors"]
  - ["Lambda | Python"]
  - ["DynamoDB | visitor count"]
repo: https://github.com/RamoneRobertson/portfolio-site
demo: https://ramonerobertson.dev
---

## The problem

A portfolio for a backend engineer should prove the skills it lists. This site is built the way I'd build a small production service.

## How it works

- **Static frontend.** Astro builds plain HTML and CSS with almost no JavaScript, so pages load fast and work for everyone.
- **CDN and TLS.** CloudFront serves the S3 bucket with an ACM certificate, HTTP/2 and caching. The bucket is private and only CloudFront can read it.
- **Live API.** The visitor count in the footer comes from API Gateway calling a Python Lambda that atomically increments a DynamoDB counter.
- **Least privilege.** The Lambda's IAM role can only update one table. GitHub Actions deploys with short-lived OIDC credentials, with no long-lived AWS keys stored anywhere.

## Delivery

Terraform manages DNS, certificates, the bucket, CloudFront, API Gateway, Lambda and DynamoDB, with remote state in S3. On every push to `main`, GitHub Actions builds the site, syncs it to S3 and invalidates the CloudFront cache.

## Results

Sub-second loads worldwide, fully reproducible infrastructure, and hosting that costs about a dollar a month.
