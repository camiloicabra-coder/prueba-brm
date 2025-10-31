#  Sistema de Compras - Backend (Node.js + Express + MySQL)

Este proyecto es una API REST para gestionar **usuarios, productos y compras**, desarrollada con **Node.js, Express y Sequelize (MySQL)**.  
Permite registrar usuarios (clientes y administradores), realizar compras autenticadas y consultar historial de compras.  
Está diseñada para servir como base de un sistema de e-commerce o punto de venta.

---

##  Tecnologías utilizadas

- **Node.js** con **Express**
- **Sequelize ORM**
- **MySQL**
- **JWT (Json Web Token)** para autenticación
- **bcrypt** para encriptar contraseñas
- **dotenv** para variables de entorno
- **Nodemon** para desarrollo

---

##  Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/) (opcional para clonar el repositorio)
- Un cliente REST como **Postman** para probar los endpoints

---

##  Instalación del proyecto

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repo.git

2. **Entra en el directorio del proyecto**
```bash
cd nombre-del-repo

3. **Instala las dependencias necesarias**
```bash
npm install

---

## Configuración del entorno 

1. **Crea un archivo .env en la raíz del proyecto con este contenido**
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tienda_db
DB_DIALECT=mysql
JWT_SECRET=secreto_seguro
   
2. **Crea la base de datos MySQL**
Abre tu cliente de base de datos (por ejemplo, MySQL o phpMyAdmin) y ejecuta:
CREATE DATABASE prueba_tecnica;

3. Sincronización automática de tablas
El proyecto utiliza Sequelize ORM, por lo que al ejecutar el servidor se crearán las tablas automáticamente según los modelos definidos.

---

## Ejecución del servidor

Para iniciar el servidor en modo desarrollo:

npm run dev

El servidor estará corriendo en:

http://localhost:3000

---

## Autenticación (JWT)

Para acceder a las rutas protegidas, se debe usar autenticación con token JWT.

1. Registro de usuario
POST /api/auth/register

2. Inicio de sesión
POST /api/auth/login


Tras iniciar sesión, recibirás un token JWT.
Ese token debe incluirse en los encabezados de las peticiones protegidas:

Authorization: Bearer TU_TOKEN

---

## Endpoints principales

Usuarios

| Método | Ruta                 | Descripción                         |
| ------ | -------------------- | ----------------------------------- |
| POST   | `/api/auth/register` | Registrar usuario (cliente o admin) |
| POST   | `/api/auth/login`    | Iniciar sesión y obtener token      |

Productos

| Método | Ruta                 | Descripción                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/api/productos`     | Listar productos                   |
| POST   | `/api/productos`     | Crear producto *(solo admin)*      |
| PUT    | `/api/productos/:id` | Actualizar producto *(solo admin)* |
| DELETE | `/api/productos/:id` | Eliminar producto *(solo admin)*   |

Compras

| Método | Ruta                           | Descripción                                       |
| ------ | ------------------------------ | ------------------------------------------------- |
| POST   | `/api/compras`                 | Registrar compra *(cliente autenticado)*          |
| GET    | `/api/compras/historial`       | Ver historial del cliente autenticado             |
| GET    | `/api/compras/:id`             | Ver una compra específica *(cliente autenticado)* |
| GET    | `/api/compras/usuario/:userId` | Ver compras de un usuario *(admin)*               |
| GET    | `/api/compras`                 | Listar todas las compras *(admin)*                |

---

## Estructura del proyecto

src/
│
├── config/
│   └── database.js           # Configuración de la conexión a MySQL
│
├── controllers/              # Controladores de las rutas
│   ├── authController.js
│   ├── productController.js
│   └── purchaseController.js
│
├── middlewares/
│   └── authMiddleware.js     # Verificación de JWT
│
├── models/                   # Modelos Sequelize
│   ├── user.js
│   ├── product.js
│   ├── purchase.js
│   ├── purchaseItem.js
│   └── index.js
│
├── routes/                   # Rutas de la API
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── purchaseRoutes.js
│
└── server.js                 # Punto de entrada principal

---

## Pruebas con Postman

**Administrador**

<img width="944" height="607" alt="image" src="https://github.com/user-attachments/assets/4d22acc8-a94a-4969-bbb6-27cfcf3c7c50" />
Registro de un administrador

<img width="923" height="607" alt="image" src="https://github.com/user-attachments/assets/c3e08b1a-6d60-4fb1-9dae-4f4244800c59" />
Login de un administrador

<img width="931" height="612" alt="image" src="https://github.com/user-attachments/assets/d9d5c9fe-14a4-4a9d-bb6f-7668db07ba3f" />
Ver todas las compras de un usuario en especifico

<img width="932" height="603" alt="image" src="https://github.com/user-attachments/assets/ce665ef9-ddd4-4f1b-9452-017b437ee550" />
Ver todas las compras

<img width="942" height="618" alt="image" src="https://github.com/user-attachments/assets/3976d20c-4953-44a1-a08c-a10e3aa47a2f" />
Ver detalles de un producto en especifico

<img width="937" height="565" alt="image" src="https://github.com/user-attachments/assets/733a1860-5b5b-4df0-ad03-3ae1012a00a2" />
Eliminar un producto

<img width="932" height="595" alt="Captura de pantalla 2025-10-31 080403" src="https://github.com/user-attachments/assets/ba172293-0d0a-4c08-aa23-bba7c5849c8d" />
No se puede eliminar un producto por el token invalido o expirado del administrador

<img width="937" height="607" alt="image" src="https://github.com/user-attachments/assets/ddc2ef4a-4309-44d3-80de-0b6c9261f50b" />
Crear un producto

**Cliente**

<img width="948" height="605" alt="image" src="https://github.com/user-attachments/assets/fcbaabf7-8731-4359-909a-2e3983b4afb4" />
Registrar un cliente

<img width="941" height="600" alt="image" src="https://github.com/user-attachments/assets/1f5e227c-2aa8-4aba-8639-cd60749f1b6f" />
Login de un cliente

<img width="941" height="599" alt="image" src="https://github.com/user-attachments/assets/adad693b-d517-4020-bf02-3be19fa8040c" />
Ver una factura en especifico, solo puede hacerlo el cliente al que pertenece la factura validandolo con su token

<img width="951" height="608" alt="image" src="https://github.com/user-attachments/assets/72be00f6-b7a4-4f95-a7e1-abb3bdaceb26" />
Ver historial personal de compras

<img width="941" height="606" alt="image" src="https://github.com/user-attachments/assets/1ad506aa-9dab-4063-bc0f-d54465331165" />
Registrar una nueva compra

**Manejo de errores**

<img width="941" height="554" alt="image" src="https://github.com/user-attachments/assets/660b4e0b-1b36-41e0-89ee-11a933dca0cd" />
Al registrar una compra con un token invalido o expirado nos genera un error 401 con el mensaje {
    "mensaje": "Token inválido o expirado"
}

<img width="929" height="450" alt="image" src="https://github.com/user-attachments/assets/9d7bc4e2-ce69-4ba0-a3ea-d5fefbe3fd57" />
Ver el historial de todas la compras como cliente, genera un error 403 con el siguiente mensaje "mensaje": "Acceso denegado. Solo administradores.", es un acceso que solo tienen los administradores 

<img width="945" height="484" alt="image" src="https://github.com/user-attachments/assets/7e7073ab-2f7e-4771-9d52-8f455deb2ca4" />
intentar ver la factura de otro cliente nos genera un error 403 con el siguiente mensaje "mensaje": "No tienes permiso para ver esta factura.", un cliente solo puede ver sus propias facturas

** Solucion a problemas comunes**

| Problema                      | Posible causa                          | Solución                                             |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------- |
| Error `ECONNREFUSED`          | Base de datos no iniciada              | Inicia MySQL y verifica credenciales en `.env`       |
| Error 500 al registrar compra | Falta de productos o error en relación | Revisa que existan productos y usuarios válidos      |
| Error de autenticación        | Token inválido o ausente               | Asegúrate de enviar el token correcto en los headers |













