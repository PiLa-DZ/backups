# Intermediary public cloud server

(like the ones run by Serveo, ngrok, or Localtunnel) to act as a bridge.

Port Forwarding

---

### 1. What is a "Secure Public URL"?

When you run Facechat locally, it is hosted on `http://localhost:3000`.
The word **localhost** is a private loopback address that only exists _inside_ your own computer.
Your friends' phones have no way of finding your specific laptop on the massive public internet using that.

A **Secure Public URL** (like `https://facechat-nabil.serveousercontent.com`)
is a globally accessible street address on the internet provided by the tunneling service.

- **Public:**
  It is live on the global grid,
  meaning any device—whether it's your friend's phone down the street
  or a browser across the world—can type it in and connect.

- **Secure (`https`):**
  The **`s`** means the connection is completely encrypted using SSL/TLS certificates.
  When your friends type text into Facechat,
  their messages are scrambled before traveling across the internet,
  protecting them from being read by anyone snooping on the network.

- **How it routes data:**
  When your friend visits that URL,
  they are actually sending a request to Serveo's public cloud server.
  Serveo looks at the incoming link header,
  recognizes that it belongs to your open terminal tunnel session,
  and pipes that traffic directly down to your local port `3000`.

---

### 2. What are `ngrok` and `localtunnel`?

`ngrok` and `localtunnel` are just alternative third-party software tools
that do the **exact same job** as the native `ssh` command you ran earlier.
Instead of relying purely on your built-in system SSH protocol,
they use their own custom-written code and backend cloud architectures to handle the bridge.

#### "available via the AUR" (for ngrok)

Since you are using **Arch Linux**, your official system package manager is `pacman`.
However, Arch has the **AUR (Arch User Repository)**,
which is a massive community-driven repository for software
that isn't included in the core system packages yet.

- To install `ngrok` from the AUR using an AUR helper like `yay`,
  you would just run: `yay -S ngrok`.

- Once installed, instead of an SSH string,
  you would start it by typing: `ngrok http 3000`.
  It opens a terminal panel layout and generates an `ngrok-free.app` URL for you.

#### "via npm" (for localtunnel)

`localtunnel` is an open-source project written entirely in JavaScript/Node.js.
Because it's a Node-based tool,
it is distributed and downloaded through **npm (Node Package Manager)**.

The command you highlighted:

```bash
npm install -g localtunnel

```

- **`npm install`**: Tells your Node environment to fetch the codebase package.

- **`-g` (Global Flag):**
  This is a key flag on Linux systems.
  Instead of downloading localtunnel inside your current project folder's `node_modules`,
  it installs it globally inside your system binaries path.
  This allows you to call the tool using the short command keyword `lt` from _any_ directory inside your terminal.

- Once installed globally, you can expose your port by just running: `lt --port 3000`.
