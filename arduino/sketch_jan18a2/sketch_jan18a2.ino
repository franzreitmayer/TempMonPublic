

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHTesp.h>


/*
 * Replace the WiFi Access Points
 */
const char* ssid =  "[WIFI ACCESS POINT IDENTIFIER]";
const char* password = "[WIFI ACCESS POINT PASSWORD]";
 
/* 
 * LED Pin
 */
int ledPin = LED_BUILTIN; // GPIO13

/*
 * Temperature and Humidity Sensor Instance from DHTesp.h
 */
DHTesp dht;

/*
 * to rescue last temperature and humidity measurement
 */
float lastTemperature;
float lastHumidity;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  // setup sensor
  dht.setup(D0, DHTesp::DHT22);
  WiFi.begin(ssid, password);   //WiFi connection
 
  /*
   * wait for WiFi Connection
   */
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
 
    delay(500);
    Serial.println("Waiting for connection");
 
  }
  

}

void loop() {
  // put your main code here, to run repeatedly:
  
  // get temperature and humidity measurement
  TempAndHumidity last = dht.getTempAndHumidity();
  
  // 
  if (lastHumiduty != last.humidity || lastTemperature != last.temperature) {
  Serial.println("#");
  Serial.println("Temp: " + String(last.temperature));
  Serial.println("Humid: " + String(last.humidity, 0));
  lastTemperature = last.temperature;
  lastHumidity = last.humidity;
  
  // post last measurement to server
  postData(lastTemperature, lastHumidity);
  }
}


void postData(float lastTemperature, float lastHumidity) {
  
  HTTPClient http;

  http.begin("http://192.168.178.46:9090/api/sensor");
  http.addHeader("Content-Type", "application/json");
  String body = "{\"sensor_id\":2,\"temp\":" + String(lastTemperature) + ",\"humidity\":" + String(lastHumidity) + "}";
  Serial.println(body);
  int httpCode = http.POST(body);
  Serial.print("HTTP Ret Code: " + String(httpCode));
  http.end();
}
