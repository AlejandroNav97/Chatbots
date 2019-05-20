#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 3
#include <dht.h>

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

dht DHT;

#define DHT11_PIN 2

int Led = 13;
int count = 0;
int estado =0;
const int PIRPin = 7;

void setup() {
  Serial.begin(9600);
  sensors.begin(); 
  pinMode(Led, OUTPUT);
  pinMode(PIRPin, INPUT);
}

void loop() {
  
    DHT.read11(DHT11_PIN);
    sensors.requestTemperatures();
    Serial.print(sensors.getTempCByIndex(0));
    Serial.print(":");
    Serial.print(DHT.humidity);
    Serial.print(":");
    Serial.print(count);
    Serial.println(":");
    
    
    
    delay(1000);

    estado = digitalRead(PIRPin);


 if(estado == HIGH)
  { 
    count++;

  while(estado == HIGH){

   estado = digitalRead(PIRPin); 
    }

    digitalWrite(PIRPin, LOW);

  
    }
    
    

   
    
    
  
  if (Serial.available()) {
    char Letra = Serial.read();
    if (Letra == 'H') {
      digitalWrite(Led, HIGH);
    }
    else if (Letra == 'L') {
      digitalWrite(Led, LOW);
    }
  }

}
