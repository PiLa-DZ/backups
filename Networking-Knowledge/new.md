# new

- 1. FTP (File Transfer Protocol)
  - Ancient routers, embedded devices, old backups.
  - **The Port:** `21`
  - dual-channel protocol
    - 1. channel for text commands (`USER`, `PASS`, `PASV`)
    - 1. spins up random temporary TCP sockets to transfer actual file bytes
  - Anyone sniffing your local Wi-Fi with Wireshark can steal your passwords instantly

- 1. SFTP (SSH File Transfer Protocol)
  - System administration and securely managing Linux servers.
  - **The Port:** `22`
  - SFTP is a completely different animal.
  - SFTP is an extension of the **SSH protocol**.
  - It establishes a standard, secure Layer 6 encrypted SSH tunnel over Port 22 first.
  - it uses an inner subsystem command structure to let you visually browse directories and download files
  - It is highly secure
  - handles everything over a single port
  -

- 1. SMB (Server Message Block): Live stream
  - Sharing folders between Windows, Mac, and Linux locally.
  - **The Port:** `445`
  - SMB was originally created by Microsoft
  - Linux equivalent called **Samba**
  - SMB is a **Network File System protocol**.
  - It allows you to mount a remote folder as if it were a local drive.
  - it streams just the specific chunks of bytes your media player application requests in real time.
  - NAS (Network Attached Storage) systems
  - Windows and Linux machines share shared drives seamlessly

- 1. WebDAV (Web Distributed Authoring and Versioning)
  - Cloud storage synchronization services (like Nextcloud)
  - **The Port:** `80` or `443`
  - WebDAV is an extension of the **HTTP protocol**.
  - You know how normal HTTP only lets you do simple things like
    - `GET` an HTML page
    - `POST` a JSON form?
  - WebDAV adds brand new,
    - custom verbs directly to the Layer 7 HTTP specification
    - (verbs like `PROPFIND`, `MKCOL`, `COPY`, `MOVE`, and `LOCK`).
    - This allows a regular web server (like Nginx or Apache)
      - to function directly as a collaborative network storage drive.
  - It is incredibly fire-wall friendly
    - because it runs over standard web ports (`80`/`443`),
    - meaning it can pass through strict public Wi-Fi networks
    - where ports like 22 or 445 are completely blocked.
