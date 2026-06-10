This is exactly the right question to ask. Getting the shell is fun, but understanding _why_ you had to type those exact words is where the real engineering knowledge lies.

Let's break down the mechanics of the FTP protocol and why the text looks the way it does.

---

## 1. What is FTP and Why Do We Use It?

**FTP** stands for **File Transfer Protocol**. It was invented in 1971 (before the web or HTTP even existed) for one specific purpose: **moving files from one computer to another over a network.**

### When do people use it?

- **Historically:** Web developers used FTP to upload their website files (`index.html`, images) from their home computers up to a remote web server.
- **Today:** Standard FTP is mostly deprecated because it's completely unencrypted. It has been replaced by secure versions like **SFTP** (FTP wrapped inside the secure SSH protocol). However, many old systems, routers, and internal corporate backups still use it to move heavy logs or database backups around automatically.

---

## 2. Why did we write `USER` and `PASS` like that?

You wrote those commands because you were talking **directly to the Layer 7 Application Protocol** without a middleman.

Every protocol has a strict grammar document (called an **RFC** specification). The official rulebook for FTP (RFC 959) states that when a client connects, the exchange _must_ follow a rigid line-by-line text structure.

Here is what a normal, legitimate FTP conversation looks like under the hood:

```text
[Server listens on Port 21]
Client connects ->
Server responds:    220 Welcome to my FTP Server!
Client sends:       USER nabil
Server responds:    331 Please specify the password.
Client sends:       PASS mysecretpassword
Server responds:    230 Login successful.
Client sends:       SYST
Server responds:    215 UNIX Type: L8
Client sends:       QUIT
Server responds:    221 Goodbye.

```

### Is it always supposed to look like this?

**Yes, for standard FTP, absolutely.** Every single FTP server software on earth—whether it's running on Arch Linux, Windows Server, a smart fridge, or an enterprise mainframe—must parse these exact strings (`USER`, `PASS`, `QUIT`) followed by a Carriage Return and Newline (`\r\n`). If a software developer wrote an FTP program that expected `LOGIN nabil` instead of `USER nabil`, no standard FTP client in the world would be able to talk to it.

---

## 3. How normal software abstracts this away from humans

When you use a graphical program like **FileZilla**, or when you type an FTP URL into a browser, you don't see these commands because the software hides them from you.

When you fill out a form in a user interface:

- **Host:** `192.168.0.167`
- **Username:** `nabil`
- **Password:** `blabla`

The software takes those inputs, opens a raw TCP socket to Port 21 behind the scenes, and automatically generates the text string: `USER nabil\r\n` and `PASS blabla\r\n`.

By using `nc`, you bypassed the user interface and typed the raw protocol grammar directly into the socket yourself.

---

## 4. Why the Backdoor Worked on our Network

Look at the server response in your screenshot right after you typed `USER nabil:)`:

```text
331 Please specify the password.

```

The application parsed your username, saw the `:)`, and immediately executed the malicious `fork()` code in the background to open Port 6200.

But notice that it _still_ sent back the standard code `331 Please specify the password.` back to your netcat window! The attacker wrote the backdoor loop so that it would silently execute while still acting like a perfectly normal FTP server on the surface, allowing it to hide in plain sight until someone performed a port scan.

Does seeing how the official protocol structure works make it clear why your manual inputs were parsed successfully by the target?
