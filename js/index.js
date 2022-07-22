
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

  let allquestions = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  let infoquestions = await allquestions.json();
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