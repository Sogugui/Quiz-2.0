const quiz = document.getElementById("quiz");
let currentQuestion = 0; // inicializa en cero las preguntas
let score = 0; //contador iniciado en cero para las respuestas correctas
async function getQuestions() {
  const answerbtn1 = document.getElementsByClassName("btn")[0];
  const answerbtn2 = document.getElementsByClassName("btn")[1];
  const answerbtn3 = document.getElementsByClassName("btn")[2];
  const answerbtn4 = document.getElementsByClassName("btn")[3];
  const quesElem = document.getElementById("question");
  const answElems = document.querySelectorAll(".btn");

  let allquestions = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  let infoquestions = await allquestions.json();

  function paint(num) {
    let allAnswers = [
      ...infoquestions.results[num].incorrect_answers,
      infoquestions.results[num].correct_answer,
    ];

    let question = infoquestions.results[num].question;
    answerbtn1.innerHTML = allAnswers[0];
    answerbtn2.innerHTML = allAnswers[1];
    answerbtn3.innerHTML = allAnswers[2];
    answerbtn4.innerHTML = allAnswers[3];
    quesElem.innerHTML = question;
    answerbtn1.value = allAnswers[0]; // le pasamos contenido (valor) a cada una de las respuestas
    answerbtn2.value = allAnswers[1];
    answerbtn3.value = allAnswers[2];
    answerbtn4.value = allAnswers[3];
  }
  paint(currentQuestion);

  for (let i = 0; i < answElems.length; i++) {
    answElems[i].addEventListener("click", function () {
      if (
        answElems[i].value ==
        infoquestions.results[currentQuestion].correct_answer
      ) {
        score++;
      }
    });
  }
  document.getElementById("submit").addEventListener("click", (e) => {
    console.log(currentQuestion);
    console.log(score);

    if (currentQuestion == 10) {
      //preguntas correctas para mostrar en el DOM
      quiz.innerHTML = `                          
                           <h2 id="result">You replied ${score}/ 10 correct questions </h2>        
                           <button id="reload" onclick="location.reload()">Try Again</button>
                           `;
      const firebaseConfig = {
        apiKey: "AIzaSyBpw2VsQ0t2TyxyWETolJzSPnSOxB-xayE",
        authDomain: "quiz-2-bf09d.firebaseapp.com",
        projectId: "quiz-2-bf09d",
        storageBucket: "quiz-2-bf09d.appspot.com",
        messagingSenderId: "40897234069",
        appId: "1:40897234069:web:cf427ab76d5e1ad361c79c",
      };

      // Initialize Firebasefirebase.initializeApp(firebaseConfig);
      const app = firebase.initializeApp(firebaseConfig);

      const db = firebase.firestore(); // db representa mi BBDD

      const createUser = (user) => {
        db.collection("users")
          .add(user)
          .then((docRef) =>
            console.log("Document written with ID: ", docRef.id)
          )
          .catch((error) => console.error("Error adding document: ", error));
      }; createUser()

      document.getElementById("save").addEventListener("click", () => {
        const first = prompt("Introduce nombre");
        const last = prompt("introduce apellido");
        createUser({
          first,
          last,
          score: `${score}/10`,
        });
      });

      const readAllUsers = (last) => {
        db.collection("users")
          .where("last", "==", last)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
            });
          });
      };
      readAllUsers();
    }
    currentQuestion += 1;

    paint(currentQuestion);
  });
}
getQuestions();
