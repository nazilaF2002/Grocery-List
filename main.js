let list = [];

let gotItem = localStorage.getItem('array');
if (gotItem) {
  let __newlist = JSON.parse(gotItem);
  list = __newlist;
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    let label = ``;
    if (list[i].catagori === 'dairy') {
      label = `<span class="bg-green-100 py-1 px-4 shadow rounded-2xl">${list[i].catagori}</span>`;
    } else if (list[i].catagori === 'fruit') {
      label = ` <span class="bg-pink-100 py-1 px-4 shadow rounded-2xl">${list[i].catagori}</span>`;
    } else if (list[i].catagori === 'grain') {
      label = ` <span class="  bg-yellow-100 py-1 px-4 shadow rounded-2xl">${list[i].catagori}</span>`
    }
    let listItem = `<li class="flex gap-2 mt-3 ml-3 border-b border-gray-200 p-2">
    <span class="hover:cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg> 
    </span> 
    ${list[i].name}
    ${label}  
  </li>`;
    document.querySelector("#list-items").innerHTML += listItem;
  }
}


document.querySelector("#add-button").addEventListener("click", (e) => {
  e.preventDefault();
  add();
});

function add() {
  console.log("Running add function");
  let inputText = document.querySelector("#input").value;
  let dropdown = document.querySelector("#option").value;
  if (isValidated()) {
    let label = ``;
    if (dropdown === 'dairy') {
      label = `<span class="bg-green-100 py-1 px-4 shadow rounded-2xl">${dropdown}</span>`;
    } else if (dropdown === 'fruit') {
      label = ` <span class="bg-pink-100 py-1 px-4 shadow rounded-2xl">${dropdown}</span>`;
    } else if (dropdown === 'grain') {
      label = ` <span class="  bg-yellow-100 py-1 px-4 shadow rounded-2xl">${dropdown}</span>`
    }

    let liItem = `<li class="flex gap-2 mt-3 ml-3 border-b border-gray-200 p-2">
    <span  class="hover:cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg> 
    </span> 
    ${inputText}
    ${label}  
  </li>`;
    document.querySelector("#list-items").innerHTML += liItem;
    let listItem = {
      name: inputText,
      catagori: dropdown
    }
    list.push(listItem);
    let newList = JSON.stringify(list);
    localStorage.setItem("array", newList);
    console.log(list);
    document.querySelector("#input").value = '';
    document.querySelector("#option").value = '';
  } else {
    console.log("no validate input");
  }
}

function isValidated() {
  console.log("Running isValidated function");
  let isValid = false;
  let inputText = document.querySelector("#input").value.trim();
  let dropdown = document.querySelector("#option").value;

  if (inputText.length > 0 && dropdown.length > 0) {
    isValid = true;
    document.querySelector("#option").classList.remove("border-red-500");
    document.querySelector("#input").classList.remove("border-red-500");
  } else {
    if (inputText.length <= 0 && dropdown.length > 0) {
      document.querySelector("#input").classList.add("border-red-500");
      document.querySelector("#option").classList.remove("border-red-500");
    } else if (inputText.length > 0 && dropdown.length <= 0) {
      document.querySelector("#option").classList.add("border-red-500");
      document.querySelector("#input").classList.remove("border-red-500");
    } else if (inputText.length <= 0 && dropdown.length <= 0) {
      document.querySelector("#option").classList.add("border-red-500");
      document.querySelector("#input").classList.add("border-red-500");
    }
  }
  return isValid;
}

document.querySelector("#list-items").addEventListener("click", function (e) {
  let spanElement = e.target.closest("span");
  if (spanElement) {
    let listItem = spanElement.parentNode;
    let listIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
    listItem.remove();
    list.splice(listIndex, 1);
    let newList = JSON.stringify(list);
    localStorage.setItem("array", newList);
    console.log(list);
  }
});