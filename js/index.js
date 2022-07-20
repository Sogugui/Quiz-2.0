
const quiz = document.getElementById("quiz");
let currentQuestion=0;
let score=0;
async function getQuestions() {
const answerbtn1= document.getElementsByClassName("btn")[0]
const answerbtn2= document.getElementsByClassName("btn")[1]
const answerbtn3= document.getElementsByClassName("btn")[2]
const answerbtn4= document.getElementsByClassName("btn")[3]
const quesElem = document.getElementById("question");
 const answElems = document.querySelectorAll(".btn");
 console.log(answElems);


  let allquestions = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  let infoquestions = await allquestions.json();

  function paint(num){
    let allAnswers= [...infoquestions.results[num].incorrect_answers,infoquestions.results[num].correct_answer]
    
    let question= infoquestions.results[num].question
    answerbtn1.innerHTML= allAnswers[0]
    answerbtn2.innerHTML= allAnswers[1]
    answerbtn3.innerHTML= allAnswers[2]
    answerbtn4.innerHTML= allAnswers[3]
    quesElem.innerHTML= question
    answerbtn1.value= allAnswers[0] // le pasamos contenido (valor) a cada una de las respuestas
    answerbtn2.value= allAnswers[1]
    answerbtn3.value= allAnswers[2]
    answerbtn4.value= allAnswers[3]
  }
  paint(currentQuestion)


      for (let i = 0; i < answElems.length; i++){
answElems[i].addEventListener("click",function(){
        if(answElems[i].value==infoquestions.results[currentQuestion].correct_answer){
          score++
        }
      })}
      document
      .getElementById("submit")
      .addEventListener("click", (e) => {
        console.log(currentQuestion);
        console.log(score);
    
    if (currentQuestion == 10) {
      quiz.innerHTML = `                          
                           <h2 id="result">You replied ${score}/ 10 correct questions. Keep trying </h2>        
                           <button id="reload" onclick="location.reload()">Volver a jugar</button>
                           `;

    }
    currentQuestion += 1;
    
    paint(currentQuestion);
  });
    }getQuestions()