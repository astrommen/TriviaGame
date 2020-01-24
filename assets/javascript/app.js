$(document).ready(function() {

    //Persistent global variables
    var count = 30;
    var interCount;
    var correctScore = 0;
    var questionIndex = 0;

    //The array of questions for out game
    var questions = [
        { q: "Which house was Harry Potter sorted into?", a: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]},
        { q: "What is the name of the Harry's Wizard School?", a: ["Hogwarts", "Beauxbatons", "Ilvermorny", "Durmstrang"]},
        { q: "Who is Harry's godfather?", a: ["Sirius Black", "Sneverus Snape", "Tonks", "Albus Dumbledore"]},
    ];

    function nextQuestion(){
        //If there are more questions, show next one
        if (questionIndex <= (questions.length - 1)) {
            $("#question").textContent = questions[questionIndex].q;
            console.log(questions[questionIndex].q);
        } else {
            $(".answerBox").textContent = "Game Over!";
        }
    }
    //Hides Start button
    $("#start").click(function(){
        $(this).hide();
        
        function run() {
            clearInterval(interCount);
            interCount = setInterval(decrement, 1000);
        }
        function decrement() {
            count--;

            //Countdown Timer
            $(".timerBox").html("Time Remaining: " + count + " seconds");

            if (count === 0 ) {
                stop();
                alert("Time's Up!");
            }
        }
        function stop(){
            clearInterval(interCount);
        }

        
        run();
        
        nextQuestion();
        
    });
    

    
});