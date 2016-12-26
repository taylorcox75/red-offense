# Team-Red: Hack Arizona 2017 Offensive

## **General Parrot Drone Information:**
----------
<details>
<summary>To Connect the Drone to a SSID:</summary>
1. Connect to the default ar-drone wifi network on a computer
2. Open terminal (mac/ubuntu) or [cygwin](https://cygwin.com/install.html) (windows)

    
    telnet 192.168.1.1
    cd bin
    vi wifi_setup.sh
    
    
3. Add the below code snippet anywhere in that file, but:
  1. Replace MyNetwork with your Wi-Fi network's name
  2. Replace 192.168.2.7 with a static IP on that network.
  
   ```
   killall udhcpd; iwconfig ath0 mode managed essid MyNetwork; ifconfig ath0 192.168.2.7 netmask 255.255.255.0 up;
   ```

4. Reboot the drone, connect your computer to the Wi-Fi network you specified above.

5. Ping $ip.address and you should get a response!

</details>
----------
<details>
<summary>Sending/Receiving Commands and Video</summary>

Notes: 

1. Have [node.js](https://nodejs.org/en/) installed.  
2. Will work with any UNIX based terminal (Used a Mac for these steps).

Control + Camera
1. Open terminal and navigate to the examples/ folder of this repository
    npm install
  1. The npm package dependencies should download to node_modules (Roughly 29 MB).
2. Open server.js and on line 13 you should see:
    
    `drone.listen(server, {ip: "192.168.2.7"});`
    
  1. **If** The IP was set to a static one in the above SSID example **Then:** Change it to that same address. 
  2. **Else:** Change the line to simply:
   
   `drone.listen(server);`
   
3. Connect to the same network the drone is on.
4. To Run Camera+Basic Flight Controls (see control key map below)
   
   `node server.js`
   
5. To View Camera in Web-Browser on Current Machine
   
   `localhost:5555`

----------
<details>
<summary>Flight Controls</summary>

From server.js terminal window:

**Space Bar:** Takeoff/Land

**W:** Up

**S:** Down

**A:** Left Rotation

**D:** Right Rotation

**Arrow Keys:** Direction of Travel

**O:** Left Flip

**P:** Right Flip

**X:** STOP AND HOVER *useful for out of control drones*
</details>
</details>
----------
<details>
<summary>Standalone Camera Access</summary>

*99% similar setup as above*

1. Open terminal and navigate to the examples/folder of this repository
    
    `npm install`
    
  1. The npm package dependencies should download to node_modules (Roughly 29 MB).
2. Open camera.js and on line 8 you should see:
   
   `drone.listen(server, {ip: "192.168.2.7"});`
    
  1. **If** The IP was set to a static one in the above SSID example **Then:** Change it to that same address. 
  2. **Else:** Change the line to simply:
   
   `drone.listen(server);`
    
3. Connect to the same network the drone is on.
4. Start camera.js
 
    `node camera.js`
    
5. To View Camera in Web-Browser on Current Machine
    
    `localhost:5555`

</details>

