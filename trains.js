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

    var trainName = $("#trainName-input").val().trim()
    var destination = $("#destination-input").val().trim()
    var firstTrainTime = $("#firstTrainTime-input").val().trim()
    var frequency = $("#frequency-input").val().trim()

    // var userDataUnix = userDate.format();
    // console.log(userDataUnix);

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


    //.text replaces the text on a  page
    // Console.logging the last user's data
    console.log(sv.tname);
    console.log(sv.tdestination);
    console.log(sv.tfirstTrainTime);
    console.log(sv.tfrequency);
    // console.log(sv.dateAdded);

////////////////////////////////////////////////
//////START HERE WITH MOMENT FOR FUNCTIONS/////

    // var subtracted = moment().subtract(sv.date).format("month");
    var subtracted = moment().diff(sv.date, 'months');

    console.log("Moment =" + moment().format('MM/DD/YYYY'));
    console.log("UserMonth =" + subtracted);

    var total = subtracted * sv.rate;

    // Change the HTML to reflect
    $("tbody").append("<tr>  <td > " + sv.name + " </td>" +
        "<td> " + sv.role + " </td>" +
        "<td> " + sv.date + " </td>" +
        "<td> " + subtracted + " </td>" +
        "<td>  $" + sv.rate + " </td>" +
        "<td>  $" + total + " </td> </tr>"
    );



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});