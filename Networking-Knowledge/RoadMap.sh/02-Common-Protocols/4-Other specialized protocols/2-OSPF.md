# OSPF `Open Shortest Path First`

OSPF is a dynamic link-state routing protocol for IP networks.
It works with IP to send packets to their destinations.
IP aims to send packets on the quickest route possible,
which OSPF is designed to accomplish.
OSPF opens the shortest, or fastest, path first for packets.
It also updates routing tables --
a set of rules that control where packets travel --
and alerts routers of changes to the routing table or network when a change occurs.

OSPF is similar to and supports `Routing Information Protocol (RIP)`,
which directs traffic based on the number of hops
it must take along a route,
and it has also replaced RIP in many networks.
OSPF was developed as a streamlined and scalable alternative to RIP.
For example, RIP sends updated routing tables out every 30 seconds,
while OSPF sends updates only when necessary
and makes updates to the particular part of the table where the change occurred.
Also, OSPF typically uses more sophisticated metrics,
such as bandwidth,
delay and link cost,
rather than hop counts to choose the best paths.
