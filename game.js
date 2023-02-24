document.addEventListener("DOMContentLoaded", function (event) {
  score = 0;
  var scoreDisplay = document.createElement("p");
  scoreDisplay.textContent = "Score: " + score;
  var statusDiv = document.getElementById("status");
  statusDiv.insertBefore(scoreDisplay, statusDiv.firstChild);

  dragElement(document.getElementById("start"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    document.getElementById("start").onmouseover = dragMouseOver;

    function dragMouseOver(element) {
      element.preventDefault();
      pos3 = element.clientX;
      pos4 = element.clientY;
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

      document.onmousedown = resetToStart;

      //In orderr to stop imediatly
      if (checkCollisions()) {
        return 0;
      }
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function resetToStart() {
      elmnt.style.top = 205 + "px";
      elmnt.style.left = 0 + "px";
      document.getElementById("game").classList.remove("youwon");
      document.getElementById("game").classList.remove("youlose");
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
        document.getElementById("status").textContent = "You lose! :(";
        statusDiv.insertBefore(scoreDisplay, statusDiv.firstChild);
        closeDragElement();
        document.getElementById("game").classList.add("youlose");
        score -= 10;
        scoreDisplay.textContent = "Score: " + score;
      } else if (isColliding(elmnt, document.getElementById("end"))) {
        document.getElementById("status").textContent = "You win! :)";
        statusDiv.insertBefore(scoreDisplay, statusDiv.firstChild);
        document.getElementById("game").classList.add("youwon");
        score += 5;
        scoreDisplay.textContent = "Score: " + score;
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
