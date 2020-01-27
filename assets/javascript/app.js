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
            
            //writes question to html question box in html dynamically
            $("#question").html(questions[questionIndex].q);

            answer(); //refreshes ans btns to match new questions   
            
        } 
        else { //no more questions
            
            stop(); //stops html timer

            $(".answerBox").empty();//empties the ans div, so btns dont stack
            
            $("#question").text("Game Over!");
            
            //when all questions are "answered"					
            $(".answerBox").html("You got " + correctScore + " correct!<br>"  
            
                                + "You got " + wrongScore + " wrong!<br>" 

                                + "You missed " + timedOutScore);

        }
    }
    
    function answer(){

        $(".answerBox").empty(); //empties the ans div, so btns dont stack
               
        //loop through index in answer and grab the value
        $.each(questions[questionIndex].a, function(index, value) {
            
            var ansBtn = $("<button>").text(value).addClass("ansBtn").attr("data-name", value);//creates new button with answer
            
            $(".answerBox").append(ansBtn);//appends new btn to answerBox div
        });
        
        run(); //restarts html timer after each ans
    }

    //Event listening for any click in the document with class ansBtn
    $(document).on("click", ".ansBtn", function(){

        var x = $(this).attr("data-name"); //variable to grab btn value
        console.log(x);
        
        //comparison of user choice to correct answer
        if (x === questions[questionIndex].correct) {
            
            correctScore++; //if correct, adds one to the score

        } else {

            wrongScore++; //if wrong, adds one to wrong score

        }
        
        questionIndex++; //either way adds one to question index for nextQues function below
        nextQuestion();               
    });
    
    //Beginning of Clock Functions
    function run() { //full timer function
        count = 30; //reset html count to 30 each time
        
        //resets timer to stop extra instances
        clearInterval(interCount);
        
        //timer decreasing each second
        interCount = setInterval(decrement, 1000);

    }

    function decrement() { //decrement function used in run function above
        
        //decrease var timer by 1
        count--;

        //Countdown Timer in webpage
        $(".timerBox").html("Time Remaining: " + count + " seconds");

        //what happens when time and var timer reaches zero
        if (count === 0 ) {

            stop(); //stops the clock
            alert("Time's Up!");
            questionIndex++; //adds one to question index for nextQues function below
            nextQuestion();
        }
    }

    function stop(){ //stops timer
        clearInterval(interCount);//resets/stop timer to stop extra instances
    }
    //End of clock functions

    //Initializes Game
    $("#start").click(function(){

        run(); // call to start timer & all associated functions
        
        $(this).hide(); //hides start button after click
              
        nextQuestion(); //shows question
        
    });
       
});