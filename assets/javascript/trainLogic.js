
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

    //Page is loaded 
    //????
    database.ref().on("value", function(snapshot){

      console.log(snapshot.val()); 

      console.log(snapshot.val().trainName); 

        //$("#train-table > tbody").append("<tr><td>" + snapshot.val().Name + "</td><td>" + snapshot.val().Destination + "</td><td>" +
        //snapshot.val().Frequency + "</td><td>" + snapshot.val().Nexttrain + "</td><td>" + snapshot.val().Minutesaway+ "</td></tr>");
    }); 

    //Click Submit 
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

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-time-input").val("");
      $("#frequency-input").val("");
 
    // Uploads train data to the database
     database.ref().push(newTrain);

     //Ever time a child is added to the server 
     // adding the new one by # of ele in db?????
     database.ref().on("child_added", function(snapshot){

        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway+ "</td></tr>");

    }); 
 
  // Prevents moving to new page
  return false;
});
