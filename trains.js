// Initialize Firebase (my own API)
  var config = {
    apiKey: "AIzaSyBn8Nr0kU6o9oIbC-Zl7FdwD_FSfpLFD8Y",
    authDomain: "trainscheduler-58b23.firebaseapp.com",
    databaseURL: "https://trainscheduler-58b23.firebaseio.com",
    projectId: "trainscheduler-58b23",
    storageBucket: "trainscheduler-58b23.appspot.com",
    messagingSenderId: "261490029721"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();


// Capture Button Click
$("#add-train").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#firstTrainTime-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
        tname: trainName,
        tdestination: destination,
        tfirstTrainTime: firstTrainTime,
        tfrequency: frequency,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.logging the last user's data
    console.log(sv.tname);
    console.log(sv.tdestination);
    console.log(sv.tfirstTrainTime);
    console.log(sv.tfrequency);

////////////////////////////////////////////////
//////START HERE WITH MOMENT FOR FUNCTIONS/////

    //FREQUENCY = sv.tfrequency
    //start train tme = sv.tfirstTrainTime;
    // First Time (pushed back 1 year to make sure it comes before current time); 

    //display first train time in military time
    var tfirstTrainTimeConverted = moment(sv.tfirstTrainTime, "HH:mm").subtract(1, "years");
    console.log(tfirstTrainTimeConverted);

    //get current time in military time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(tfirstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder) 
    //this is MODULUS (%) the remainder
    var tRemainder = diffTime % sv.tfrequency;
    console.log(diffTime % sv.tfrequency);

    // Minute Until Train
    var tMinutesTillTrain = sv.tfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextArrive = moment(nextTrain).format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));


    // Change the HTML to reflect
    $("tbody").append("<tr>  <td > " + sv.tname + " </td>" +
        "<td> " + sv.tdestination + " </td>" +
        "<td> " + sv.tfrequency + " </td>" +
        "<td> " + nextArrive + " </td>" +
        "<td> " + tMinutesTillTrain + " </td></tr>" 
    );
  
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});