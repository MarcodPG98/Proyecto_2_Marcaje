Antes de poder iniciar con el proyecto es necesario realizar los siguientes pasos

#1 indicar sus credenciales en el archivo de .env, en las siguientes partes

    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=nombre de su base de datos
    DB_USERNAME=nombre de usuario
    DB_PASSWORD=su contraseña

#2 ejecutar el siguiente comando 
    
    php artisan migrate para crear la base de datos

#3 ejecutar el siguiente comando

    composer update --ignore-platform-reqs

Este segundo por si el primero genera problemas

    composer require tymon/jwt-auth --ignore-platform-reqs

#4 Ejecutar el siguiente para generar el JWT Secret y project Key

    php artisan jwt:secret

    php artisan key:generate

Teniendo estos pasos ya puede empezar a utilizar el proyecto ejecutando

    php artisan serve

para verlo de forma gráfica o visual utilize el siguiente proyecto

    https://github.com/MarcodPG98/Proyecto_2_Marcaje

Especialmente en la carpeta del proyecto llamado marcaje_fronted