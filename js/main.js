'use strict';

console.log('>> Ready :)');


//Apunto a boton e input en el Dom,tambien a ul

var inputSerie = document.querySelector('.inputSerie');
var button = document.querySelector('.button');
var list = document.querySelector('.list');


//Funcion crear li al clickar el boton la llamo dentro funcion buscar

function createItemList (name,pictureUrl){
  //Variables crear <li>, <img>, <h2>
  var newItemList = document.createElement('li');
  var newShowImage = document.createElement('img');
  var newShowTitle = document.createElement('h2');

  var nameOfTheShow = document.createTextNode(name);

  newShowImage.src = pictureUrl;
  newShowTitle.classList.add('showTitle');
  newShowTitle.appendChild(nameOfTheShow);
  newItemList.appendChild(newShowImage);
  newItemList.classList.add('itemList', 'not-favorite');
  newItemList.appendChild(newShowTitle);
  list.appendChild(newItemList);
}

//Funcion a ejecutar con evento click que manda una peticion de los shows que contengan esa palabra

function searchForResults(){
  var inputSerieValue = inputSerie.value;
  var url = 'http://api.tvmaze.com/search/shows?q=' + inputSerieValue;
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

      //El json es un array y show un objeto dentro de otro y éste dentro de json

      for (var i = 0; i < json.length; i++){
        // console.log('json en array ' + i , json[i]);
        var showInfo = json[i].show;
        // console.log('json i show', showInfo);
        var nameShow = showInfo.name;
        var imageShow = showInfo.image;
        if(imageShow === null){
          var imageShowOriginal = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else{
          var imageShowOriginal = imageShow.medium;
        }

        console.log('el nombre dentro show', nameShow);
        console.log('la clave image', imageShow);
        console.log('la imagen original ', imageShowOriginal);

        //Llamo a la funcion para crear un li con cada resultado(por eso está dentro del For) y paso como parametros el nombre y la url de la imagen para usarlos dentro de la otra Funcion

        createItemList(nameShow,imageShowOriginal);
        listeningToItemList();
      }
    });
}


//Funcion para con evento boton elegir favorito y que ponga borde y otro color.

function chooseFavorite(){
  console.log('estoy clickandoo,oo,oooo');
  var itemClicked = event.currentTarget;
  itemClicked.classList.add('favorite');
  itemClicked.classList.remove('not-favorite');
  // var id = event.currentTarget.getAttribute('data-id');
  // alert(event.currentTarget.innerHTML + ' ' + movies[id].director + ' ' + movies[id].year);


}


//Evento click sobre el boton con input ya rellenado

button.addEventListener('click',searchForResults);

//Funcion de evento click sobre el li elegido
function listeningToItemList(){
  console.log('estoy escuchandooo,ooo');
  var itemList = document.querySelectorAll('.list .itemList');
  for (var i = 0; i < itemList.length; i++){
    var paco = itemList[i];
    console.log(itemList[i]);
    paco.addEventListener('click', chooseFavorite);
  }
}


//Fin
