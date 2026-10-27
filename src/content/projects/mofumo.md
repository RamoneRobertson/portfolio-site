---
title: Mofumo
order: 2
featured: true
status: in-progress
domain: Marketplace
tagline: A bilingual pet services marketplace for Tokyo.
summary: Connects expat pet owners with English-speaking pet care providers in Tokyo, with ward-based search and JWT authentication. Built solo in Java and Spring Boot.
context: Solo project
stack: [Java 21, Spring Boot, Spring Security, JWT, MySQL, Docker]
diagram:
  - ["Pet owner | search by ward", "Provider | manage listings"]
  - ["REST API | Spring Boot"]
  - ["Spring Security | JWT auth"]
  - ["MySQL | users, listings"]
repo: https://github.com/RamoneRobertson/mofumo
# TODO: placeholder link, replace before deploying
demo: https://example.com/mofumo
---

## The problem

Expat pet owners in Tokyo struggle to find pet care providers who speak English.

## How it works

- **Search by ward.** Owners filter providers by Tokyo ward and service type.
- **Provider listings.** Providers sign up and manage their own listings and services.
- **Authentication.** The REST API is secured with Spring Security and stateless JWTs.
- **Data and packaging.** MySQL stores users and listings, and the whole stack runs in Docker.

## Status

In progress. I built the first version solo (93 commits) and I'm now finishing it.
