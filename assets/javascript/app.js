$(document).ready(function() {

    //Persistent global variables
    var count = 30;
    var interCount;
    var correctScore = 0;
    var questionIndex = 0;

    //The array of questions for out game
    var questions = [
        { q: "Which house was Harry Potter sorted into?", 
            a: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]},
        { q: "What is the name of the Harry's Wizard School?", 
            a: ["Hogwarts", "Beauxbatons", "Ilvermorny", "Durmstrang"]},
        { q: "Who is Harry's godfather?", 
            a: ["Sirius Black", "Sneverus Snape", "Tonks", "Albus Dumbledore"]},
    ];

    function nextQuestion() {

        //If there are more questions, show next one
        if (questionIndex <= (questions.length - 1)) {

            $("#question").html(questions[questionIndex].q);
            console.log(questions[questionIndex].q);

        } else {

            $(".answerBox").textContent = "Game Over!";

        }
    }

    function run() { //full timer function
        
        //resets timer to stop extra instances
        clearInterval(interCount);
        
        //time decreasing each second
        interCount = setInterval(decrement, 1000);

    }

    function decrement() { //decrement function used in run function above
        
        //decrease var timer by 1
        count--;

        //Countdown Timer in webpage
        $(".timerBox").html("Time Remaining: " + count + " seconds");

        //what happens when time and var timer reaches zero
        if (count === 0 ) {
            stop(); 
            alert("Time's Up!");
        }

    }

    function stop(){ //stops timer
        clearInterval(interCount);
    }

    //Initializes Game
    $("#start").click(function(){
        
        $(this).hide(); //hides start button after click
              
        run(); // call to start timer & all associated functions
        
        nextQuestion(); //shows question
        
    });
    

    
});