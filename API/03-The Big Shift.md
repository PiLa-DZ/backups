# The Big Shift: Why We Invented APIs Later

In this classic model,
if a user liked a post or wanted to see their updated profile photo,
the browser had to drop the entire current page state, clear the screen,
send a request,
and wait for the server to send an entirely new HTML file back to re-render.

Later on, developers realized:
_What if JavaScript could secretly send the request in the background,
get just the raw data (JSON), and update a single tiny piece of the HTML screen
without reloading the page?_

That breakthrough is exactly what gave birth to **REST APIs** and modern web applications!
