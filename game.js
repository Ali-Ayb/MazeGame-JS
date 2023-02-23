document.addEventListener("DOMContentLoaded", function (event) {
  // Make the DIV element draggable:
  dragElement(document.getElementById("start"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    document.getElementById("start").onmousedown = dragMouseDown;

    function dragMouseDown(element) {
      element.preventDefault();
      // get the mouse cursor position at startup:
      startx = pos3 = element.clientX;
      starty = pos4 = element.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(element) {
      element.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - element.clientX;
      pos2 = pos4 - element.clientY;
      pos3 = element.clientX;
      pos4 = element.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      console.log("top", elmnt.style.top);
      console.log("left", elmnt.style.left);
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});
