    let trainInfo = []
    let seconds = 60

    
    let refreshTrains = setInterval(timerUpdate, 1000)
    
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
        
        let timeString = theFirst;
        let regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g; //created regex with the help of my tutor to validate that the time input was correctly inputted
        let doesMatch = !!(timeString.match(regex)); 

        console.log(doesMatch);

        if (
            theName === "" ||        
            theDestination === "" ||        
            theFirst === "" || 
            theFreq === ""
            ) { 
            console.log("something is empty")
            $("#theMessage").show().text("Please Complete All Fields")
            return
        }

        if (!doesMatch) {
            console.log("needs to be a number")
            $("#theFormat").text("Please use the correct format.")
            return
        } else {
            $("#theFormat").hide()
        }

        if (isNaN(theFreq)) {
            console.log("needs to be a number")
            $("#theFormat2").text("Please use the correct format.")
            return
        } else {
            $("#theFormat2").hide()
        }

        $("#theMessage").hide()
        $("#theFormat").hide()
        $("#theFormat2").hide()
    
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
        
        $("#train-name-input").val("")
        $("#destination-input").val("")
        $("#train-time-input").val("")
        $("#freq-input").val("")

    })  
    
    database.ref().on("child_added", function(snapshot){
        
        trainInfo.push(snapshot.val())
        processTrainData()
        // console.log(snapshot.val())
        // console.log(trainInfo)
        
    })

    function processTrainData() {

        $("tbody").empty()

        for (let i = 0 ; i <trainInfo.length ;i++ ) {
            let sv = trainInfo[i]

            console.log(sv)
            let train = sv.theName
            let destination = sv.theDestination
            let frequency = sv.theFreq
            let time = sv.theFirst
            let theCurrentTime = moment(time, "LT").format("LT").toString()
        
            let regTime = moment(time, 'HH:mm').format('hh:mm a')
            console.log(`this is ${regTime} time.`)
            
            console.log(train)
            console.log(destination)
            console.log(frequency)
            console.log(time)
            console.log(theCurrentTime)
        
            let firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");        
            let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            let tRemainder = diffTime % frequency;
            let tMinutesTillTrain = frequency - tRemainder;
            let nextTrain = moment().add(tMinutesTillTrain, "minutes");
            let theNextTrain = moment(nextTrain).format("hh:mm a")
        
            let tRow = $("<tr>")
        
            let theName = $("<td>").text(sv.theName)
            let theDest = $("<td>").text(sv.theDestination)
            let theFirstRun = $("<td>").text(regTime)
            let theFreq = $("<td>").text(sv.theFreq)            
            let theNext = $("<td>").text(theNextTrain)
            let theMin = $("<td>").text(tMinutesTillTrain)        
      
            tRow.append(theName, theDest, theFirstRun, theFreq, theNext, theMin)
        
            tRow.appendTo("#newTrain");

        }        

    }

    function timerUpdate() {

        seconds--

        $("#seconds").text(`${seconds} Seconds`)

        if (seconds === 1) {
            $("#seconds").text(`${seconds} Second`)
        }

        if (seconds === 0) {
            seconds = 60
            processTrainData()            
        }
        
    }