# Common Virtualisation Technologies

## VMWare

VMWare is a suite of virtualization software that allows you to run multiple operating systems on a single physical machine. This is achieved by creating virtual machines (VMs), which are essentially software-defined computers that emulate the hardware of a physical machine. Each VM can run its own operating system and applications, isolated from other VMs on the same physical host. VMWare offers different products for different needs, ranging from desktop virtualization to enterprise-level cloud computing.

## VirtualBox

VirtualBox is a free, open-source virtualization software developed by Oracle. It allows users to run multiple operating systems simultaneously on a single physical machine. VirtualBox supports a wide range of guest operating systems, including various versions of Windows, Linux, macOS, and more. It provides features like snapshots for easy system state preservation, shared folders for file exchange between host and guest systems, and USB device support. VirtualBox is popular among developers, IT professionals, and enthusiasts for testing software, running legacy applications, and experimenting with different operating systems without the need for separate physical hardware.

## ESXi

VMware ESXi is a Type 1 hypervisor and the core building block for VMware's virtualization technology. It represents a bare-metal hypervisor, which means it is installed directly onto your physical server's hardware, without the need for a supporting operating system. This results in elevated performance, reduced overhead, and efficient resource allocation.

## proxmox

Proxmox is an open-source virtualization management platform that integrates both Proxmox Virtual Environment (Proxmox VE) and Proxmox Mail Gateway. Proxmox VE combines virtualization technologies, including KVM for virtual machines and LXC for lightweight containers, into a unified web-based interface for managing and deploying virtualized environments. It offers features such as high availability, storage management, and backup solutions. Proxmox Mail Gateway provides email security and anti-spam solutions, protecting email systems from threats. Proxmox is valued for its flexibility, cost-effectiveness, and comprehensive management capabilities.
