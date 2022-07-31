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
      console.log(`Your ${user.email} has been correctly registered`)
      alert(`Your ${user.email} ID:${user.uid} has been correctly registered`)
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

async function GoogleSignup (){
  let provider = new firebase.auth.GoogleAuthProvider();//Sirve para llamar al proveedor de google
  try{
      const response = await firebase.auth().signInWithPopup(provider);
      console.log(response);

      let newUser = { //registra al usuario en la base de datos de firebase(en caso de que no esté) cuando se logea atraves de google
        email: response.user.email,
        name: response.user.id,
      }
      
      db.collection("users")
        .where("email", "==", response.users.email)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          //Condicional que verifica si en la base de datos hay un usuario con ese nombre, si no lo hay lo crea. El .size seria como el length del firebase con ese usuario.
          if(querySnapshot.size == 0){
            db.collection("users")
            .add(newUser)
            .then((docRef) => console.log("Document written with ID: ", docRef.id))
            .catch((error) => console.error("Error adding document: ", error));
          } else{
            console.log(`usuario de nombre ${response.users.id} ya existe en la BBDD firestore.`);
          }
        });
        console.log(response.users.id);
      }catch(error){  
        console.log(error);
    }
      }

//Iniciar sesion
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha logado ${user.email} ID:${user.uid}`)
      alert(`Welcome ${user.email}!!`)
      console.log(user);
      const cuUser = firebase.auth().currentUser;//Obtenemos el usuario actual
      console.log(cuUser.email);
      window.location.href = "./quiz.html";
    }
    )
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
}

// Iniciar sesion con google

//Función de login con Auth
async function Googlelogin (){
  let provider = new firebase.auth.GoogleAuthProvider();//Sirve para llamar al proveedor de google
  try{
      const response = await firebase.auth().signInWithPopup(provider);
      console.log(response);
      
      db.collection("users")
        .where("email", "==", response.users.email)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          //Condicional que verifica si en la base de datos hay un usuario con ese nombre, si no lo hay lo crea. El .size seria como el length del firebase con ese usuario.
          if(querySnapshot.size == 0){
            db.collection("users")
            .add(newUser)
            .then((docRef) => console.log("Document written with ID: ", docRef.id))
            .catch((error) => console.error("Error adding document: ", error));
          } else{
            console.log(`usuario de nombre ${response.users.id} ya existe en la BBDD firestore.`);
          }
        });
        console.log(response.users.id);

      // return response.user;

  }catch(error){  
      console.log(error);
  }
}



//Cerrar sesion
const signOut = () => {
  let user = firebase.auth().currentUser;

  firebase.auth().signOut().then(() => {
    window.location.href = "./index.html";
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
      var d = new Date();
      let date = d.toLocaleDateString(); // cambio de var date porque no seteaba la fecha correctamente
      db.collection("games")
        .where("id_user", "==", userUid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
          })});
 // Grafica de partidas jugadas
          let paintedScore = [];
          let scoreDate = [];
          async function getGamedata() {
            await db
              .collection("games")
              .where("date", "==", date)
              .limit(8)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  paintedScore.push(doc.data().score);
                  scoreDate.push(doc.data().date);
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          }
          getGamedata().then(() => {
            createChart(paintedScore, scoreDate);
          });

          function createChart(paintedScore, scoreDate) {
            var data ={
              labels: scoreDate,
              series:[paintedScore]
            }
            var options = {
              seriesBarDistance: 10,
              low: 0,
              high: 10,
              axisY: {
                onlyInteger: true,
              }
            }
            var defaultOptionsY = {
              // The title to be displayed on the axis. If at least one axis title is not supplied then an error is thrown.
              // This can also be passed a function to enable simple updating of the title if your chart data changes.
              axisYTitle: "Score",
            
              // One or more class names to be added to the axis title.
              // Multiple class names should be separated by a space.
              // This can also be passed a function to enable simple updating of the classes if your chart data changes.
              axisClass: "ct-axis-score",
            
              // How much to offset the title by.
              // Please note, x and y offset values for axisY are flipped due to the rotation of the axisY title by 90 degrees.
              // Therefore changing the x value moves up/down the chart, while changing y moves left/right.
              offset: { x: 0, y: 0 },
            
              // Defines the anchoring of the title text. Possible values are 'start', 'end' and 'middle'.
              textAnchor: "start",
            
              // Whether to flip the direction of the text. Note - This can only be used on axis Y.
              flipTitle: false
            }
            var defaultOptionsX = {
              // The title to be displayed on the axis. If at least one axis title is not supplied then an error is thrown.
              // This can also be passed a function to enable simple updating of the title if your chart data changes.
              axisYTitle: "Date",
            
              // One or more class names to be added to the axis title.
              // Multiple class names should be separated by a space.
              // This can also be passed a function to enable simple updating of the classes if your chart data changes.
              axisClass: "ct-axis-date",
            
              // How much to offset the title by.
              // Please note, x and y offset values for axisY are flipped due to the rotation of the axisY title by 90 degrees.
              // Therefore changing the x value moves up/down the chart, while changing y moves left/right.
              offset: { x: 0, y: 0 },
            
              // Defines the anchoring of the title text. Possible values are 'start', 'end' and 'middle'.
              textAnchor: "start",
            
            };
            new Chartist.Bar('.ct-chart', data, options,defaultOptionsY,defaultOptionsX);       
            
          }

         } else {
      console.log("no hay usuarios en el sistema");
    }})}
//Fin de datos y funciones FIREBASE ---------------------------------------------------------------------

//Añadir score y fecha a usuario actual
function addScore(num) {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userUid = user.uid;
      // var date = firebase.firestore.FieldValue.serverTimestamp();
      var d =  new Date();
      let date = d.toLocaleDateString(); // cambio de var date porque no seteaba la fecha correctamente
      console.log(date);

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
    return date,num
  });
}
//------------------------------------------------------------------------------



// new Chartist.Bar(
//   ".ct-chart",
//   {
//     labels: scoreDate, 
//     series: [paintedScore],

//   },
//   {
//     seriesBarDistance: 10,
//     low: 0,
//     high: 10,
//     axisY: {
//       onlyInteger: true,
//     },
//   },
//   {
//     // The title to be displayed on the axis. If at least one axis title is not supplied then an error is thrown.
//     // This can also be passed a function to enable simple updating of the title if your chart data changes.
//     axisTitle: "Score",
  
//     // One or more class names to be added to the axis title.
//     // Multiple class names should be separated by a space.
//     // This can also be passed a function to enable simple updating of the classes if your chart data changes.
//     axisClass: "ct-axis-title",
  
//     // How much to offset the title by.
//     // Please note, x and y offset values for axisY are flipped due to the rotation of the axisY title by 90 degrees.
//     // Therefore changing the x value moves up/down the chart, while changing y moves left/right.
//     offset: { x: 0, y: 0 },
  
//     // Defines the anchoring of the title text. Possible values are 'start', 'end' and 'middle'.
//     textAnchor: "middle",
  
//     // Whether to flip the direction of the text. Note - This can only be used on axis Y.
//     flipTitle: false
//   }