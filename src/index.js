document.addEventListener('DOMContentLoaded', function(){
  fetchDogs()
  fetchBreeds()
  filterSelect() 
})

const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let pups = []

function fetchDogs() {
  return fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => {json.message.forEach(url => addImage(url))})
}

function fetchBreeds() {
  return fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
      pups = Object.keys(json.message)
      pups.forEach(pup => addBreed(pup))
    })
}

function addImage(url) {
  let container = document.querySelector('#dog-image-container')
  let newImage = document.createElement('img') 
  newImage.src = url
  newImage.style.width = '400px'
  newImage.style.height = 'auto'
  container.appendChild(newImage)
}

function addBreed(pup) {
  let container = document.getElementById("dog-breeds")
  let newLi = document.createElement('li')
  newLi.innerText = pup
  container.appendChild(newLi)
  newLi.addEventListener("click", changeOnClick)
}

function changeOnClick(event) {
  event.target.style.color = 'red'
}

function filterSelect() {
  let dropdown = document.getElementById("breed-dropdown")
  dropdown.addEventListener('change', function (event) {
    filterByLetter(event.target.value)
  })
}

function filterByLetter(letter) {
  let pupsFiltered = pups.filter(pup => pup.startsWith(letter))
  let container = document.getElementById("dog-breeds")
  container.innerHTML = ""
  pupsFiltered.forEach(pupBreed => addBreed(pupBreed))
}

