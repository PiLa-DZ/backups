# Part 2: How many data formats do we have?

When data travels across these channels,
it must be flattened into a string or a stream of bytes.
To tell the server what format you are sending,
the browser puts a label in the HTTP header called the **Content-Type** (also known as a **MIME Type**).

While there are hundreds of media types for files,
there are only **four main data payload formats**
used for interactive data transfer:

[Image displaying comparison of payload string structures: JSON object vs XML tags vs Form-URLEncoded query pairs]

---

## 1. JSON (`application/json`) — The Champion

- **What it looks like:** `{"userId": 123, "name": "Nabil"}`

- **Why it won:**
  It maps directly to native JavaScript objects.
  It is incredibly lightweight,
  easy for humans to read,
  and lightning-fast for computers to parse.

---

## 2. Form URL-Encoded (`application/x-www-form-urlencoded`)

- **What it looks like:** `userId=123&name=Nabil`

- **Why it's used:**
  This is the format browsers naturally use for classic `<form>` submissions.
  Even with `fetch()`,
  you still use this if you are sending authentication credentials directly to an OAuth server endpoint.

---

#### 3. Multipart Form Data (`multipart/form-data`)

- **What it looks like:** A raw body separated by random string boundaries:

```text
--boundary123
Content-Disposition: form-data; name="name"
Nabil
--boundary123
Content-Disposition: form-data; name="avatar"; filename="me.png"
[RAW BINARY IMAGE DATA]

```

- **Why it's used:** **Crucial for uploading files.**
  If your request contains strings _plus_ an actual image, video, or PDF file,
  you must use this format so your Express backend (using middleware like `multer`)
  can split out the files from the text fields.

---

#### 4. XML (`application/xml` or `text/xml`) — The Ancestor

- **What it looks like:** `<user><id>123</id><name>Nabil</name></user>`

- **Why it's rare now:**
  It requires heavy tags opening and closing for every single field,
  which wastes massive network bandwidth compared to JSON.
  This is what SOAP APIs strictly rely on.
