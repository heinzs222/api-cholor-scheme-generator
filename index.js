const colorsEl = document.getElementsByClassName("col");
const dropDownEl = document.getElementsByClassName("dropdown-list");
const colorTextEl = document.getElementsByClassName("color-text");

const getColorsEl = document.getElementById("get-color-scheme");
const schemeModeEl = document.getElementById("scheme-modes");
const colorPicker = document.getElementById("color-picker");

const options = {
    method: "GET",

    headers: {
        "Content-Type": "application/json",
    },
};

for (let i = 0; i < dropDownEl.length; i++) {
    dropDownEl[i].addEventListener("click", () => {
        schemeModeEl.textContent = dropDownEl[i].textContent;
    });
}
function render(data, array1, array2) {
    let colorsArray = [];
    data.colors.map((el) => {
        return colorsArray.push(el.hex.value);
    });
    for (let i = 0; i < array1.length; i++) {
        array1[i].style.backgroundColor = colorsArray[i];
        array2[i].textContent = colorsArray[i];
    }
}
getColorsEl.addEventListener("submit", (e) => {
    e.preventDefault();

    let test = colorPicker.value.slice(1);
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${test}&mode=${schemeModeEl.textContent}&count=5`,
        options
    )
        .then((res) => res.json())
        .then((data) => {
            render(data, colorsEl, colorTextEl);
        });
});
