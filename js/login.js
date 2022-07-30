// Your web app's Firebase configuration

//Esta es mi configuracion de database

const firebaseConfig = {
  apiKey: "AIzaSyBjyoE95U6SnQkG0-E3hDDnnEAn1L6G91A",
  authDomain: "tortillaback.firebaseapp.com",
  projectId: "tortillaback",
  storageBucket: "tortillaback.appspot.com",
  messagingSenderId: "198340461383",
  appId: "1:198340461383:web:4fb86d3743eb637e62c262"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();// db representa mi BBDD


//Crear usuario
const createUser = (user) => {
  db.collection("users")
    .add(user)
    .then((docRef) => console.log("Document written with ID: ", docRef.id))
    .catch((error) => console.error("Error adding document: ", error));
};

//Dar de alta usuario
const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`Su usuario ${user.email} se ha registrdo correctamente`)
      alert(`se ha registrado ${user.email} ID:${user.uid}`)
      // ...
      // Guarda El usuario en Firestore
      createUser({
        id: user.uid,
        email: user.email
      })


    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("Error en el sistema" + error.message);
    });

};

//EN PRUEBAS--------------------------------------------------------------
//Añadir score y fecha a usuario actual
function addScore(num) {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userUid = user.uid;
      var date = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("games").doc()//imposible obtener la ID del doc
        .set({
          date: date,
          id_user: userUid,
          score: num
        },
          { merge: true })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("no hay usuarios en el sistema");
    }
  });
}
//------------------------------------------------------------------------------

//Iniciar sesion
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha logado ${user.email} ID:${user.uid}`)
      alert(`Hola ${user.email}!!`)
      console.log(user);
      const cuUser = firebase.auth().currentUser;//Obtenemos el usuario actual
      console.log(cuUser.email);

      window.location.href = "./quiz.html";

    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
}

//Cerrar sesion
const signOut = () => {
  let user = firebase.auth().currentUser;

  firebase.auth().signOut().then(() => {
    console.log("Sale del sistema: " + user.user)
  }).catch((error) => {
    console.log("hubo un error: " + error);
  });
}


// //formularios
document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email.value;
  let pass = event.target.elements.pass.value;
  let pass2 = event.target.elements.pass2.value;

  pass === pass2 ? signUpUser(email, pass) : alert("error password");
})

document.getElementById("form2").onsubmit = (event) => {
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email, pass)
}

//Mostrar datos
function paintScores() {
  console.log("has llamado a paintScores");

  //conseguir UID de usuario logado
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userUid = user.uid;
      db.collection('games')
        .where('id_user', '==', userUid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());

            // Hay que formatear la fecha
            let select = `<br>
              <h3>Date</h3>
              <p>${doc.data().date}</p><br>
              <h3>Score</h3>
              <p>${doc.data().score}</p><br>
              <hr>
              `;
            document.getElementById("userGames").innerHTML += select;//Solo me faltaba añadir el "+"!!!!

          });
        });
    } else {
      console.log("no hay usuarios en el sistema");
    }
  });
};


//Fin de datos y funciones FIREBASE ---------------------------------------------------------------------
