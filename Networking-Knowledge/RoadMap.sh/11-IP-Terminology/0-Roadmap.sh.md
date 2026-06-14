# IP Terminology

## Subnetting Fundamentals

Subnetting is the practice of dividing a network into two or more smaller, logically isolated networks, called subnets. This is accomplished by manipulating the subnet mask, which defines the range of IP addresses that belong to a particular network. By carving up a larger network address space, you can improve network performance, security, and manageability by limiting broadcast domains and isolating traffic.

## Public vs Private IP Addresses

Public addresses are IP addresses assigned to devices directly accessible over the internet, allowing them to communicate with external networks and services. In contrast, private addresses are used within local networks and are not routable over the Internet, providing a way for devices within a private network to communicate with each other while conserving public IP address space. Public addresses are unique across the internet, whereas private addresses are reused across different local networks and are typically managed by network address translation (NAT) to interface with public networks.

## Localhost

Localhost is a hostname that refers to the current computer being used to access it. It's essentially a way for your computer to communicate with itself over a network connection. Typically, it resolves to the IP address 127.0.0.1, which is reserved for loopback addresses. This allows programs and services running on your machine to interact with each other without needing to connect to an external network.

## Loopback

A loopback is a mechanism where network traffic is routed back to the originating device. It's essentially a shortcut for a device to talk to itself over a network. This is achieved using a special IP address (typically 127.0.0.1 for IPv4 or ::1 for IPv6) and a designated network interface (the loopback interface). The data never actually leaves the host, instead being internally redirected.

## CIDR

CIDR (Classless Inter-Domain Routing) is a method for allocating IP addresses and routing Internet Protocol packets. It replaces the older classful network addressing scheme. CIDR uses variable-length subnet masking (VLSM) to create subnets of different sizes, offering greater flexibility in address allocation and reducing address wastage compared to the rigid class-based system. It's represented using an IP address followed by a slash and a number (e.g., 192.168.1.0/24), where the number indicates the number of bits used for the network prefix.

## subnet mask

A subnet mask is a 32-bit number used in IP networking to divide an IP address into network and host portions. It determines which part of an IP address refers to the network and which part refers to the host. Subnet masks enable network administrators to create subnetworks, improving network efficiency and security by controlling traffic flow between subnets. Common subnet masks include 255.255.255.0 (for a /24 network) and 255.255.0.0 (for a /16 network). Subnetting helps in efficient IP address allocation, reduces broadcast traffic, and enhances network performance. Understanding subnet masks is crucial for network configuration, troubleshooting, and implementing effective network segmentation strategies.

## default gateway

A default gateway is a network node, typically a router or a firewall, that serves as the access point or intermediary between a local network and external networks, such as the internet. When a device on a local network needs to communicate with a device outside its own subnet—such as accessing a website or sending an email—it sends the data to the default gateway, which then routes it to the appropriate external destination. The default gateway acts as a traffic director, ensuring that data packets are correctly forwarded between the internal network and external networks, making it a crucial component for enabling communication beyond the local network's boundaries.
