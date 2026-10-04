import { supabase } from "./supabase.js";

const calendar = document.getElementById("calendar");
const popup = document.getElementById("popup");
const selectedDate = document.getElementById("selectedDate");
// FIX: Grab the monthYear header element so we can display the current month
const monthYearText = document.getElementById("monthYear"); 

const fileInput = document.querySelector("input[type='file']");
const textInput = document.querySelector("textarea");
// FIX: Target the specific ID for the save button, not just the first generic "button"
const saveBtn = document.getElementById("saveBtn"); 

let currentDate = "";

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

function renderCalendar(){
    // FIX: Update the text header dynamically every time the calendar renders
    monthYearText.innerText = `${months[month]} ${year}`;

    calendar.innerHTML = "";

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    for(let i = 0; i < firstDay; i++){
        let empty = document.createElement("div");
        empty.classList.add("empty");
        calendar.appendChild(empty);
    }

    for(let day = 1; day <= daysInMonth; day++){
        let box = document.createElement("div");
        box.classList.add("day");
        box.innerText = day;

        box.onclick = async () => {
            currentDate = `${year}-${month+1}-${day}`;
            selectedDate.innerText = currentDate;
            popup.style.display = "block";

            const { data } = await supabase
                .from("memories")
                .select("*")
                .eq("date", currentDate)
                .single();

            if(data){
                textInput.value = data.text || "";
            } else {
                textInput.value = "";
            }
        };

        calendar.appendChild(box);
    }
}

// Initial call to draw the calendar on screen
renderCalendar();

// FIX: Add event listeners to your previous and next buttons so you can change months
document.getElementById("prev").onclick = () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    renderCalendar();
};

document.getElementById("next").onclick = () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    renderCalendar();
};

// Save memory logic
saveBtn.onclick = async () => {
    let file = fileInput.files[0];
    let imageUrl = "";

    if(file){
        const fileName = `${Date.now()}-${file.name}`;

        await supabase.storage
            .from("images")
            .upload(fileName, file);

        const { data } = supabase.storage
            .from("images")
            .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
    }

    await supabase
        .from("memories")
        .upsert({
            date: currentDate,
            text: textInput.value,
            image: imageUrl
        });

    popup.style.display = "none";
};