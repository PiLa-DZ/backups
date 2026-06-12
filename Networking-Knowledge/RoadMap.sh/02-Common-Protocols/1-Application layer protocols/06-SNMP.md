# SNMP `Simple Network Management Protocol`

SNMP is a network management protocol
that helps network admins manage and monitor network devices,
such as routers, switches, printers and firewalls.
It gathers device information to monitor network performance and health.
Network administrators often use SNMP to detect and troubleshoot network issues.

- SNMP uses a manager-agent model and the following components:
  - SNMP manager.
    This is the central system that communicates with the agents
    and requests or updates information.
  - SNMP agent.
    This is a software component installed on devices such as routers and switches
    and sends information to the manager.
  - Management information base.
    The MIB acts as a database and contains device information.

Here is how SNMP works:

1. Manager request.
   The SNMP manager sends a request using the SNMP protocol to an SNMP agent on a device.
   The request includes information, such as CPU use and interface status.

1. Agent response.
   The SNMP agent retrieves the requested information from the MIB
   and sends it back to the manager in an SNMP response.

1. Manager action.
   The manager is now able to display the information,
   log it or use it to trigger an action.
   For example, it can send an alert or change a configuration.

Since SNMP is a standardized protocol,
it's compatible with devices from different vendors.
