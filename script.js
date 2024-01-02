//your code here
document.addEventListener("DOMContentLoaded", function() {
  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  let state = 1;
  let selectedImages = [];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function renderImages() {
    const imageOrder = [1, 2, 3, 4, 5];
    const repeatedImageIndex = getRandomInt(0, 4);
    const repeatedImageClass = `img${getRandomInt(1, 5)}`;

    imageOrder.splice(repeatedImageIndex, 0, repeatedImageClass);

    imageContainer.innerHTML = "";
    imageOrder.forEach((imgClass, index) => {
      const img = document.createElement("img");
      img.src = `https://api.example.com/images/${imgClass}.jpg`; // Replace with your image API endpoint
      img.classList.add(imgClass);
      img.addEventListener("click", () => handleImageClick(imgClass));
      imageContainer.appendChild(img);
    });
  }

  function handleImageClick(imgClass) {
    if (selectedImages.length < 2 && !selectedImages.includes(imgClass)) {
      selectedImages.push(imgClass);
    }

    if (selectedImages.length === 2) {
      verifyButton.style.display = "block";
      state = 3;
    }

    if (selectedImages.length > 0) {
      resetButton.style.display = "block";
      state = 2;
    }

    if (selectedImages.length === 2) {
      para.innerHTML = "";
    }
  }

  function resetState() {
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.innerHTML = "";
    state = 1;
  }

  function verify() {
    if (selectedImages[0] === selectedImages[1]) {
      para.innerHTML = "You are a human. Congratulations!";
    } else {
      para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = "none";
    state = 4;
  }

  resetButton.addEventListener("click", resetState);
  verifyButton.addEventListener("click", verify);

  renderImages();
});
