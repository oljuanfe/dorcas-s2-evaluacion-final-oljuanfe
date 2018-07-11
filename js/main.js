'use strict';

console.log('>> Ready :)');


//Apunto a boton e input en el Dom,tambien a ul
var inputSerie = document.querySelector('.inputSerie');
var button = document.querySelector('.button');
var list = document.querySelector('.list');


//Funcion crear li al clickar el boton

function createItemList (name){
  var newItemList = document.createElement('li');
  var newShowImage = document.createElement('img');
  var newShowTitle = document.createElement('h2');
  var nameOfTheShow = document.createTextNode(name);
  // console.log('Lo de dentro del input', nameOfTheShow);
  newShowImage.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
  newShowTitle.classList.add('showTitle');
  newShowTitle.appendChild(nameOfTheShow);
  newItemList.appendChild(newShowImage);
  newItemList.classList.add('itemList');
  newItemList.appendChild(newShowTitle);
  list.appendChild(newItemList);
  // newItemList.appendChild(inputSerie.Value);
}
//Funcion a ejecutar con evento click

function searchForResults(){
  var inputSerieValue = inputSerie.value;
  var url = 'http://api.tvmaze.com/search/shows?q=' + inputSerieValue;
  console.log('Dentro input despues click', inputSerieValue);
  console.log('url peticion', url);
  fetch(url)
    .then(function(response){
      console.log('respuesta primer then ', response);
      return response.json();
    })
    .then(function(json){
      console.log('esto es json ', json);
      //El json es un array y show otro array dentro de json
      // var result = json.show;
      // console.log(json.show);
      // var showImage = json.image;
      var nameShowArray = [];
      for (var i = 0; i < json.length; i++){
        // console.log('json en array ' + i , json[i]);
        var showInfo = json[i].show;
        // console.log('json i show', showInfo);
        var nameShow = showInfo.name;
        nameShowArray[i] = name;
        console.log('el nombre dentro show', nameShow);
        createItemList(nameShow);
      }

      // nombre.innerHTML = json.name;
      // console.log('respuesta.name', json.name);
      // showImage.src = showImage.original;
    // repos.innerHTML = 'Repos Públicos : ' + json.public_repos
    });
}

//Evento click sobre el boton con input ya rellenado
button.addEventListener('click',searchForResults);
