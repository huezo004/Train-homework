// Initialize Firebase
     var config = {
      apiKey: "AIzaSyDf-SrrW_46NRT7kWoMluQ4_B21E3RH2Kc",
      authDomain: "train-database-e5171.firebaseapp.com",
      databaseURL: "https://train-database-e5171.firebaseio.com",
      projectId: "train-database-e5171",
      storageBucket: "train-database-e5171.appspot.com",
      messagingSenderId: "39855625776"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

   $(document).ready(function(){

     $("#add-train-btn").on("click", function(event) {

     event.preventDefault();

     // Grabs user input
      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var firstTime = moment($("#first-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequency-input").val().trim();

      //Creating train object 
      var newTrain = {

        trainName: trainName,

        trainDest: trainDest,

        firstTime: firstTime, 

        frequency: frequency, 

      };

        database.ref().push(newTrain);

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("");
  
        return false;
  });

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    var trainName   = childSnapshot.val().trainName;
    var destination = childSnapshot.val().trainDest;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;


    var timeDifference = moment().diff(moment.unix(firstTime), "minutes");
    var minutesAway = frequency - (timeDifference % frequency);
    var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
    

    // Adds train data to table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");
       
       }); 

});





