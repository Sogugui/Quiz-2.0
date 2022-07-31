# Quiz-2.0 - The Quiz Master

Este repositorio está dedicado a la creación de una app para jugar a un Quiz de preguntas y respuestas
![Pantalla inicio con nombres](https://user-images.githubusercontent.com/101732872/182038540-250c98b0-f7ad-4079-b422-cc692154300f.png)

Para empezar a jugar hay dos opciones :
 1) Entrar como usuario invitado a través del botón Guest User ( recomendado para usuarios que solo desean ver el funcionamiento de la app y no jugar)
 2) Crear un usuario ( recomendada) para poder jugar y que las partidas se vayan guardando y al final del juego se muestren los últimos resultados. Se puede crear el usuario con email o con cuenta de google (los datos serán guardados en la base de datos que utilizamos).
Una vez registrado comenzará el Quiz. Si el usuario ya está registrado, podrá acceder directamente en el boton de Sign in (iniciar sesion). En ambos casos se mostrará la siguiente pantalla:
![Pantalla preguntas con nombres](https://user-images.githubusercontent.com/101732872/182038698-8c2be90e-1095-437b-a1a5-bfab5839f573.png)

Al tratarse de una SPA( singe-page application) solo se mostrará una pregunta con sus correspondientes cuatro respuestas por pantalla y no se podrá ver la siguiente hasta no haber respondido la misma. Solo hay una respuesta correcta 

Al finalizar el juego el usuario podrá ver cuántas respuestas correctas tuvo y también una gráfica con los resultados de las últimas partidas que mostrará cuántos puntos obtuvo el usuario y la fecha de la partida.
En la última pantalla del juego el usuario tiene la opción de volver a jugar (botón Try again) o cerrar sesión (Sign out)
![Resultados con nombres](https://user-images.githubusercontent.com/101732872/182038972-16ab2485-7c29-4b16-a072-665adb10b17e.png)
