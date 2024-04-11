# API för workexperience av Johan Magnusson
Repot innehåller kod för att skapa ett REST API med express skapat av mig för att kunna hämta arbetserfarenhet samt lägga till, uppdatera och ta bort.  

## Länk
Länk till APIet finns här: [https://backend-moment2-del1.onrender.com/api/workexperience](https://backend-moment2-del1.onrender.com/api/workexperience) 


## Användning
Hur API:et används för olika ändamål:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/workexperience     |Hämtar alla tillgängliga arbetserfarenheter.                                                      |
|GET    |/workexperience/:ID |Hämtar en specifik arbetserfarenhet med angivet ID.                                               |
|POST   |/workexperience     |Lagrar en ny arbetserfarenhet. Kräver att ett arbetserfarenhet-objekt skickas med.                            |
|PUT    |/workexperience/:ID |Uppdaterar en existerande arbetserfarenhet med angivet ID. Kräver att ett arbetserfraenhet-objekt skickas med.|
|DELETE |/workexperience/:ID |Raderar en arbetserfarenhet med angivet ID.                                                       |

Ett arbetserfarenhets-objekt returneras/skickas som JSON med följande struktur:
```
{
   "id": "1",
   "companyname": "Kunskapsskolan",
   "jobtitle": "Lärare",
   "location": "Trelleborg"
}
```