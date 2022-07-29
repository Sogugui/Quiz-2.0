const quiz = document.getElementById("quiz");
let currentQuestion = 0;
let score = 0;

async function getQuestions() {
  const answerbtn1 = document.getElementsByClassName("btn")[0]
  const answerbtn2 = document.getElementsByClassName("btn")[1]
  const answerbtn3 = document.getElementsByClassName("btn")[2]
  const answerbtn4 = document.getElementsByClassName("btn")[3]
  const quesElem = document.getElementById("question");
  const answElems = document.querySelectorAll(".btn");
  const allRadio = document.querySelectorAll(".answer");//Obtenemos todos los radio
  const submitBtn = document.getElementById("submit");//Obtenemos el boton siguiente
  const userName = document.getElementById("userName");//Obtenemos h2 para mostrar usuario logado

  //Añadida función para deseleccionar los radio
  function unselect() {
    allRadio.forEach((x) => x.checked = false);
  }
  let allquestions = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  let infoquestions = await allquestions.json();

  console.log(loggedUser())

  function paint(num) {
    let allAnswers = [...infoquestions.results[num].incorrect_answers, infoquestions.results[num].correct_answer]
    let question = infoquestions.results[num].question
    answerbtn1.innerHTML = allAnswers[0]
    answerbtn2.innerHTML = allAnswers[1]
    answerbtn3.innerHTML = allAnswers[2]
    answerbtn4.innerHTML = allAnswers[3]
    quesElem.innerHTML = question
    answerbtn1.value = allAnswers[0] // le pasamos contenido (valor) a cada una de las respuestas
    answerbtn2.value = allAnswers[1]
    answerbtn3.value = allAnswers[2]
    answerbtn4.value = allAnswers[3]
  }// daba error la carga del quiz porque faltaba cerrar esta llave

  paint(currentQuestion);

  //Funcion para saber si hay usuarios logados
  function loggedUser() {
    // Listener de usuario en el ssitema
    // Controlar usuario logado
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        userName.innerHTML = "Usuario: " + user.email;
        console.log(`Sesion iniciada con: ${user.email}`)
      } else {
        console.log("no hay usuarios en el sistema");
      }
    });
  }




  for (let i = 0; i < answElems.length; i++) {
    answElems[i].addEventListener("click", function () {
      if (answElems[i].value == infoquestions.results[currentQuestion].correct_answer) {
        score++
      }
    })
  }
  document
    .getElementById("submit")
    .addEventListener("click", (e) => {
      console.log(currentQuestion);
      console.log(score);
      console.log(loggedUser())

      unselect();//Llamando a la funcion que deselecciona los radio
      if (currentQuestion == 10) {
        submitBtn.remove();//Eliminamos el boton siguiente
        quiz.innerHTML = `  <div class="quizCont">                        
                           <h2 id="question">You replied ${score}/ 10 correct questions. Keep trying </h2>        
                           <button id="reload" class="reload" onclick="location.reload()">Volver a jugar</button>
                           <button id="logout" class="reload" onclick="signOut()">Cerrar sesión</button>
                           <h2></h2>
                           </div>

                           <div class="quizCont" id="userGames">
                           <h2 id="question">Your last games!!</h2>
                           </div>
                           `;
        //Arreglado boton de cerrar sesion
        addScore(score);//Añadir el score actual
        paintScores();//Mostrar resultados anteriores de ese usuario
      }
      currentQuestion += 1;

      paint(currentQuestion);
    });
} getQuestions()

