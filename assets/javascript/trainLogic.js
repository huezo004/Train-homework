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
      var firstTime = $("#first-time-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

    // Set FirstTime 
      var firstTimeConverted= moment(firstTime, "hh:mm").subtract(1, "years"); 
       // Current Time  
      var currentTime= moment(); 
      //Diff between current the times
      var diffTime= moment().diff(moment(firstTimeConverted), "minutes"); 
      //Time apart 
      var tRemainder= diffTime % frequency; 
      //minutes until train 
      var minutesAway= frequency- tRemainder; 
      //Next Train 
      var nextTrain = moment().add(minutesAway, "minutes"); 
      //Next Train format 
      nextTrain= nextTrain.format("hh:mm"); 

      //Creating train object 
      var newTrain = {

        trainName: trainName,

        trainDest: trainDest,
        frequency: frequency, 

        nextTrain: nextTrain,  

        minutesAway: minutesAway
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
    var firstTrain = childSnapshot.val().nextTrain;
    var frequency = childSnapshot.val().frequency;

    //  next train arrives
    var timeDifference = moment().diff(moment.unix(firstTrain), "minutes");

    var minutesAway = frequency - (timeDifference % frequency);
    
    var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');

    // Adds train data to table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");
       
       }); 

});





