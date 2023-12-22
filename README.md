<h1 align="center">Home Banking</h1> 

:construction: Proyecto funcional pero en mejora :construction:

Proyecto de demostración de Homebanking realizado con Spring Boot 3.2.1 (Spring Data JPA, postgreSQL, Spring Web, Spring Security y Rest Repositories).

## :hammer: Funcionalidades del proyecto
## Usuarios
* `Funcionalidad 1:` <p align="justify">***Logueo y Registro*** - la funcionalidad de registro permite a los usuarios crear cuentas mediante la provisión de información básica.
Por otro lado, el inicio de sesión posibilita el acceso seguro a cuentas existentes mediante credenciales previamente registradas.</p>
* `Funcionalidad 2:` <p align="justify">***Crear cuentas (ahorro o corriente)*** - al registrarse, al usuario se le asigna automáticamente una cuenta de ahorros, teniendo la posibilidad
de poseer un máximo de tres cuentas entre ahorros y corriente. En la interfaz principal, el usuario puede visualizar fácilmente el número de cuenta, el saldo actual y la fecha de
creación de cada cuenta. Al acceder a los detalles de una cuenta específica, se presenta un resumen detallado de las transacciones realizadas, incluyendo información como el tipo de
transacción, el monto, la fecha, la descripción y el saldo actual de la cuenta.</p>
* `Funcionalidad 3:` <p align="justify">***Pedir y pagar prestamos*** - los usuarios tienen la capacidad de solicitar diversos tipos de préstamos, como personales, hipotecarios y vehiculares.
Durante el proceso de solicitud, pueden elegir entre cuotas predefinidas por el banco y se les proporciona información clara sobre el monto máximo que pueden solicitar y los intereses
asociados al préstamo. Una vez aprobada la solicitud, el préstamo se desembolsa directamente en la cuenta bancaria seleccionada por el usuario. En cuanto al pago, los usuarios cuentan con
flexibilidad, ya que tienen la opción de realizar pagos de una cuota mínima en el momento que lo deseen.</P>
* `Funcionalidad 4:` <p align="justify">***Realizar transacciones*** - la aplicación ofrece a los usuarios la versatilidad de realizar transacciones entre sus propias cuentas y las cuentas
de otras personas dentro del mismo banco.</p>
* `Funcionalidad 5:` <p align="justify">"***Crear y eliminar tarjetas (crédito o debito)*** - los usuarios tienen el control total sobre la gestión de sus tarjetas, con la capacidad de crear y
eliminar tarjetas de débito y crédito según sus necesidades. Cada tarjeta es fácilmente accesible, presentando de manera clara todos los datos esenciales necesarios para realizar compras en línea.
La plataforma permite a los usuarios mantener hasta tres tarjetas de cada tipo (débito o crédito) y limita la posesión a una única tarjeta de cada tipo de color, como titanium, gold o silver.</p>

## Administrador
* `Funcionalidad 1:` <p align="justify">***Crear nuevos prestamos*** - la aplicación brinda al administrador la capacidad de crear nuevos tipos de préstamos además de los tres predeterminados
(personal, hipotecario y vehicular). El administrador puede definir los términos y condiciones específicos para cada nuevo tipo de préstamo, estableciendo tasas de interés, plazos de pago y monto
máximo del préstamo.</p>

## 📁 Accede y ejecuta el proyecto
<p align="justify">Para obtener el proyecto, descárgalo en formato .zip (este proyecto utilizó Java 17 y Gradle 8.5). Descomprime el archivo descargado y ábrelo con tu IDE preferido, como IntelliJ.</p> 

  <p align="justify">Antes de ejecutar el proyecto, verifica que PostgreSQL esté instalado y configura las credenciales en el pgAdmin, estas credenciales se encuentran en el archivo application.properties del proyecto.
    Además, la primera vez que lo ejecutes descomenta todo lo que hay comentado en HomeBankingApplication, luego de que haya corrido una vez vuelve a comentarlo (si no deseas usar PostgreSQL, descomenta 
    las líneas que se encuentran comentadas y comenta las que no lo están en el archivo application.properties, esto permite usar H2 como base de datos. También debes descomentar la linea comentada en el build.gradle y comenta la de PostgreSQL.
    Finalmente descomenta lo comentado en HomeBankingApplication y luego de correr nuevamente el proyecto abre localhost:8081/h2-console y podrás ver y usar la base de datos).</p>
  <p align="justify">Inicia el proyecto, que se ejecutará en el puerto 8081. Ahora puedes realizar pruebas registrando tanto usuarios como administradores. Para crear un usuario, utiliza cualquier dirección de correo 
electrónico que tenga "@ejemplo.com". Para el administrador, asegúrate de que la dirección de correo electrónico termine en "@admin.com". ¡Listo! Ahora puedes explorar y probar las funcionalidades del proyecto.</p>

## :heavy_check_mark: Tecnologías utilizadas
- Spring Boot 3.2
- Gradle 8.5
- Java 17
- Vue.js
- JavaScript
- HTML5
- Bootstrap 5.3
- CSS3
- PostgreSQL
