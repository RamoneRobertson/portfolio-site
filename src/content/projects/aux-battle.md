---
title: Aux Battle
order: 1
featured: true
status: in-progress
domain: Real-time / Live streaming
tagline: Song competitions and aux battles for TikTok LIVE, run entirely from the chat.
summary: A real-time game backend for TikTok LIVE. Viewers submit songs by commenting, vote in knockout song battles or on whoever holds the aux, and follow along on an on-stream overlay that updates live over WebSockets.
context: Personal project
stack: [Go, WebSockets, Redis, DynamoDB, Kubernetes, EC2, Terraform, Docker, Spotify Web API]
diagram:
  - ["TikTok LIVE chat | comments + joins", "Chat simulator | demos + load tests"]
  - ["Chat ingest | Go, swappable source"]
  - ["Game engine | Go, brackets + votes"]
  - ["Redis | queues, votes, presence", "DynamoDB | game history"]
  - ["Stream overlay | WebSocket", "Spotify Web API | search + playback"]
# TODO: placeholder links, replace before deploying
repo: https://github.com/RamoneRobertson/aux-battle
demo: https://example.com/aux-battle
---

## The idea

Song battles are already a popular stream format. Tools like songbattle.io run knockout tournaments where songs face off one on one and the audience picks the winner, but players join through a separate site and sign in with Twitch or Discord. Aux Battle brings that game, and a second one, straight into TikTok LIVE: viewers take part just by commenting, and the stream shows everything as it happens.

## Mode 1: Song competition

A knockout tournament, played in the chat.

1. **Submissions.** Viewers comment `!song` with a title or artist to enter. Each viewer gets a set number of entries, and the overlay shows the latest entries as they come in.
2. **The bracket.** When the streamer closes entries, the songs are shuffled into a bracket. If the count isn't a power of two, some songs get a bye into the next round.
3. **Duels.** Each duel plays a clip of both songs, then opens a short voting window. Viewers comment `1` or `2`, and only their latest vote counts. The streamer can break a tie or overrule the chat.
4. **The winner.** Winners advance round by round until one song is left. The overlay shows the current duel and the next two match-ups, so viewers always know when their song is up.

## Mode 2: Pass the aux

One viewer holds the aux and picks a song. The chat votes `good` or `bad`. If the song survives, the holder keeps the aux and picks again; once they're voted out, the aux passes to the next viewer in line. Viewers who have left the stream when their turn comes are skipped.

## Chat commands

| Comment | What it does |
| --- | --- |
| `!song <title or artist>` | Enters a song in the competition, or joins the aux line |
| `!spot` | Replies with your place in line, or when your song plays next |
| `1` / `2` | Votes in a song duel |
| `good` / `bad` | Votes on the aux holder's song |

## How it works

- **Swappable chat source.** TikTok has no official API for reading LIVE chat, so the ingest layer sits behind one small interface: "give me the next chat event." In development it reads the stream through an open-source connector, and it can switch to a hosted provider or an official API without touching the game.
- **Chat simulator.** A second source generates fake viewers, songs and votes at any rate. It drives demos without going live, end-to-end tests and load tests.
- **Ingest.** Chat delivery can repeat or arrive out of order, so every event carries an ID and duplicates are dropped before they reach the game.
- **Game engine.** Parses commands and applies the rules for each mode: entry limits, spam cooldowns, bracket seeding and byes, voting windows and tie-breaks.
- **State in Redis.** Each stream gets its own keys: the bracket and current duel, one vote per viewer per duel, the aux line, and a presence key per viewer that expires a few minutes after their last activity. The game engine keeps nothing in memory, so it can restart or scale out without losing a game.
- **Live overlay.** The streamer adds the overlay to their stream as a browser source. It connects over a WebSocket and gets each change as it happens. When it reconnects, it loads a snapshot of the current state first, so it never shows a stale bracket.
- **Music.** Song requests are matched with the Spotify Web API, and playback runs through the streamer's own account.
- **History.** Finished games (brackets, winners, votes, aux holders) are saved to DynamoDB, so a streamer can look back on past streams.

## Running it

The services run on a small Kubernetes cluster that I set up myself with kubeadm on EC2, instead of a managed service like EKS or ECS Fargate. It keeps the monthly bill low, and it means I run the cluster end to end: the control plane, networking, upgrades and backups. It's also how I'm preparing for the CKA (Certified Kubernetes Administrator) exam.

- **Cluster.** One control-plane node and one worker on small EC2 instances, provisioned with Terraform.
- **Workloads.** The ingest service, game engine and overlay server run as Kubernetes Deployments. Redis runs in the cluster with a persistent volume instead of ElastiCache.
- **History.** DynamoDB in on-demand mode, so the cost follows real usage.
- **Scaling.** The game engine keeps no state in memory, so it can scale out across nodes when a stream gets busy.

## Status

In progress. The case study will be updated with load-test results from the chat simulator and a demo video as features land.
