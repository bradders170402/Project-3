const questionArray = [
  {
    question: "What does the '<section>' element in HTML represent?",
    options: [
      "A block of navigation links",
      "A generic container for styling",
      "A thematic grouping of content",
      "Inline text formatting"
    ],
    correctAnswer: 2
  },
  {
    question: "Which CSS property controls text color?",
    options: ["background-color", "font-size", "color", "display"],
    correctAnswer: 2
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlink Text Markup Language",
      "Hyper Text Markup Language",
      "Hyper Transfer Markup Language",
      "None of the above"
    ],
    correctAnswer: 1
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correctAnswer: 0
  },
  {
    question: "What is the correct syntax to refer to an external stylesheet?",
    options: [
      "<style src='styles.css'>",
      "<link rel='stylesheet' href='styles.css'>",
      "<stylesheet>styles.css</stylesheet>",
      "<style href='styles.css'>"
    ],
    correctAnswer: 1
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["background-color", "color", "bgcolor", "background-style"],
    correctAnswer: 0
  },
  {
    question: "What does the 'flex' value in CSS display property do?",
    options: [
      "Hides the element",
      "Displays elements inline",
      "Creates a flexible layout",
      "Centers content horizontally"
    ],
    correctAnswer: 2
  },
  {
    question: "Which HTML element is used to embed a video?",
    options: ["<video>", "<media>", "<embed>", "<movie>"],
    correctAnswer: 0
  },
  {
    question: "How do you apply a class selector in CSS?",
    options: [
      ".classname {}",
      "#classname {}",
      "classname {}",
      "*classname {}"
    ],
    correctAnswer: 0
  },
  {
    question: "What does the CSS 'z-index' property control?",
    options: [
      "The stacking order of elements",
      "Element visibility",
      "The element width",
      "The background opacity"
    ],
    correctAnswer: 0
  }
];

let currentQuestion = 0;
let selectedAnswers = new Array(questionArray.length).fill(null);

const renderQuestion = () => {
  const questionElement = document.getElementById("quiz-question");
  const optionsElement = document.getElementById("quiz-options");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  questionElement.innerHTML = "";
  optionsElement.innerHTML = "";

  questionElement.textContent = questionArray[currentQuestion].question;

  questionArray[currentQuestion].options.forEach((option, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "radio";
    input.name = "answer";
    input.value = index;
    input.checked = index === selectedAnswers[currentQuestion];

    input.addEventListener("change", () => {
      selectedAnswers[currentQuestion] = parseInt(input.value);
    });

    label.appendChild(input);
    label.append(` ${option}`);
    optionsElement.appendChild(label);
  });

  prevButton.disabled = currentQuestion <= 0;
  nextButton.textContent =
    currentQuestion === questionArray.length - 1 ? "Submit" : "Next";
};

const calculateScore = () => {
  let score = 0;
  selectedAnswers.forEach((answer, index) => {
    if (answer === questionArray[index].correctAnswer) {
      score++;
    }
  });
  return score;
};

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (!selectedOption) {
    alert("Please select an answer before proceeding!");
    return;
  }

  selectedAnswers[currentQuestion] = parseInt(selectedOption.value);

  if (currentQuestion < questionArray.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    let finalScore = calculateScore();
    alert(
      `Quiz submitted! Your final score is: ${finalScore}/${questionArray.length}`
    );

    document.getElementById("next-btn").disabled = true;
    document.getElementById("prev-btn").disabled = true;

    let restartBtn = document.getElementById("restart-btn");
    restartBtn.style.opacity = "1";
    restartBtn.style.visibility = "visible";
    restartBtn.style.display = "inline-block";
  }
});

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  selectedAnswers.fill(null);

  document.getElementById("next-btn").disabled = false;
  document.getElementById("prev-btn").disabled = true;

  let restartBtn = document.getElementById("restart-btn");
  restartBtn.style.opacity = "0";
  restartBtn.style.visibility = "hidden";
  restartBtn.style.display = "none";

  renderQuestion();
});

renderQuestion();
