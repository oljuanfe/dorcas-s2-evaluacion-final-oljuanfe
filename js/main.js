'use strict';

console.log('>> Ready :)');


//Apunto a botón e input en el Dom,tambien a ul

var inputSerie = document.querySelector('.inputSerie');
var button = document.querySelector('.button');
var list = document.querySelector('.list');

var infoToLocalStorage = [];

//Función crear <li> que contiene <img> y titulo al clickar el botón la llamo dentro función buscar resultados

function createItemList (name,pictureUrl,idShow,countryName){
  //Variables crear <li>, <img>, <h2>
  var newItemList = document.createElement('li');
  var newShowImage = document.createElement('img');
  var newShowTitle = document.createElement('h2');
  var newCountry = document.createElement('p');

  var nameOfTheShow = document.createTextNode(name);
  var personCountry = document.createTextNode(countryName);

  newShowImage.src = pictureUrl;
  newShowImage.classList.add('picture');
  newShowTitle.classList.add('showTitle','item-title');
  newShowTitle.appendChild(nameOfTheShow);
  newItemList.appendChild(newShowImage);
  newItemList.classList.add('itemList', 'not-favorite', 'item-list');
  newItemList.appendChild(newShowTitle);
  newItemList.appendChild(newCountry);
  newCountry.appendChild(personCountry);
  list.appendChild(newItemList);
  newItemList.setAttribute('id', idShow);
}

//Función a ejecutar con evento click que manda una petición de los shows que contengan esa palabra

function searchForResults(){
  var inputSerieValue = inputSerie.value;
  var url = ' https://api.tvmaze.com/search/people?q=' + inputSerieValue;
  var apiResponse = localStorage.getItem('apiResponse');
  list.innerHTML = '';
  console.log('Dentro input despues click', inputSerieValue);
  console.log('url peticion', url);
  fetch(url)
    .then(function(response){
      console.log('respuesta primer then ', response);
      return response.json();
    })
    .then(function(json){
      console.log('esto es json ', json);
      localStorage.setItem('apiResponse',JSON.stringify(json));

      //El json es un array y show un objeto dentro de otro y éste dentro de json, elijo los datos de name y la url de la imagen

      for (var i = 0; i < json.length; i++){
        var showInfo = json[i].person;
        var nameShow = showInfo.name;
        var idShow = showInfo.id;
        var imageShow = showInfo.image;
        var country = showInfo.country;
        if(imageShow === null){
          var imageShowOriginal = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else{
          var imageShowOriginal = imageShow.medium;
        }
        if(country === null){
          var countryNameOPtional = 'pais desconocido';
        } else {
          var countryNameOPtional = country.name;
        }

        console.log('el nombre dentro show', nameShow);
        console.log('la clave image', imageShow);
        console.log('la imagen original ', imageShowOriginal);

        //Llamo a la función para crear un <li> con cada resultado(por eso está dentro del For) y paso como parámetros el nombre y la url de la imagen para usarlos dentro de la otra Función.Tambien llamo a la función que escucha un evento click en los <li>

        createItemList(nameShow,imageShowOriginal,idShow,countryNameOPtional);
        listeningToItemList();
        console.log(idShow);
        // getInfoToStorage(idShow);
      }

    });
}
//
// function getInfoToStorage (idShow){
//   var itemList = document.querySelectorAll('.list .itemList');
//   for (var i = 0; i < itemList.length; i++){
//     if(itemList.classList.contains('favorite')){
//       infoToLocalStorage[i] = localStorage.setItem('favoriteShow', JSON.stringify(idShow));
//     }
//   }
//
// }

//Función para con evento click elegir favorito y que ponga borde y otro color.También tiene animacion en css

function chooseFavorite(){
  console.log('estoy clickandoo,oo,oooo');
  // var favorite =localStorage.getItem('favoriteShow');
  // var extractLocalStorage = JSON.parse(favorite);

  var itemClicked = event.currentTarget;
  if(itemClicked.classList.contains('not-favorite')){
    itemClicked.classList.add('favorite');
    itemClicked.classList.remove('not-favorite');
  } else {
    itemClicked.classList.remove('favorite');
    itemClicked.classList.add('not-favorite');
  }
  // saveLocalStorage(itemClicked);
}


//Evento click sobre el boton con input ya rellenado

button.addEventListener('click',searchForResults);

//Funcion de evento click sobre el li elegido
function listeningToItemList(){
  console.log('estoy escuchandooo,ooo');
  var itemList = document.querySelectorAll('.list .itemList');
  for (var i = 0; i < itemList.length; i++){
    var itemListAsArray = itemList[i];
    itemListAsArray.addEventListener('click', chooseFavorite);
  }
}

//Función para hacer lo mismo que con click en botón, solo que pulsando Enter

function searchWithEnter(){
  console.log('He apretado EEENTEEER');
  if(event.key === 'Enter'){
    console.log('He apretado EEENTEEER');
    searchForResults(event);
  }
}

//Listener para lanzar el evento al pulsar Enter

window.addEventListener('keydown', searchWithEnter);

//Fin
