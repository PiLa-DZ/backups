# Part 1: How the Browser Can Send Data to the Server (3 Classic Ways)

Before we had JavaScript APIs to send data in the background,
the browser only had **three built-in mechanisms** to send data to a server.
Every single one of these actions required a **full page reload or a page navigation**.

---

## 1. Form Submissions (`<form>`) — The Standard Way

This is the most common classic method.
You define an HTML form, and the browser handles the packaging of the data entirely.

- **How it sends data:**
  You use inputs (`<input name="username">`).
  When the user clicks a submit button,
  the browser gathers all the inputs,
  looks at the form's `action` attribute (the URL)
  and its `method` (usually `GET` or `POST`),
  and sends it.

- **The Content-Type:**
  It defaults to sending the data formatted as `application/x-www-form-urlencoded`
  (which looks like `username=nabil&age=25`)
  or `multipart/form-data` if you are uploading files.

- **Result:**
  The browser freezes, sends the data,
  and waits to completely load a brand-new HTML page sent back by the server.

---

## 2. URL Query Parameters (Links & Navigation) — The Explicit Way

This is when data is explicitly appended to the address bar
or an anchor tag (`<a href="...">`).

- **How it sends data:**
  Directly inside the URL path using a question mark,
  followed by key-value pairs separated by ampersands:
  `http://localhost:3000/search?item=shoes&color=black`.

- **Result:**
  When clicked, the browser sends a standard HTTP `GET` request,
  transmitting that raw text string in the URL header directly to the server.

---

## 3. Browser HTTP Headers (Cookies & Metadata) — The Automatic Way

Every single time a browser talks to a server,
it automatically sends a bundle of key-value pairs called **Headers**.

- **How it sends data:**
  You don't have to write code for this.
  The browser automatically attaches headers like the `User-Agent`
  (the device fingerprint you used for hijacking defense!), `Accept-Language`,
  and crucially, any stored **Cookies** matching that domain.

- **Result:**
  The server reads these headers on every single incoming request
  to know who you are (via the session cookie) and what browser engine you are using.
