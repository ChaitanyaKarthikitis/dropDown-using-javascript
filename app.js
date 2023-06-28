getCountryData()
// async function getCountryData(){
//   fetch('https://restcountries.com/v3.1/all')
//   .then(response => response.json())
//   .then(data => {
//     // Process the response data containing country names
//     const countryNames = data.map(country => country.name);
//     console.log(countryNames);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }
let countries = []

// let arr = []

let countryList = []


async function getCountryData(){
    const countryNames = await fetch('https://restcountries.com/v3.1/all');

    const myData = await countryNames.json();

    countries = myData.map((country)=>{
        return country.name.common;
    })

    countries.forEach((country)=>{
        countryList.push(country)
    })
    
}

console.log(countryList)


let autocomplete_wrapper = document.querySelector('.autocomplete--wrapper')


let form = document.querySelector("#form")

let inputField = document.querySelector('#input');

inputField.addEventListener('input',onInputChange)





function onInputChange(){
    removeOldDropdown();
    let value = inputField.value.toLowerCase();

    if(value.length === 0){
        return;
    }

    let fileteredCountryNames = [];

    countryList.forEach((country)=>{
        if(country.substr(0,value.length).toLowerCase()===value){
            fileteredCountryNames.push(country);
        }
    })

    console.log(fileteredCountryNames)

    createListItems(fileteredCountryNames);
    
}

function createListItems(list){
    let ul = document.createElement('ul');
    ul.className = 'autocomplete--wrapper';
    ul.id = 'autocomplete--wrapper'

    list.forEach((element)=>{
        let li_element = document.createElement('li');
        let button_element = document.createElement('button');
        button_element.innerHTML = element;
        button_element.addEventListener('click',onButtonClick)
        li_element.appendChild(button_element);

        ul.appendChild(li_element)
    })

    document.querySelector('#form').appendChild(ul);
}


function removeOldDropdown(){
    let target = document.querySelector('#autocomplete--wrapper');

    if(target){
        target.remove();
    }
}


function onButtonClick(e){
    e.preventDefault();

    let button = e.target;

    inputField.value = button.innerHTML;

    removeOldDropdown();

}