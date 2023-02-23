document.addEventListener("DOMContentLoaded", function (event) {
  dragElement(document.getElementById("start"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    document.getElementById("start").onmousedown = dragMouseDown;

    function dragMouseDown(element) {
      element.preventDefault();
      startx = pos3 = element.clientX;
      starty = pos4 = element.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(element) {
      element.preventDefault();
      pos1 = pos3 - element.clientX;
      pos2 = pos4 - element.clientY;
      pos3 = element.clientX;
      pos4 = element.clientY;

      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      if (checkCollisions()) {
        document.getElementById("status").textContent = "You lose!";
      }
      console.log(score);
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function checkCollisions() {
      var boundaries = document.querySelectorAll(".boundary");
      var collided = false;
      for (var i = 0; i < boundaries.length; i++) {
        var boundary = boundaries[i];
        if (isColliding(elmnt, boundary)) {
          collided = true;
          break;
        }
      }
      if (collided) {
        document.getElementById("status").textContent = "You lose! :[";
        closeDragElement();
        document.getElementById("game").classList.add("youlose");
      } else if (isColliding(elmnt, document.getElementById("end"))) {
        document.getElementById("status").textContent = "You win! :]";
        closeDragElement();
      }
      function isColliding(a, b) {
        var aRect = a.getBoundingClientRect();
        var bRect = b.getBoundingClientRect();
        return !(
          aRect.bottom < bRect.top ||
          aRect.top > bRect.bottom ||
          aRect.right < bRect.left ||
          aRect.left > bRect.right
        );
      }
    }
  }
});
