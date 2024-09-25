let container = document.querySelector(".container");
let bullets = document.querySelector(".bullets");

if (!localStorage.getItem("score")) {
    localStorage.setItem("score", 0);
}

function getQuestions() {
    let req = new XMLHttpRequest();
    req.open("GET", "questions.json");
    req.send();
    req.onload = () => {
        let obj = JSON.parse(req.responseText);
        let index = indexIncrement();
        if (index < obj.length) {
            bulletDraw(obj, index);
            addQuestions(obj, index);
        } else {
            container.innerHTML = `Score is ${localStorage.getItem("score")} / ${obj.length}`;
            bullets.remove();
            document.querySelector(".again").style.display = "block";
            document.querySelector("button").remove();
        }
    }
}
getQuestions();

function addQuestions(obj, index) {
    container.innerHTML = 
    `
        <h2>${index + 1}. ${obj[index].title}</h2>
        <div class="rows">
            <div class="row" id="row1" onclick="select(this.id)">${obj[index].answer_1}</div>
            <div class="row" id="row2" onclick="select(this.id)">${obj[index].answer_2}</div>                
            <div class="row" id="row3" onclick="select(this.id)">${obj[index].answer_3}</div>
            <div class="row" id="row4" onclick="select(this.id)">${obj[index].answer_4}</div>
        </div>
    `;


    document.querySelector(".submit").onclick = () => {
        if (localStorage.getItem("select") === obj[index].right_answer) {
            let score = parseInt(localStorage.getItem("score"));
            score++;
            localStorage.setItem("score", score);
        }
        localStorage.setItem("select", ""); 
        getQuestions(); 
    };
}

function select(id) {
    let row = document.getElementById(`${id}`);
    let rows = document.querySelectorAll(".row");
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains("selected")) {
            rows[i].classList.remove("selected");
        }
    }
    row.classList.add("selected");
    localStorage.setItem("select", row.innerHTML);
}

function indexIncrement() {
    let count = localStorage.getItem("count") ? parseInt(localStorage.getItem("count")) : 0;
    localStorage.setItem("count", count + 1);  
    return count;  
}

function bulletDraw(obj, num) {
    bullets.innerHTML = ""; 
    for (let i = 0; i < obj.length; i++) {
        let span = document.createElement("span");
        bullets.appendChild(span);
    }
    if (num < bullets.children.length) {
        for (let i = 0; i <= num; i++) {
            bullets.children[i].classList.add("on"); 
        }
    }
    document.querySelector(".qcount span").innerHTML = obj.length;
}

document.querySelector(".again").onclick = () => {
    location.reload();
    localStorage.setItem("count", 0);
}

window.onunload = () => {
    localStorage.clear();
}
