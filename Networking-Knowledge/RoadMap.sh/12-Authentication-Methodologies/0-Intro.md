# Authentication Methodologies

- Local Authentication `JWT` || `Cookie`
- Directory Services & Centralized AAA (LDAP & RADIUS
  - LDAP `Lightweight Directory Access Protocol`
  - RADIUS `Remote Authentication Dial-In User Service`
- Kerberos `The Ticket-Granting Guardian` `KDC`
- Single Sign-On `SSO`
- Certificates `The Public Key Infrastructure`

---

## 1. Local Authentication

### The Concept

**Local Authentication** is the most basic, self-contained way to verify identity.
The system checking your credentials is the exact same system that stores your credentials.

```text
+-------------------------------------------------------------+
|                     SINGLE BACKEND SERVER                   |
|                                                             |
|  [ User Input ] ──( "Nabil" / Password )──► [ Auth Logic ]  |
|                                                    │        |
|                                            (Checks Hash)    |
|                                                    ▼        |
|                                             [(MariaDB DB)]  |
|                                             (Local Users)   |
+-------------------------------------------------------------+

```

### How It Works in Code

If you build an Express.js API, create a `/api/login` route,
take a password, hash it using a library like `bcrypt`,
and check it against a `User` table inside your local MariaDB database,
you have implemented local authentication.

- **The Catch:**
  It doesn't scale. If your company grows
  and rolls out 20 completely separate internal software tools,
  your developers would have to create 20 different usernames and passwords.
  If a developer leaves the company,
  an administrator has to manually go into 20 different databases to delete their account.

---

## 2. Directory Services & Centralized AAA (LDAP & RADIUS)

To fix the scaling nightmare of local authentication,
enterprise networks pull user identities _out_ of individual application databases
and store them in a single, centralized truth source.

### LDAP (Lightweight Directory Access Protocol)

LDAP is the ultimate corporate database for identity.
It is optimized for lightning-fast **reads and searches**.
Instead of standard relational SQL tables,
LDAP organizes data in a hierarchical, tree-like structure.

- **How it works:**
  When you log into a corporate computer,
  the system queries the central LDAP tree (like Microsoft Active Directory).
  It looks up your path (e.g., `uid=nabil,ou=engineering,dc=company,dc=com`)
  to verify your corporate profile, email, job title, and permissions in one shot.

### RADIUS (Remote Authentication Dial-In User Service)

While LDAP is used for authenticating into _software applications and directories_,
**RADIUS** is used to authenticate into _physical network infrastructure_.

- It provides a framework known as **AAA**:
  - **Authentication** (Who are you?),
  - **Authorization** (What are you allowed to do?),
  - **Accounting** (What did you do, and for how long?).

```text
[ Developer Laptop ] ──► (Wants VPN/Wi-Fi Access) ──► [ Network NAS / VPN Gateway ]
                                                             │
                                                   (UDP 1812: RADIUS Request)
                                                             ▼
                                                    [ RADIUS SERVER ]
                                                     (Validates Keys)

```

- **How it works:**
  When you try to connect to an enterprise office Wi-Fi network (WLAN)
  or step through a corporate VPN gateway,
  the network hardware switch or access point takes your credentials,
  wraps them in a RADIUS packet,
  and shoots it over **UDP Port 1812** to a central RADIUS server.
  The server verifies your keys,
  tells the hardware switch to open or close your port,
  and logs your active connection time over **UDP Port 1813**.

---

## 3. Kerberos (The Ticket-Granting Guardian) `KDC`

### The Problem

Imagine you are inside a large corporate network environment.
You log in once, but now you need to fetch a file from a file server,
print a document on a network printer, and query an internal backend database.
If you had to type your password over the wire every single time you hit a new service,
a hacker running Wireshark on the local LAN could easily capture your credentials.

### The Solution

**Kerberos** stops passwords from ever traveling across the wire after your initial login.
It uses a secure, centralized system called a **Key Distribution Center (KDC)**
to hand out temporary, encrypted digital "tickets."

```text
  [ CLIENT ] ═══════════ 1. Authentication Request ══════════► [ KERBEROS KDC ]
             ◄═══════════ 2. Ticket-Granting Ticket (TGT) ═══  (Auth Server)

  [ CLIENT ] ═══════════ 3. Present TGT + Request Service ═══► [ KERBEROS KDC ]
             ◄═══════════ 4. Hand over Token for File Server ═  (Ticket Granting)

  [ CLIENT ] ═══════════ 5. Present Token ───────────────────► [ FILE SERVER ]

```

### The Step-by-Step Handshake

1. **The Initial Login:**
   You type your password once.
   Your machine hashes it and sends a request to the Kerberos Authentication Server.

2. **The Golden Ticket:**
   The server verifies you and shoots back an encrypted **Ticket-Granting Ticket (TGT)**.
   Your machine saves this ticket in memory.

3. **Accessing a Service:**
   When you want to access the internal Database Server,
   your machine presents that TGT back to the Kerberos ticket-granting service.

4. **The Service Token:**
   Kerberos verifies the TGT and spits out a highly specific,
   short-lived **Service Ticket** exclusively for that database.

5. **Seamless Access:**
   Your machine passes that Service Ticket directly to the Database Server.
   The database decrypts it, verifies you are authentic,
   and grants access without your password ever leaving your local RAM.

---

## 4. Single Sign-On (SSO)

### The Concept

**SSO** takes the luxury of logging in once and scales it up across completely
different web applications and distinct cloud environments
(like logging into Gmail, Slack, and GitHub using one corporate account).

### How It Works for Backend Architects

SSO abstracts identity verification completely away from your application.
It relies on standard protocols like **OIDC (OpenID Connect)** or **SAML**.

```text
[ User App ] ──► (Needs Access) ──► [ Your Custom Node.js API ]
                                              │
                                   (Redirects to Identity Provider)
                                              ▼
                                    [ Central Identity Provider ]
                                       (Auth0 / Okta / Keycloak)
                                              │
                                    (Returns Signed JWT Token)
                                              ▼
[ User App ] ◄─── (Access Granted) ◄─── [ Your Custom Node.js API ]

```

When a user hits your backend API,
your code checks for a signed cryptographically secure cryptographic token (like a JWT).
If it's missing, your backend redirects the user's browser to a centralized
**Identity Provider (IdP)** (like Okta, Auth0, or an open-source Keycloak instance).
The user logs in _there_. The IdP verifies their identity, signs a cryptographic token
with its private key, and boots the user back to your API.
Your code simply validates the token's digital signature using
the IdP's public key—meaning your database never has to store a single corporate password.

---

## 5. Certificates (The Public Key Infrastructure)

### The Concept

While the previous methods focus on verifying _human_ users,
**Digital Certificates** (SSL/TLS) are primarily used to verify
**machines, websites, and cryptographic channels**.
They establish the foundation of public trust across public wide area networks (WANs).

### How It Works: Asymmetric Cryptography

A certificate functions exactly like a state-issued passport for a server. It contains:

- The legal domain name of the holder (e.g., `api.nabil.com`)
- The public key of the server
- The cryptographic digital signature of a globally trusted
  **Certificate Authority (CA)** (like Let's Encrypt or DigiCert)

```text
[ Your Browser ] ─── 1. "Prove who you are!" ───► [ Secure Web Server ]
                 ◄─── 2. Hands over Certificate ─── [ (Contains Public Key) ]
                    │
                    ├──► Checks CA Root Ledger (Is the signature valid? YES)
                    └──► Encrypts transmission session keys using Public Key

```

When your browser connects via HTTPS,
the server hands over its digital certificate.
Your operating system checks its built-in root ledger of trusted CAs to verify the signature.
If the math checks out,
your machine uses the certificate's embedded **Public Key**
to encrypt a temporary symmetric session key,
sending it back to the server. Now,
your entire transmission data stream is completely bulletproof against interception.

---

## Summary of Identity Warfare

| Methodology      | Primary Scope           | Core Purpose                                                          | Typical Use Case                                            |
| ---------------- | ----------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Local Auth**   | Single App              | Checks a username against a local table hash.                         | Small apps, independent hobby setups, simple prototypes.    |
| **LDAP**         | Directory               | Hierarchical, read-optimized user/resource directory lookup.          | Corporate user mapping, permissions tracking.               |
| **RADIUS**       | Network Hardware        | Provides centralized AAA management over UDP for ports.               | Securing enterprise Wi-Fi routers and VPN gateways.         |
| **Kerberos**     | Network Protocol        | Uses encrypted ticket handshakes to prevent cleartext transport.      | Windows Domains, secure internal corporate networks.        |
| **SSO**          | Cloud / Web             | Shares a single login state across independent third-party platforms. | Corporate SaaS access (Logging into Slack/GitHub via Okta). |
| **Certificates** | Cryptographic / Machine | Uses asymmetric public keys to prove server identity and bind trust.  | Securing HTTPS APIs and establishing TLS encrypted tunnels. |
