# 🌐 API

- Student: Tristan Brattinga (500881296)
- Duur: 31 maart 2025 - 25 april 2025
- Docent(en): Cyd Stumpel & Declan Rek

## 📝 Opdrachtomschrijving

Voor het vak API ben ik aan de slag gegaan met het creëren van een server-side gegenereerde web app.

De volgende randvoorwaarden zijn van toepassing voor deze opdracht:

- Minimaal een overzichts- en detailpagina
- Gebouwd in TinyHTTP + Liquid
- Minimaal een content API
- Minimaal twee Web API's

## 💡 Week 1: Kickoff & Concept

Voor de aanvang van week 1 van het vak API ben ik ernstig ziek geworden, waardoor ik de hele week niet bij de lessen op
school aanwezig kon zijn. Ik heb mij in de eerste week ingelezen in de opdracht en gekeken naar wat de vereisten zijn
voor het succesvol voltooien van dit vak.

Ik moet dit vak inhalen van vorig jaar, omdat ik het toen niet heb gehaald. Vorig jaar heb ik ervoor gekozen om een 
Whatsapp-replica te gaan bouwen. Toen ter tijd vond ik dit een geweldig concept en leek het mij ook heel tof om dit
leren na te bouwen. Ik heb er toen voor gekozen om
met [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) te werken. Nu wilde ik dit eigenlijk
weer proberen, omdat ik het nooit heb afgemaakt. Ik ben ziek in mijn bed opnieuw begonnen met het opzetten van een 
chat-app die gebruikt maakt van WebSockets. Hier heb ik eigenlijk de hele week een beetje mee gespeeld. Ook had ik nog 
nooit met [TinyHTTP](https://tinyhttp.v1rtl.site/) en [Liquid](https://liquidjs.com/) gewerkt, dus deze week thuis in 
bed kon ik mij hier goed in gaan verdiepen.

### Mijn Idee

Dit jaar wilde ik niet precies hetzelfde concept doorvoeren. Het leek mij een heel vet idee om een soort quiz te 
bouwen, waarbij er verschillende kamers zijn met meerdere gebruikers die punten kunnen scoren door hun antwoorden te 
typen en te versturen naar de server. Zo zijn er een x aantal vragen die de gebruikers kunnen beantwoorden en zal er 
ook een winnaar worden bekroond in het leaderboard. De flow zal zich ongeveer zo afspelen:

```
Overzichtspagina met kamer lijst -> Kamer gejoined nu in de lobby wachtend op spelers -> Spel bezig, verschillende 
vragen -> Spel klaar, leaderboard pagina met winnaar
```

## 📈 Week 2: First Concept

In week 2 was ik gelukkig weer in staat om bij de lessen aanwezig te zijn. Tijdens de les sprak ik mijn docente Cyd 
over mijn idee en ze had een aantal goede punten van feedback en inzichten voor mij. Zij raadde mij vooral aan om geen 
WebSockets te gebruiken, maar met Server Sent Events (SSE) te werken. WebSockets kunnen heel ingewikkeld zijn en SSE is 
makkelijker te implementeren. Het leek mij een goed idee om dit advies aan te nemen aangezien ik al een week van 
het vak heb gemist. Ik legde haar uit wat ik voor ogen zag en dit zou een soort [Kahoot](https://kahoot.it/) webapp 
worden, waarbij er vragen worden gestuurd naar verschillende clients en deze kunnen antwoorden om zo punten te 
scoren. Bij Kahoot is het zo dat er één iemand (admin) is die een kamer creëert, waar andere gebruikers via een 
kamercode zich bij aan kunnen sluiten. 

### WebSockets v.s SSE

Ik had geen idee wat SSE was, hoe het precies werkt en hoe het verschilt t.o.v. WebSockets. Voordat ik hiermee aan 
de slag kon moest ik hier eerst onderzoek naar doen. Ik 

![img.png](img.png)
<caption>Bron: https://medium.com/@ecemertrk/websocket-vs-sse-24e634930472</caption>

### Voortgangsgesprek Cyd

Tijdens mijn eerste voortgangsgesprek met Cyd heb ik mijn prototype laten zien. Ik vertelde haar dat ik best wel zat te 
worstelen met mijn concept en hoe dit er precies uit zou gaan zien. Ook had ik geen idee welke content API ik zou 
moeten gebruiken 

Zij gaf mij de tip om de flow van mijn web app uit te tekenen

Verder was ze te spreken over mijn
eerste styling en had hier en daar wat kleine verbeterpuntjes visueel gezien. Sommige hover-animaties zijn onnodig
en zorg dat de controls groot genoeg zijn voor de gebruiker.

### 🧠 Conclusie

## 🔄 Week 3: Switch-It-Up!

### Voortgangsgesprek Declan

### 🧠 Conclusie

## 🚀 Week 4: Wrap-up

### 🧠 Conclusie

### Verdere Ontwikkelingen

## 📚 Bronnen

- 