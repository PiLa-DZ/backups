# The Executive View

| Category            | Typical Protocols   | Key Characteristic                                                           |
| ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| **File Systems**    | SFTP, SMB, NFS, FTP | Manages remote disks; downloads/uploads distinct assets.                     |
| **Web Transport**   | HTTP, WebDAV        | Bypasses firewalls; leverages standard REST patterns.                        |
| **Media Streaming** | HLS, RTMP, WebRTC   | Focuses on speed and low latency; slices data into live chunks.              |
| **Data Pipelines**  | Kafka, DB Protocols | Moves continuous, structured text/binary records rather than physical files. |

---

## 1. Storage-Focused & File System Protocols (Moving Whole Files)

These protocols are designed specifically to look at a remote storage disk,
browse folders, and move binary objects from one hard drive to another.

- **FTP (File Transfer Protocol):**  
   Old, dual-channel, cleartext protocol (Port 21).

- **FTPS (FTP over TLS):**  
   The same dual-channel FTP logic,  
   but wrapped in TLS encryption for security.

- **SFTP (SSH File Transfer Protocol):**
  A modern subsystem of **SSH** (Port 22) that performs all file management
  inside a single, highly secure cryptographic tunnel.

- **SCP (Secure Copy Protocol):**
  An older, simpler file-copying protocol also built on top of SSH.
  Unlike SFTP, it can only copy files and cannot dynamically list or manage directories.

- **SMB / CIFS (Server Message Block):**
  The standard network file-sharing protocol for Windows and Samba/Linux (Port 445).
  It allows machines to mount folders locally and read/write byte ranges of files on the fly.

- **NFS (Network File System):**
  The traditional, high-performance Linux-to-Linux equivalent of SMB.
  It lets multiple Linux servers share storage volumes across a data center seamlessly.

---

## 2. Web & Object-Based Protocols (Universal API Movements)

These protocols leverage web servers to transfer files
and data payloads across standard web firewalls.

- **HTTP / HTTPS:**
  The king of data movement.
  Moves everything from HTML pages to multi-gigabyte `.zip` blobs
  using `GET`, `POST`, and `PUT` methods over ports 80/443.

- **WebDAV:**
  The extension of HTTP that introduces file system-like verbs (`MKCOL`, `MOVE`, `LOCK`)
  to turn a standard web engine into an administrative network drive.

---

## 3. Real-Time Media & Asset Streaming Protocols

They are optimized to slice multimedia data into tiny,
highly synchronized packet chunks that stream continuously over the wire.

- **RTP (Real-time Transport Protocol):**
  The core foundation for real-time video and audio data movement.
  It handles the sequencing and synchronization numbers needed
  to ensure packets display in the correct order.

- **RTMP (Real-Time Messaging Protocol):**
  Originally built by Adobe for Flash,
  it is still heavily used behind the scenes by streaming software
  like OBS to push your live desktop/camera feed up to servers like Twitch or YouTube.

- **HLS (HTTP Live Streaming):**
  Developed by Apple, this completely changed video streaming.
  Instead of running custom ports,
  it chops video into small `.ts` file segments and feeds them over standard
  **HTTP/HTTPS** so your phone or web browser can smoothly adjust video
  quality on the fly based on your Wi-Fi speed.

- **WebRTC:**
  A specialized, peer-to-peer framework designed for zero-latency video/audio streams
  (like Discord voice channels or Zoom calls).
  It often maps directly down to UDP to keep lag as low as possible.

---

## 4. Database & Continuous Data Pipelines

When you aren't moving complete physical files,
but instead pushing structural application data, logs,
or database rows around, you use specialized pipeline protocols.

- **Kafka Protocol:**
  A highly complex TCP protocol built specifically for
  streaming millions of real-time application event logs per second across cloud backends.

- **Database Native Protocols:**
  Every major database invents its own Layer 7 protocol layer
  to stream data rows back to your backend.
  For instance, MariaDB/MySQL uses a custom binary stream protocol over Port 3306
  to process your query requests and return raw row structures.
