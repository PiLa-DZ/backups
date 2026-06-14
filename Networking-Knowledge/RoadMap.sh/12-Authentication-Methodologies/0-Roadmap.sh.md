# Authentication Methodologies

## Certificates

Certificates, also known as digital certificates or SSL/TLS certificates, are electronic documents used to establish trust and secure communication over networks. They function like digital IDs, verifying the identity of websites, servers, individuals, or devices. These certificates contain information about the entity they represent, a digital signature from a trusted Certificate Authority (CA), and the entity's public key, which is used for encryption and secure data exchange.

## Local Authentication

Local authentication is the process of verifying a user's identity directly against a database or security mechanism housed on the same system or network they are trying to access. This typically involves checking credentials, like usernames and passwords, against locally stored information to grant or deny access to resources. It contrasts with methods that rely on external authentication servers or services.

## Kerberos

Kerberos is a network authentication protocol designed to provide strong authentication for client/server applications. It was developed by MIT in the 1980s and is named after the three-headed dog from Greek mythology that guarded the gates of Hades, symbolizing the protocol's aim to provide secure authentication in a potentially hostile network environment.

## RADIUS

Remote Authentication Dial-In User Service (RADIUS) is a network protocol that provides centralized Authentication, Authorization, and Accounting (AAA) management for users who connect to and use a network service. It is commonly used for managing access to network resources such as VPNs, Wi-Fi, and dial-up services. RADIUS servers validate user credentials, enforce access policies, and log user activities. It operates over UDP ports 1812 (authentication) and 1813 (accounting), and supports encryption for securely transmitting user credentials and data.

## LDAP

LDAP (Lightweight Directory Access Protocol) is a software protocol for enabling anyone to locate data about organizations, individuals, and other resources, such as files and devices on a network. It is a "directory service" that structures information in a hierarchical, tree-like structure, allowing for efficient searching and retrieval of information. Think of it like a phone book for networks, but instead of just names and numbers, it can store a wide range of information about network users and resources.

## Single Sign-On (SSO)

Single Sign-On (SSO) lets a user access multiple applications and websites with just one set of credentials. Instead of needing to remember and enter different usernames and passwords for each service, a user authenticates once, and that authentication is then shared securely across various interconnected systems. This streamlines the login process and improves user experience.
