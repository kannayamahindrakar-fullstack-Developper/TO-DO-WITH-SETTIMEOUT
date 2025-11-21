let inputtask = document.querySelector("#inputtask");
let addbtn = document.querySelector("#addbtn");
let tasklist = document.querySelector("#tasklist");

addbtn.addEventListener("click", addTask);

function addTask() {
    if (inputtask.value.trim() === "") {
        alert("Please enter the task");
        return;
    }

  
    let time = prompt("Set timer in seconds for this task:");
    if (time === null || time.trim() === "" || isNaN(time) || time <= 0) {
        alert("Invalid time! Task added without timer.");
        time = null;
    }

  
    let li = document.createElement("li");

    li.innerHTML = `
        <span>${inputtask.value}</span>

        <div class="timerBox">
            ${time ? `<span class="timer">${time}s</span>` : ""}
        </div>

        <div class="btns">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    tasklist.appendChild(li);
    inputtask.value = "";

    
    let editBtn = li.querySelector(".edit");
    let deleteBtn = li.querySelector(".delete");
    let timerSpan = li.querySelector(".timer");

    editBtn.addEventListener("click", function () {
        let span = li.querySelector("span");
        let newText = prompt("Edit your task:", span.textContent.trim());
        if (newText && newText.trim() !== "") {
            span.textContent = newText;
        }
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

   
    if (time) {
        let remaining = parseInt(time);

        let interval = setInterval(() => {
            remaining--;
            timerSpan.textContent = remaining + "s";

            if (remaining <= 0) {
                clearInterval(interval);

                timerSpan.textContent = "Time Up!";
                timerSpan.style.color = "red";

                setTimeout(() => {
                    li.remove();
                }, 800); 
            }

        }, 1000);
    }
}
