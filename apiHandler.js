function ApiHandler(){

    this.getBreeds = function(){

        return fetch('https://dog.ceo/api/breeds/list/all')
        .then(response=>response.json())
        .catch(err => console.error(err));
    }

    this.getBreedImages = function(breed){

        return fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(response=>response.json())
        .catch(err => console.error(err));
    }
}