
document.addEventListener("DOMContentLoaded", function () {
  var FullImgBox = document.getElementById("FullImgBox");
  var FullImg = document.getElementById("FullImg");
  var galleryImages = document.querySelectorAll(".img-gallery img");

  var currentIndex = 0;

  window.openFullImg = function (pic) {
    FullImgBox.style.display = "flex";
    FullImg.src = pic;
    currentIndex = [...galleryImages].findIndex(img => img.src === pic);
  };

  window.closeFullImg = function () {
    FullImgBox.style.display = "none";
  };

  window.showNextImage = function () {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    FullImg.src = galleryImages[currentIndex].src;
  };

  window.showPrevImage = function () {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    FullImg.src = galleryImages[currentIndex].src;
  };
});
