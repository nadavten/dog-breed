function Breed(name){

    this.name = name;
    this.isSelected = false;
}

Breed.prototype.toggleIsSelected = function(){
    this.isSelected = !this.isSelected;
}