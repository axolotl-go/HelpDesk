# **HelpDesk**

Este proyecto usa **Laravel** como backend con **SQLite** como base de datos. Además incluye una carpeta separada para el **frontend**.
Se eliminaron carpetas no necesarias como `resources/` para tener un backend más simple y minimalista.

---

## **Requisitos**

-   PHP 8.1+
-   Composer
-   Extensión `pdo_sqlite` habilitada
-   SQLite (incluido normalmente en PHP)

---

## **Instalación**

### 1. Clonar repositorio

```bash
git clone https://github.com/axolotl-go/HelpDesk.git
cd HelpDesk
```

### 2. Instalar dependencias de Laravel

```bash
composer install
```

### 3. Configurar archivo `.env`

```bash
cp .env.example .env
```

Editar las siguientes líneas:

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

### 4. Crear archivo SQLite

```bash
mkdir -p database
touch database/database.sqlite
```

### 5. Generar key de Laravel

```bash
php artisan key:generate
```

### 6. Migraciones (si tienes)

```bash
php artisan migrate
```

---

## **Frontend**

Este proyecto utiliza una carpeta externa llamada `/frontend`.
Puede ser React, Vue, Svelte o HTML plano.

Estructura recomendada:

```
/backend  ← tu laravel
/frontend ← tu vista o app
```

Ejemplo de estructura:

```
project/
 ├── app/
 ├── bootstrap/
 ├── config/
 ├── database/
 ├── public/
 ├── routes/
 ├── vendor/
 └── frontend/
      └── index.html
```

El frontend se comunica con el backend mediante API (`/api/...`).

---

## **Servidor de desarrollo**

### Backend

```bash
php artisan serve
```

### Frontend (ejemplo con Vite)

```bash
npm install
npm run dev
```
