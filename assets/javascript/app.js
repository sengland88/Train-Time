    var firebaseConfig = {
    apiKey: "AIzaSyCv9i6ZP91anh7PObRhsQ3pbL_-DhAcS3g",
    databaseURL: "https://train-time-72588.firebaseio.com",
    };

    firebase.initializeApp(firebaseConfig);
    
    let database = firebase.database();
    
    var theName = "";
    var theDestination = "";
    var theFirst;
    var theFreq = 0;
    
    $("#submitBtn").on("click" , function(event) {
    
        event.preventDefault()
    
        let theName = $("#train-name-input").val().trim()
        let theDestination = $("#destination-input").val().trim()
        let theFirst = $("#train-time-input").val().trim()
        let theFreq = $("#freq-input").val().trim()
    
        console.log(theName)
        console.log(theDestination)
        console.log(theFirst)
        console.log(theFreq)
    
        database.ref().push({
            theName: theName,
            theDestination: theDestination,
            theFirst: theFirst,
            theFreq: theFreq,
        })
    
        
    })
    
    database.ref().on("child_added", function(snapshot){
        
        let sv = snapshot.val();
        let train = sv.theName
        let destination = sv.theDestination
        let frequency = sv.theFreq
        let time = sv.theFirst
        let currentTime = moment(time, "LT").format("LT").toString()

        
        console.log(train)
        console.log(destination)
        console.log(frequency)
        console.log(time)
        console.log(currentTime)
        

        let newTime = moment(time, "LT").add(frequency, "m").format(`LT`).toString()
        console.log(newTime)
    
        let tRow = $("<tr>")
    
        let theName = $("<td>").text(sv.theName)
        let theDest = $("<td>").text(sv.theDestination)
        let theFreq = $("<td>").text(sv.theFreq)
        let theNext = $("<td>").text(newTime)
        // let theRate = $("<td>").text(sv.theRate)    
    
        // let theMoney = $("<td>").text(theAmount)
    
        tRow.append(theName, theDest, theFreq, theNext)
    
        tRow.appendTo("#newTrain");
        
    })
    