```bash
# NOTE: Terminal 1
~ ssh nabil@192.168.0.199
nabil@192.168.0.199's password:
~ cd Desktop/backups/Networking-Knowledge/Try/FTP/FTP-Server
~/Desktop/backups/Networking-Knowledge/Try/FTP/FTP-Server (main ✔) node ftp-server.js
🚀 Custom FTP Protocol Server running on port 2121...
📡 New client connected from: ::ffff:192.168.0.108
[Client Command]: USER nabil
[Client Command]: PASS archlinux
[Client Command]: SYST
[Client Command]: PWD
[Client Command]: QUIT
🔌 Client disconnected.

```

```bash
# NOTE: Terminal 2
~ ftp -p 192.168.0.199 2121

Connected to 192.168.0.199.
220 Welcome to Nabil's Custom JS FTP Server
Name (192.168.0.199:nabil): nabil
331 User name okay, need password.
Password:
230 User logged in, proceed.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> pwd
257 "/" is the current directory.
ftp> quit
221 Goodbye.
~
```
