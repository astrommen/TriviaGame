$(document).ready(function() {

    //Persistent global variables
    // var count = 30;
    var interCount;
    var correctScore = 0;
    var wrongScore = 0;
    var timedOutScore = 0;
    var questionIndex = 0;

    //The array of questions for out game
    var questions = [
        { q: "Which house was Harry Potter sorted into?", 
            a: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
            correct: "Gryffindor"},
        { q: "What is the name of the Harry's Wizard School?", 
            a: ["Hogwarts", "Beauxbatons", "Ilvermorny", "Durmstrang"],
            correct: "Hogwarts"},
        { q: "Who is Harry's godfather?", 
            a: ["Sirius Black", "Sneverus Snape", "Tonks", "Albus Dumbledore"],
            correct: "Sirius Black"},
    ];

    function nextQuestion() {
        
        //If there are more questions, show next one
        if (questionIndex <= (questions.length - 1)) {
            
            $("#question").html(questions[questionIndex].q);
            console.log(questions[questionIndex].q);
            console.log(questions[questionIndex].a);
            console.log(questions[questionIndex]);

            answer();
            
            
        } else {
            var score = $("<p>");
            stop();
            $(".answerBox").empty();
            $("#question").text("Game Over!");
            score.text("You got " + correctScore + "<br>");
            $(".answerBox").append(score);


        }

    }
    
    function answer(){

        $(".answerBox").empty();
        // run();
        
        //loop through index in answer and grab the value
        $.each(questions[questionIndex].a, function(index, value) {
            // console.log(index + value);
            
            var ansBtn = $("<button>").text(value).addClass("ansBtn").attr("data-name", value);//creates new button with answer
            
            $(".answerBox").append(ansBtn);//appends new btn to answerBox div
        });
        
        run();
    }

    $(document).on("click", ".ansBtn", function(){
        alert("I've been clicked");

        var x = $(this).attr("data-name");
        console.log(x);
        
        
        if (x === questions[questionIndex].correct) {
            alert("it is correct");
            correctScore++;
        } else {
            wrongScore++;
        }
        
        questionIndex++;
        nextQuestion();
        
        
    });
    

    function run() { //full timer function
        count = 30;
        
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
            questionIndex++;
            nextQuestion();
        }

    }

    function stop(){ //stops timer
        clearInterval(interCount);
    }

    //Initializes Game
    $("#start").click(function(){
        run(); // call to start timer & all associated functions
        
        $(this).hide(); //hides start button after click
              
        
        nextQuestion(); //shows question
        
    });
    
    console.log(correctScore);
    console.log(wrongScore);
    console.log(timedOutScore);

    
});