# Ecommerce PAC4

## Explicació per exercici

### Exercici 1 – Serveis
- S'ha creat el servei `ArticleService` a `src/app/services/article.service.ts` amb `providedIn: 'root'`.
- El servei retorna observables per als mètodes `getArticles()`, `changeQuantity(articleID, changeInQuantity)` i `create(article)`.
- Els components es basen en el servei i utilitzen lògica mínima a la vista:
  - `ArticleListComponent` consumeix `getArticles()` i mostra la llista.
  - `ArticleNewReactiveComponent` utilitza `create(article)` per enviar un nou article.
- S'ha fet servir `async` al template de la llista per consumir `articles$` de manera reactiva.

### Exercici 2 – HttpClient
- El servei `ArticleService` fa crides HTTP reals a `http://localhost:3000/api/articles`.
- Implementades les peticions:
  - `GET /api/articles` per obtenir la llista.
  - `POST /api/articles` per crear un nou article.
  - `PATCH /api/articles/:id` per modificar `quantity` amb `changeInQuantity`.
- A `ArticleListComponent` s'ha afegit un camp de cerca amb `FormControl` que passa el paràmetre `q` al servei.
- S'han col·locat les imatges `public/article1.jpg` i `public/article3.jpg` per mostrar-les correctament.

### Exercici 3 – Pipes
- S'ha aplicat el pipe de moneda d’Angular `currency:'EUR':'symbol':'1.2-2'` per mostrar el preu amb dos decimals i el símbol `€`.
- S'ha creat un pipe custom `DefaultImagePipe` a `src/app/pipes/default-image.pipe.ts`.
- Aquest pipe retorna `public/default-article.svg` quan `imageUrl` està buit o no té valor.

### Exercici 4 – Routing
- S'ha creat el component `LoginComponent` amb formulari reactiu per autenticar usuaris.
- S'ha creat el component `RegisterComponent` amb formulari reactiu per registrar usuaris.
- `ArticleDetailComponent` mostra els detalls d’un article accedint a la ruta `article/:id`.
- S'ha creat el servei `UserService` per fer les peticions a `/user/login` i `/user/register`.
- S'ha creat `UserStoreService` per emmagatzemar el token i mantenir l’estat d’autenticació amb `localStorage`.
- S'ha implementat l’interceptor `ArticleAppInterceptor` que afegeix el token a les peticions HTTP.
- El `AppRoutes` redirigeix per defecte a `login` i inclou les rutes:
  - `login`
  - `register`
  - `article/list`
  - `article/create`
  - `article/:id`
- La ruta `article/create` està protegida amb `AuthGuard`.
- Si l’usuari ja està autenticat, al refrescar la pàgina el token es recupera de `localStorage` i no es demana login de nou.

### Exercici 5 – Lazy-Loading
- S'ha creat `UserModule` i `ArticleModule` per carregar-los de manera lazy.
- Les rutes de `app.routes.ts` utilitzen `loadChildren()` per carregar els mòduls només quan es requereixen.
- Això es verifica al build amb chunks lazy `article-module` i `user-module`.

## Notes d'execució
- Cal iniciar el servidor backend al port `3000` perquè l’aplicació funcioni.
- Les imatges de mostra són a `public/article1.jpg` i `public/article3.jpg`.
- La imatge per defecte és `public/default-article.svg`.
- L'aplicació Angular està a `PEC4_Ej_Prac`.

