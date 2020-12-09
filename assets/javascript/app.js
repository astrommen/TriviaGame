$(document).ready(function () {
	//Persistent global variables
	// var count = 30;
	// var interCount = 30;
	var correctScore = 0;
	var wrongScore = 0;
	var timedOutScore = 0;
	var questionIndex = 0;

	//The array of questions for out game
	var questions = [
		{
			q: "Which house was Harry Potter sorted into?",
			a: ["Ravenclaw", "Gryffindor", "Hufflepuff", "Slytherin"],
			correct: "Gryffindor",
			img:
				"https://www.bing.com/th/id/OIP.T74hl6yd9lFGbTRZvgxHbgHaJl?w=170&h=220&c=7&o=5&pid=1.7",
		},
		{
			q: "What is the name of the Harry's Wizard School?",
			a: ["Beauxbatons", "Hogwarts", "Ilvermorny", "Durmstrang"],
			correct: "Hogwarts",
			img:
				"http://cdn4.tillthemoneyrunsout.com/wp-content/uploads/2015/11/Hogwarts-Castle-as-Seen-from-Dragon-Challenge-Line-Visiting-Harry-Potter-World-Orlando1-980x653.jpg",
		},
		{
			q: "Who is Harry's godfather?",
			a: [
				"Sirius Black",
				"Severus Snape",
				"Michael Corleone",
				"Albus Dumbledore",
			],
			correct: "Sirius Black",
			img:
				"https://www.bing.com/th/id/OIP.ox1jAApUxSRAGc4jTocO-QHaJk?w=201&h=261&c=7&o=5&pid=1.7",
		},
		{
			q: "What position did Harry play in Quidditch?",
			a: ["Beater", "Keeper", "Seeker", "Chaser"],
			correct: "Seeker",
			img:
				"https://www.bing.com/th/id/OIP.WsXEFd7WhIHA4sL_80z1YwHaGl?w=202&h=176&c=7&o=5&pid=1.7",
		},
		{
			q: "What Hogwarts House did everyone hate?",
			a: ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"],
			correct: "Slytherin",
			img:
				"https://www.bing.com/th/id/OIP.hY9yWy3Z9lR8HlzsLrn27wHaHa?w=192&h=186&c=7&o=5&pid=1.7",
		},
		{
			q: "Who was Harry Potter's nemesis?",
			a: ["Grindlewald", "Voldemort", "Knights of Nee", "Beedle the Bard"],
			correct: "Voldemort",
			img:
				"https://www.bing.com/th/id/OIP.0QQ_4FXNxGIWQoL4v_l3XgHaEK?w=251&h=160&c=7&o=5&pid=1.7",
		},
	];

	// $('button').click(function(){
	//   $(".jumbotron").toggle();
	// })

	function nextQuestion() {
		//If there are more questions, show next one
		if (questionIndex <= questions.length - 1) {
			//writes question to html question box in html dynamically
			$("#question").html(questions[questionIndex].q);

			answer(); //refreshes ans btns to match new questions
		} else {
			//no more questions

			stop(); //stops html timer

			$(".answerBox").empty(); //empties the ans div, so btns dont stack

			$("#question").text("Game Over!");

			//when all questions are "answered"
			$(".answerBox").html(
        "You got " + correctScore + " correct!<br>" + 
        "You got " + wrongScore + " countwrong!<br>" +
				"You missed " + timedOutScore
			);
		}
	}

	function answer() {
		$(".answerBox").empty(); //empties the ans div, so btns dont stack

		//loop through index in answer and grab the value
		$.each(questions[questionIndex].a, function (index, value) {
			var ansBtn = $("<button>")
				.text(value)
				.addClass("ansBtn")
				.attr("data-name", value); //creates new button with answer

			$(".answerBox").append(ansBtn); //appends new btn to answerBox div
		});

		run(); //restarts html timer after each ans
	}

	//Event listening for any click in the document with class ansBtn
	$(document).on("click", ".ansBtn", function () {
		var x = $(this).attr("data-name"); //variable to grab btn value
		console.log(x);

		var ansImg = $("<img src=" + questions[questionIndex].img + "/>");

		//comparison of user choice to correct answer
		if (x === questions[questionIndex].correct) {
			correctScore++; //if correct, adds one to the score
			$("#question").text("Correctomundo!");
		} else {
			wrongScore++; //if wrong, adds one to wrong score
			$("#question").text("Nope-ski!");
		}

		stop();

		questionIndex++; //either way adds one to question index for nextQues function below

		$(".answerBox").html(ansImg);

		setTimeout(nextQuestion, 3000);
	});

	//Beginning of Clock Functions
	function run() {
		//full timer function
		// let count = 31; //reset html count to 30 each time
		//resets timer to stop extra instances
		// clearInterval(interCount);

		// stop();
		//timer decreasing each second
		setInterval(decrement, 1000);

		//Countdown Timer in webpage
		// $(".timerBox").html("Time Remaining: " + interCount + " seconds");
	}

	function decrement() {
		//decrement function used in run function above
		console.log(interCount);
		console.log("inside decrement");
		let interCount = 31;
		//decrease var timer by 1
		interCount--;

		//Countdown Timer in webpage
		$(".timerBox").html("Time Remaining: " + interCount + " seconds");

		//what happens when time and var timer reaches zero
		if (interCount == 0) {
			stop(); //stops the clock

			alert("Time's Up!");

			timedOutScore++; //adds one to missed score
			questionIndex++; //adds one to question index for nextQues function below

			nextQuestion();
		}
	}

	function stop() {
		//stops timer
		clearInterval(interCount); //resets/stop timer to stop extra instances
	}
	//End of clock functions

	//Initializes Game
	$("#start").click(function () {
		// $(".jumbotron").toggle(); // shows question box
		run(); // call to start timer & all associated functions

		$(this).hide(); //hides start button after click

		nextQuestion(); //shows question
	});
});
