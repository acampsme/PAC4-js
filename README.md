# PAC4-js

- Login UOC: acampsme
- Nom i cognoms: Alexandre Camps Mezquita

## Descripció
Aquest projecte és la solució de la PAC4 de desenvolupament amb Angular. S'ha construït una aplicació ecommerce amb:
- Serveis Angular per articles i usuaris
- HttpClient per crides REST a `http://localhost:3000`
- Interceptor per enviar token d'autenticació
- Rutes i guardes per protegir la creació d'articles
- Lazy loading amb mòduls `User` i `Article`
- Pipes i formularis reactius
- Persistència de sessió amb `localStorage`

## Notes importants
- Cal tenir el servidor backend local en marxa al port `3000`
- L'aplicació està a `PEC4_Ej_Prac`
- Si el token és vàlid, l'usuari no ha de tornar a fer login al refrescar la pàgina
- S'han afegit imatges a `PEC4_Ej_Prac/public/article1.jpg` i `article3.jpg`
- El fitxer `default-article.svg` es fa servir com a imatge per defecte quan `imageUrl` està buit

## Executar
1. `cd PEC4_Ej_Prac`
2. `npm install`
3. `npm start`

