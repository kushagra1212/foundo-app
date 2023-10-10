require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
function getLocalIpAddress() {
  try {
    if (os.platform() === 'win32') {
      // For Windows
      const ipAddress = execSync('ipconfig | findstr /i "IPv4"').toString();
      const match = ipAddress.match(/\d+\.\d+\.\d+\.\d+/);
      if (match) {
        return match[match.length - 3];
      }
    } else {
      // For Linux
      let ipAddress = execSync(
        `ip -4 addr show | grep -oP '(?<=inet\\s)\\d+(\\.\\d+){3}'`,
      ).toString();
      ipAddress = ipAddress.trim();
      const ipAddressArray = ipAddress.split('\n');

      if (ipAddressArray && ipAddressArray.length > 0) {
        return ipAddressArray[4];
      }
    }
  } catch (error) {
    console.error('Error getting local IP address:', error.message);
  }
  return null;
}

const localIpAddress = getLocalIpAddress();

if (localIpAddress) {
  const BASE_URL = `http://${localIpAddress}:${process.env.LOCAL_SERVER_PORT}`;
  const SOCKET_URL = `http://${localIpAddress}:${process.env.LOCAL_CHAT_SOCKET_PORT}`;

  console.log(`Setting BASE_URL=${BASE_URL}`);

  // Read the existing .env file
  const envFileContent = fs.readFileSync('.env', 'utf8');

  // Update the values for LOCAL_SERVER_PORT and LOCAL_CHAT_SOCKET_PORT
  const updatedEnvContent = envFileContent.replace(
    /^BASE_URL=.*/m,
    `BASE_URL=${BASE_URL}`,
  );

  // Write the updated content back to the .env file
  fs.writeFileSync('.env', updatedEnvContent, 'utf8');

  process.exit(); // Exit the script
} else {
  console.error('Failed to retrieve the local IP address.');
}
