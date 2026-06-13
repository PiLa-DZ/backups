# TLD `Top-Level Domains`

- gTLD `Generic Top-Level Domains`
  - `.com (Commercial Business)`
  - `.org (Organizations / Non-profits)`
  - `.net (Network / Tech Infrastructure)`

- ccTLD `Country Code Top-Level Domains`
  - `.dz (Algeria)`
  - `.fr (France)`
  - `.ca (Canada)`

When the global internet structure was being designed,
engineers didn't want domain extensions to be random.
They created specific categories to help users and network routers instantly understand
**what type of organization** runs the website or **what country** it belongs to.

---

## The Classification Blueprint

TLDs are split into two main buckets:
**gTLDs** (Generic categories for anyone worldwide)
and **ccTLDs** (Country codes tied to a specific patch of land).

```text
                                 [ TOP-LEVEL DOMAINS ]
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         ▼                                                                   ▼
   [ GENERIC TLDs (gTLDs) ]                                     [ COUNTRY CODE TLDs (ccTLDs) ]
(Global open classifications)                                  (Tied to specific national borders)
         │                                                                   │
         ├──► .com  (Commercial Business)                                    ├──► .dz  (Algeria)
         ├──► .org  (Organizations / Non-profits)                            ├──► .fr  (France)
         └──► .net  (Network / Tech Infrastructure)                          └──► .ca  (Canada)

```

---

## 1. `.com` (Commercial)

- **The Origin:** Short for **Commercial**.

- **The Purpose:**
  It was originally created strictly for companies, shops,
  and for-profit businesses looking to build a corporate presence on the web.

- **The Reality Today:**
  It became so insanely popular that it lost its strict meaning.
  Today, it is the default global standard for the internet.
  Anyone on the planet can buy a `.com` address for any reason,
  whether you are running a giant multinational banking platform
  or just setting up a personal blog to document your code.

## 2. `.org` (Organization)

- **The Origin:** Short for **Organization**.

- **The Purpose:**
  It was engineered specifically for non-commercial groups.
  Think of non-profit organizations, charities, open-source software foundations,
  and cultural projects (for example, `wikipedia.org` or `python.org`).

- **The Reality Today:**
  While it is mostly open for anyone to buy now,
  internet users still culturally expect a `.org` site
  to belong to a public utility, an open-source project,
  or a community service rather than a shop trying to sell them a product.

## 3. `.net` (Network)

- **The Origin:** Short for **Network**.

- **The Purpose:**
  In the early days of networking infrastructure,
  this extension was reserved strictly for the gatekeepers of the internet wires:
  Internet Service Providers (ISPs),
  network infrastructure operators, data centers,
  and telecommunications companies.

- **The Reality Today:**
  Like `.com`, it is now fully open to the public.
  It is heavily utilized as a backup choice by tech startups,
  software platforms, and database services if their primary choice name is already taken on `.com`.

## 4. `.dz` (Algeria / Dzayer)

- **The Origin:**
  This is a **ccTLD** (Country Code Top-Level Domain).
  It stands for **Dzayer** (the local name for Algeria 🇩🇿).

- **The Purpose:**
  It is the official digital stamp of the Algerian
  nation on the internet ecosystem.

- **The Strict Governance:**
  Unlike `.com` or `.net` where anyone with a credit card can buy a name in 5 seconds,
  the `.dz` zone is strictly protected and managed by **NIC.DZ** (a division of CERIST).

Because it represents the national identity,
you cannot just buy a `.dz` domain to host a random site.
To get one, you have to submit official verification documents—like
an active Algerian **Commercial Register (Registre de Commerce)** certificate
or a trademark registered with INAPI.
The name of the domain must also exactly match the name of your legal company.

---

## Subdomains Inside the `.dz` Space

To keep things organized locally,
the Algerian registry splits the country code into functional sub-categories:

- **`company.com.dz`:** Reserved strictly for local commercial businesses and companies.
- **`association.org.dz`:** Reserved for non-profit organizations and non-governmental associations operating inside Algeria.
- **`provider.net.dz`:** Reserved strictly for local network operators, telecom agencies, or backend internet services.
- **`university.edu.dz`:** Reserved for Algerian educational institutions and universities.
- **`ministry.gov.dz`:** Reserved strictly for the Algerian government and official state ministries.

---

### The Final System Connection

When we traced the global DNS tree lookup earlier,
this is exactly what the servers were reading!
If your browser runs a query for `api.telecom.dz`,
the DNS Resolver bypasses the global `.com` registry entirely.
It jumps straight to the **Algerian Root Nameservers** running inside local server
infrastructure to find the live destination IP address for that specific backend system.
