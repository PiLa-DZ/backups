# The Metasploitable 2 Target List

- Port
- Service (Layer 7 Protocol)
- The Underlying Security Vulnerability

- **21**
- FTP (`vsftpd 2.3.4`)
- **Built-in Malicious Backdoor:** Sending a specific text smiley face allows instant root shell access.

- **22**
- SSH (`OpenSSH 4.7p1`)
- **Weak Credentials & Key Sniffing:** Predictable default keys allow unauthorized command-line access.

- **23**
- Telnet
- **Insecure Protocol:** Sends usernames and passwords in raw unencrypted plain text over the wire.

- **25**
- SMTP (Postfix mail)
- **User Enumeration:** Protocol features are left open, allowing hackers to map out every username on the OS.

- **53**
- DNS (`BIND 9.4.2`)
- **Remote Cache Poisoning / Execution:** Flaws in how it handles memory queries allow denial of service or hijacking.

- **80**
- HTTP (Apache web server)
- **Insecure Web Apps:** Hosts Mutillidae and DVWA, packed with SQL Injections and Cross-Site Scripting (XSS).

- **139/445**
- Samba (SMB)
- **Remote Code Execution (RCE):** Flaws in file-sharing structures let attackers run raw terminal commands without logging in.

- **1099**
- Java RMI Registry
- **Unauthenticated Remote Execution:** Java's infrastructure allows anyone to pass serialized code objects to be executed blindly.

- **3306**
- MySQL Database
- **Misconfiguration / Weak Authentication:** The root database account is wide open with an empty password.

- **5432**
- PostgreSQL Database
- **Default Credentials:** The database server allows direct access via known default login pairs (`postgres`/`postgres`).

- **6667**
- IRC (`UnrealIRCD`)
- **Trojaned Source Code Backdoor:** Sending the magic string `AB` triggers a hidden command execution block.

- **8180**
- Apache Tomcat
- **Default Manager Console:** The administration dashboard uses simple default credentials (`tomcat`/`tomcat`), allowing war file uploads.

---

## Where Do We Start?

Every single one of these exploits
is a direct violation of secure programming,
safe systems configuration,
or protocol design patterns.

Let's pick **Vulnerability #1:
Port 21 - `vsftpd 2.3.4` Backdoor** to break down first.

### The Port 21 FTP Backdoor Mechanism

In 2011, a malicious attacker managed to hack into the official download server for `vsftpd`
(a highly popular FTP application program for Linux)
and modified the source code secretly before anyone noticed.
They introduced a hidden "backdoor".

When Metasploitable 2 runs this exact infected program,
it listens for connections on Port 21.

According to the Layer 7 FTP rules,
the client must send a username string like this:

```text
USER nabil
```

However, the hacker wrote a hidden conditional statement into the C code of the program.
It says: _If the incoming username string ends with a smiley face **`:)`**,
trigger a secret background loop._

If you type:

```text
USER nabil:)
```

The application checks your input,
sees the `:)`,
and executes a system command in the background
that spawns a raw Linux shell (`/bin/sh`)
listening on a completely brand new port: **Port 6200**.

At that point,
Metasploit (or you using raw `nc`) simply opens a connection to Port 6200,
and you are logged into the machine directly as the root administrator.
