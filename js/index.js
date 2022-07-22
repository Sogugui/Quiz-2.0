<<<<<<< HEAD

const quiz = document.getElementById("quiz");
let currentQuestion=0;
let score=0;
let result=0;
async function getQuestions() {
  const answElems = document.querySelectorAll(".answer");
  const quesElem = document.getElementById("question");
  const answA = document.getElementById("label1");
  const answB = document.getElementById("label2");
  const answC = document.getElementById("label3");
  const answD = document.getElementById("label4");

=======
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
  const submitBtn = document.getElementById("submit");
  // console.log(answElems);

  console.log(allRadio[0].checked);
  //Añadida función para deseleccionar los radio
  function unselect() {
    allRadio.forEach((x) => x.checked = false);
  }


  console.log(allRadio[0].checked);
>>>>>>> ae2cc295f388eb2828e6c5e42c9bf4a41ef80ba2
  let allquestions = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  let infoquestions = await allquestions.json();
<<<<<<< HEAD
  console.log(infoquestions.results);
  function paint(num){
    let allAnswers= [...infoquestions.results[num].incorrect_answers,infoquestions.results[num].correct_answer]
    // console.log(allAnswers);
    let question= infoquestions.results[num].question
    answA.innerHTML= allAnswers[0]
    answB.innerHTML= allAnswers[1]
    answC.innerHTML= allAnswers[2]
    answD.innerHTML= allAnswers[3]
    quesElem.innerHTML= question
    

  }
  paint(currentQuestion)

let nextButton=document.getElementById("submit").addEventListener("click", (e) => {
  for(let i=0; i<answElems.length; i++){
    if (
      answElems[i].value==infoquestions.results[currentQuestion].correct_answer
    ) {
      score += 1;
      console.log(score);
    } currentQuestion+=1
    paint(currentQuestion)}})
  
  //     nextButton.remove();
    if (score < 5) {
        quiz.innerHTML = `                          
                           <h2 id="result">You replied ${score}/${infoquestions.results.length} correct questions. Keep trying </h2>        
                           <button id="reload" onclick="location.reload()">Volver a jugar</button>
                           `;

      } else if (score <= 6) {
        quiz.innerHTML = `                          
                           <h2 id="result">You replied ${score}/${infoquestions.results.length} correct questions.You can improve!!<h2>        
                           <button id="reload" onclick="location.reload()">Volver a jugar</button>
                           `;

      } else if (score <= 8) {
        quiz.innerHTML = `                          
                            <h2 id="result">You replied ${score}/${infoquestions.results.length} preguntas correctas. Well done!</h2>        
                            <button id="reload" onclick="location.reload()">Volver a jugar</button>
                            `;
    
      } else{
        quiz.innerHTML = `                          
                            <h2 id="result">You replied ${score}/${infoquestions.results.length} correct questions. Youre a Quiz Master!!!</h2>        
                            <button id="reload" onclick="location.reload()">Volver a jugar</button>
                            `;
      }
    }getQuestions()
=======

  function paint(num) {
    let allAnswers = [...infoquestions.results[num].incorrect_answers, infoquestions.results[num].correct_answer]
    // Hacer que las respuestas salgan en orden aleatorio
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
  }
  paint(currentQuestion)



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
      unselect();//Llamando a la funcion que deselecciona los radio
      if (currentQuestion == 10) {
        submitBtn.remove();//Eliminamos el boton siguiente
        quiz.innerHTML = `  <div class="quizCont">                        
                           <h2 id="question">You replied ${score}/ 10 correct questions. Keep trying </h2>        
                           <button id="reload" class="reload" onclick="location.reload()">Volver a jugar</button>
                           </div>
                           `;


      }
      currentQuestion += 1;

      paint(currentQuestion);
    });
} getQuestions()
>>>>>>> ae2cc295f388eb2828e6c5e42c9bf4a41ef80ba2
