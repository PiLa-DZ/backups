# Part 2: How the Server Can Send Data to the Browser (2 Classic Ways)

Historically, servers were strictly reactive.
They could **never initiate** a conversation;
they could only send data back _after_ the browser requested it.

---

## 1. Raw Files / Documents (The Universal Way)

This is what built the web.
The server responds to a request by sending raw file streams
along with an HTTP status code (like `200 OK`)
and a header telling the browser what kind of file it is (`Content-Type`).

- **HTML Documents (`text/html`):**
  The server renders or pulls an HTML file,
  and the browser reads the text code to draw your UI box layouts and text.

- **Static Assets (`image/png`, `text/css`, `application/javascript`):**
  When the browser parses the HTML and sees `<img src="avatar.png">` or `<script src="app.js">`,
  it automatically fires _new_ background requests,
  and the server sends those raw files back.

---

## 2. HTTP Redirect Instructions (The Control Way)

Sometimes the server doesn't want to show you a page;
it wants to tell your browser to go somewhere else.

- **How it works:**
  The server sends back a specific HTTP redirect status code
  (like `302 Found` or `301 Moved Permanently`)
  along with a `Location` header specifying a new URL (e.g., `Location: /login`).

- **Result:**
  The browser reads this status code, automatically changes the URL in your address bar,
  and immediately triggers a brand-new request to that new destination.
