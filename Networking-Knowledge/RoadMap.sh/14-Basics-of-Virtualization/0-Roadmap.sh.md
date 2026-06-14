# Basics of Virtualisation

## Hypervisor

A hypervisor, also known as a virtual machine monitor (VMM), is software or firmware that enables the creation and management of virtual machines (VMs) by abstracting the underlying hardware. It allows multiple VMs to run on a single physical machine, each operating independently with its own operating system and applications. Hypervisors facilitate better resource utilization by allowing a physical server to host several virtual environments, optimizing hardware efficiency.

## Guest Operating Systems

A Guest Operating System (GuestOS) is an operating system installed within a virtual machine. Think of it as an operating system running inside another operating system (the host). This allows you to run multiple operating systems on a single physical machine, each isolated from the others. This isolation provides a contained environment for software, allowing for testing, development, and running applications in different environments simultaneously.

## Host Operating System

A Host Operating System (HostOS) is the operating system installed directly onto the physical hardware of a computer. It manages the hardware resources, such as the CPU, memory, storage, and network interfaces, and provides a platform for running other operating systems within virtual machines. Think of it as the foundation upon which virtualized environments are built.

## Virtual Machines

A virtual machine (VM) is essentially a software-defined computer that runs on top of a physical computer. It emulates the hardware of a physical machine, allowing you to run an operating system and applications within a simulated environment. This allows multiple operating systems to run concurrently on a single physical server, sharing its resources.
