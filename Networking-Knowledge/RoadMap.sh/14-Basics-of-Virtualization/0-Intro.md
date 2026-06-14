# The Basics of Virtualisation

- The Virtualisation Stack (Type 1 vs. Type 2)
  - Type 1: Bare-Metal Virtualisation (Enterprise Data Centers / Cloud)
  - Type 2: Hosted Virtualisation (Local Development / Testing)
- Breaking Down the Components
  - The Hypervisor (The Master Traffic Controller)
  - Host Operating System (The Base Platform)
  - Virtual Machines (The Software-Defined Computers)
  - Guest Operating Systems (The Isolated Environments)

As a backend engineer,
virtualisation is the technology that powers your entire deployment ecosystem.
Whether you are spinning up an EC2 instance on AWS,
configuring a droplet on DigitalOcean,
or setting up isolated testing environments on your local Arch machine,
you are directly manipulating these four foundational components.

---

## The Virtualisation Stack (Type 1 vs. Type 2)

Virtualisation works by inserting an abstraction layer between
the actual physical silicon (CPU, RAM, Disks)
and the code trying to run on it.
Depending on _where_ that abstraction layer sits,
virtualisation is split into two completely different architectural models:

### Type 1: Bare-Metal Virtualisation (Enterprise Data Centers / Cloud)

In a Type 1 architecture,
there is **no Host Operating System**.
The hypervisor is a tiny, ultra-optimized,
high-security piece of software installed directly onto the bare metal of the physical server.

```text
+-------------------------------------------------------+
|  [ GuestOS: Arch ]   [ GuestOS: Ubuntu ]   [ GuestOS ]| <-- Virtual Machines
|  |(App: Express) |   | (App: MariaDB)  |   | (App)   ||
+──┴──────┬────────┴───┴────────┬────────┴───┴───┬─────┴+
          ▼                     ▼                ▼
+───────────────────────────────────────────────────────+
|               TYPE 1 HYPERVISOR (Bare-Metal)          | <-- Talk directly to hardware
|               (Examples: ESXi, Proxmox, KVM)          |
+───────────────────────────────────────────────────────+
|               PHYSICAL HARDWARE (CPU/RAM/SSD)         |
+-------------------------------------------------------+

```

### Type 2: Hosted Virtualisation (Local Development / Testing)

In a Type 2 architecture,
you boot up your physical machine into a standard operating system first.
The hypervisor runs purely as an **application** inside that operating system,
just like your browser or code editor.

```text
+-------------------------------------------------------+
|  [ GuestOS: Ubuntu ]          [ GuestOS: Windows ]    | <-- Virtual Machines
+───────────┬─────────────────────────────┬─────────────+
            ▼                             ▼
+───────────────────────────────────────────────────────+
|               TYPE 2 HYPERVISOR (Hosted)              | <-- Runs as a standard app
|               (Examples: VirtualBox, VMware Workstation)|
+───────────────────────────────────────────────────────+
|               HOST OPERATING SYSTEM (HostOS)          | <-- The base platform
|               (Example: Your local Arch Linux)        |
+───────────────────────────────────────────────────────+
|               PHYSICAL HARDWARE (CPU/RAM/SSD)         |
+-------------------------------------------------------+

```

---

## Breaking Down the Components

### 1. The Hypervisor (The Master Traffic Controller)

The **Hypervisor** (or Virtual Machine Monitor)
is the core engine of this entire setup.
Its primary job is **Hardware Abstraction and Resource Allocation**.

- When a virtual environment thinks it is writing data to a physical hard drive
  or sending a packet out of a physical network card,
  the hypervisor intercepts those instructions.

- It maps those requests to a slice of your _actual_ physical SSD or network interface card.
  It acts like a strict referee, ensuring that VM #1 can never look inside the RAM
  allocated to VM #2, establishing total cryptographic and operational isolation.

### 2. Host Operating System (The Base Platform)

The **HostOS** only exists in **Type 2 (Hosted)** virtualisation.
It is the operating system installed directly onto the bare metal
of your personal computer or workstation.

- It holds the primary drivers for your motherboard, graphics card, and peripherals.

- When you run a Type 2 hypervisor (like VirtualBox),
  the HostOS treats it like any other process,
  slicing out a piece of system memory and handing it
  to the hypervisor application to play with.

### 3. Virtual Machines (The Software-Defined Computers)

A **Virtual Machine (VM)**
is a complete, self-contained emulation of a physical computer,
entirely constructed out of software configurations.

- To the outside world,
  a VM has its own virtual BIOS, virtual motherboard, virtual hard drive partitions,
  and virtual network interface cards (NICs).

- It is completely unaware that it doesn't actually exist on real physical silicon;
  it behaves exactly as if it were a standalone server box sitting inside a rack.

### 4. Guest Operating Systems (The Isolated Environments)

The **GuestOS** is the operating system that you choose to install _inside_ the virtual machine box.
Because of the hypervisor’s total isolation guarantees,
the GuestOS can be entirely different from the HostOS.

- You can run a HostOS of Arch Linux on your main laptop,
  but boot up a GuestOS of Ubuntu Server inside a VM to mimic
  your company's production environment exactly.

- If a GuestOS completely crashes,
  panics its kernel, or gets infected with malware during a security test,
  the damage is completely contained inside that specific virtual machine container.
  Your primary HostOS and physical hardware remain completely untouched and safe.

---

## Architectural Comparison Matrix

| Component           | Where It Sits                                           | Primary Function                                                                | Real-World Analogy                                                       |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Hypervisor**      | Directly on hardware (Type 1) or inside HostOS (Type 2) | Intercepts machine code, allocates resources, and enforces VM isolation.        | The building manager who assigns apartment keys and controls utilities.  |
| **HostOS**          | Directly on bare metal (Type 2 only)                    | Manages base physical hardware and runs standard user software.                 | The foundational plot of land and infrastructure supporting a structure. |
| **Virtual Machine** | On top of the Hypervisor layer                          | Provides a completely simulated, software-defined hardware box.                 | A single apartment unit mapped out within a larger high-rise complex.    |
| **GuestOS**         | Inside the designated VM                                | Runs application software and handles operations within the isolated container. | The tenant living inside the apartment, running their own private setup. |
