#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include "FastLED.h"
#define NUM_LEDS1 59
CRGB leds1[NUM_LEDS1];

const char* ssid = "XXX";
const char* password = "XXXXXXXX";

WiFiUDP Udp;
unsigned int localUdpPort = 4210;  // local port to listen on
char incomingPacket[1024];  // buffer for incoming packets
char  replyPacket[] = "Hi there! Got the message :-)";  // a reply string to send back


void setup()
{
  Serial.begin(115200);
  Serial.println();
FastLED.addLeds<NEOPIXEL, D7>(leds1, NUM_LEDS1);

  Serial.printf("Connecting to %s ", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected");

  Udp.begin(localUdpPort);
  Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), localUdpPort);
}


void loop()
{
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
    // receive incoming UDP packets
    Serial.printf("Received %d bytes from %s, port %d\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort());
    int len = Udp.read(incomingPacket, 255);
    if (len > 0)
    {
      incomingPacket[len] = 0;
    }
    for(int i = 0; i<packetSize/3;i++){
    
      leds1[i] = CRGB(int(incomingPacket[i*3]),int(incomingPacket[i*3+1]),int(incomingPacket[i*3+2])); 
  
     
    
       Serial.print(int(incomingPacket[i]));
    }
   
    FastLED.show();
    
   // Serial.printf("UDP packet contents: %s\n", incomingPacket);

    // send back a reply, to the IP address and port we got the packet from
    
  }
}