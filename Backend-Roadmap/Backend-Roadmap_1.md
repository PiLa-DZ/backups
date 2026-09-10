# BackEnd Raodmap

## Beginner and Medium BackEnd

- Browser
  - [x] HTML 5 (Basics)
  - [x] CSS 3 (Basics)
  - [x] JavaScript DOM BOM

- Programming Language
  - [x] JavaScript `Programming Language` (Raodmap)
  - [x] Node.js `JavaScript runtime environment` (Raodmap)
  - [x] NPM `Node Package Manager`
  - [x] FNM `Fast Node Manager`
  - [x] TypeScript `Super set of JavaScript` (Raodmap)

- [x] Git `Version Control Systems` (Raodmap)
- [x] GitHub `Repo Hosting Services` (Raodmap)
- [ ] GitLab `Repo Hosting Services`

- Relational Database
  - [x] MySQL / MariaDB
  - [ ] PostgreSQL
  - [ ] SQLite
  - [x] ORMs `Object-Relational Mapping`
  - [x] Migrations
  - [x] N+1 Problem

- APIs
  - API Styles
    - [x] Rest
    - [x] gRPC
    - [ ] GraphQL (Skip)
    - [ ] SOAP (Skip)
  - [ ] Open API Spec `OpenAPI Specification (OAS)` [swagger]
  - Authentication
    - [x] OAuth
    - [x] JWT `JSON Web Token`
    - [x] Cookie Based Auth
  - Web Security
    - Hashing Algorithm "one-way mathematical function"
      - [x] MD5 `Message-Digest Algorithm 5` [!BROKEN]
      - [x] Bcrypt `password-hashing function` [OK] [bcrypt module]
      - [x] Argon2 `password-based key derivation function` [argon2 module]
      - [x] Scrypt `memory-hard key derivation function` [OK] [scrypt module]
      - [x] SHA Family `Secure Hash Algorithm` [scrypt module]
        - SHA-1 (1995) --> 160-bit --> [!BROKEN]
        - SHA-2 (2001) --> 224, 256, 384, 512-bit --> [OK]
        - SHA-3 (2015) --> 224, 256, 384, 512-bit --> [OK]
    - [x] HTTPS `Hypertext Transfer Protocol Secure`
    - [x] SSL/TLS `Transport Layer Security`
    - [x] CORS `Cross-Origin Resource Sharing` [cors module]
    - [x] CSP `Content Security Policy` [helmet module]
    - [x] OWASP Risks `Open Web Application Security Project` OWASP Top 10
      - [ ] Broken Access Control
      - [ ] Injection (SQL, NoSQL, Command)
      - [ ] Security Misconfiguration
      - [ ] Software Supply Chain & Dependency Failures
      - [ ] Identification and Authentication Failures
    - [x] Server Security
      - [ ] Access Control & SSH Hardening
      - [ ] Network Isolation & Firewalls
      - [ ] Use a Reverse Proxy (Nginx or Caddy)
      - [ ] Process Hardening (Least Privilege)
      - [ ] Patch Management & System Upgrades
    - [ ] API security best practices
      - [ ] Authentication
      - [ ] JSON Web Tokens `JWT`
      - [ ] Access Control
      - [ ] OAuth
      - [ ] Input
      - [ ] Output
      - [ ] Processing
      - [ ] CI/CD
      - [ ] Monitoring

- Caching
  - [ ] Redis
  - [ ] Memcached
  - [ ] HTTP Caching

- Web Servers
  - [ ] Nginx
  - [ ] Apache
  - [ ] Caddy
  - [ ] MS IIS

**Advanced Backend**

- Testing
  - [x] Unit Testing
  - [x] Integration Testing
  - [x] E2E Testing

- More About Database
  - [ ] Query Optimization
  - [ ] Transactions
  - [ ] ACID `Atomicity | Consistency | Isolation | Durability`
  - [ ] Normalization
  - [ ] Failure Modes
  - [ ] Profiling Performance
  - [ ] Backup & Recovery

- Scaling Databases
  - [ ] Indexing `Scaling Databases`
  - [ ] Data Replication
  - [ ] Sharding strategies
  - [ ] CAP Theorem

- NoSQL Database (Optional)
  - Document DBs
    - [ ] MongoDB
    - [ ] CouchDB
  - Key-Value
    - [ ] Redis
    - [ ] DynamoDB
  - Realtime
    - [ ] Firebase
    - [ ] RethinkDB

- [ ] CI/CD
- [ ] Docker `Containerization` (Raodmap)
- [ ] LXC `Linux Containers`
- [ ] Kubernetes `Container Orchestration` (Raodmap)

- Architectural Patterns
  - [ ] Microservices
  - [ ] Serverless
  - [ ] Monolithic Apps
  - [ ] SOA `Service-Oriented Architecture`
  - [ ] Service Mesh
  - [ ] Twelve-Factor Apps

- [ ] System Design (Raodmap)
- [ ] Design and Architecture (Raodmap)

- Message Brokers
  - [ ] Kafka
  - [ ] RabbitMQ

- Search Engines
  - [ ] Solr
  - [ ] Elasticsearch

- Real Time Data
  - [ ] Server Sent Events
  - [ ] Web sockets
  - [ ] Long Polling
