# BGP `Border Gateway Protocol`

BGP makes the internet work.
This routing protocol helps with the exchange of routing information
between different autonomous systems.
An `AS` is a group of IP networks or prefixes under
the control of a single administrative entity with a defined routing policy.
This entity could be a large organization, ISP, university or government agency.

As data travels across the internet,
it must pass through multiple `ASes`
to reach its destination.
Within an AS, routers use `BGP` to advertise the active networks
they manage to their neighboring routers.
These neighbors then exchange routing information,
learning about local networks within the same `AS`
and networks reachable through external `ASes` as sessions
are established between edge routers of different `ASes`.

Information exchange within the same `AS` is handled through Internal `BGP`,
or `iBGP`, while information exchange between external `ASes`
is managed using External `BGP`, or `eBGP`.
As routers are added or removed within networks,
`BGP` dynamically propagates route changes,
announcing additions and removals to its neighbors to maintain up-to-date routing tables.

To select the most efficient route for data to travel across `ASes`,
`BGP` evaluates various attributes,
such as the `AS` path length and policy preferences.
While `BGP` is best known for routing traffic across the internet between `ASes`,
it's also used within large,
complex data center networks to advertise network reachability
and ensure efficient traffic routing.
