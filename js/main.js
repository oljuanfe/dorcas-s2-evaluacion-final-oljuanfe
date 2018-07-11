'use strict';

console.log('>> Ready :)');


//Apunto a boton e input en el Dom,tambien a ul
var inputSerie = document.querySelector('.inputSerie');
var button = document.querySelector('.button');
var list = document.querySelector('.list');


//Funcion crear li al clickar el boton

function createItemList (){
  var newItemList = document.createElement('li');
  var newShowImage = document.createElement('img');
  newShowImage.src='https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
  newItemList.appendChild(newShowImage);
  newItemList.classList.add('itemList');
  list.appendChild(newItemList);
  // newItemList.appendChild(inputSerie.Value);
}
createItemList();
//Funcion a ejecutar con evento click

function searchForResults(){
  var inputSerieValue = inputSerie.value;
  var url = 'http://api.tvmaze.com/search/shows?q=' + inputSerieValue;
  createItemList();
  console.log(inputSerieValue);
  console.log(url);
  fetch(url)
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(function(json){
      console.log(json);
      var showImage = json.image;
      console.log(showImage);
      // nombre.innerHTML = json.name;
      console.log(json.name);
      // showImage.src = showImage.original;
    // repos.innerHTML = 'Repos Públicos : ' + json.public_repos
    });
}

//Evento click sobre el boton con input ya rellenado
button.addEventListener('click',searchForResults);
