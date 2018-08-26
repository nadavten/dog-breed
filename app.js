let isMouseDown = false;
let lastMouseDownEvent;

const apiHandler = new ApiHandler();

const elBreeds = document.getElementById("breeds");
const elImages = document.getElementById("images");

var dicBreeds = {};

function init() {
  apiHandler.getBreeds().then(response => {
    const message = response.message;
    const breeds = Object.keys(message);

    for (const breed of breeds) {
      const breedObj = new Breed(breed);
      dicBreeds[breed] = breedObj;

      const elText = document.createTextNode(breed);

      const elBreed = document.createElement("div");
      elBreed.addEventListener("mousedown", breed_mousedown);
      elBreed.addEventListener("mouseup", breed_mouseup);

      elBreed.appendChild(elText);

      elBreeds.appendChild(elBreed);
    }
  });

  const leftArrow = document.getElementById("leftArrow");
  leftArrow.addEventListener("click", left_click);

  const rightArrow = document.getElementById("rightArrow");
  rightArrow.addEventListener("click", right_click);

  elBreeds.addEventListener("mousedown", breeds_mousedown);
  elBreeds.addEventListener("mouseup", breeds_mouseup);
  elBreeds.addEventListener("mouseout", breeds_mouseup);
  elBreeds.addEventListener("mousemove", breeds_mousemove);
}

function breed_mousedown(e) {
  lastMouseDownEvent = e;
}

function breed_mouseup(e) {
  if (lastMouseDownEvent.pageX === e.pageX) {
    const breed = this.innerText;

    const breedObj = dicBreeds[breed];

    breedObj.toggleIsSelected();

    /*
      is the breed is selected then fetch 
      the breed images and add them to the DOM
    */
    if (breedObj.isSelected) {
      this.classList.add("isSelected");

      var firstItem = elImages.firstChild;

      apiHandler.getBreedImages(breed).then(response => {
        const images = response.message;
        for (const url of images) {
          const imgElement = document.createElement("img");
          imgElement.src = url;
          imgElement.alt = "";
          imgElement.classList.add(breed);

          // append images to head of images list
          if (!!firstItem) {
            elImages.insertBefore(imgElement, firstItem);
          } else {
            elImages.appendChild(imgElement);
          }
        }
      });

    /*  
      if breed is unselected then remove 
      breed images from DOM
    */
    } else {
      this.classList.remove("isSelected");

      var imagesToRemove = elImages.getElementsByClassName(breed);
      for (let index = imagesToRemove.length - 1; index >= 0; index--) {
        imagesToRemove[index].remove();
      }
    }
  }
}

function breeds_mousedown(e) {
  isMouseDown = true;
}

function breeds_mouseup(e) {
  isMouseDown = false;
}

function breeds_mousemove(e) {
  if (isMouseDown) {
    elBreeds.scrollLeft -= e.movementX;
  }
}

function smoothMove(value) {
  elBreeds.scrollBy({
    left: value,
    behavior: "smooth"
  });
}

function left_click() {
  smoothMove(-breeds.offsetWidth);
}

function right_click() {
  smoothMove(breeds.offsetWidth);
}

init();
