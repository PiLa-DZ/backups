# SMTP `Simple Mail Transfer Protocol`

SMTP -- the most widely used email protocol --
is part of the TCP/IP suite and controls how email clients send users' email messages.
Email servers use SMTP to send email messages from the client to the email server
to the receiving email server. However,

SMTP doesn't control how email clients receive messages --
just how clients send messages. Essentially,
it's just a mail delivery protocol
and not used for retrieval of messages.

That said, SMTP requires other protocols to ensure email messages are sent and received properly.
It can work with Post Office Protocol 3 or `Internet Message Access Protocol`,
both of which control how an email server receives email messages.
