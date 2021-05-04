export default container => {
  const slider = document.getElementsByClassName(container);
  let isDown = false;
  let startX;
  let scrollLeft;
  Object.keys(slider).map(elem => {
    elem = slider[elem];

    elem.addEventListener("mousedown", e => {
      isDown = true;
      elem.classList.add("click-active");
      startX = e.pageX - elem.offsetLeft;
      scrollLeft = elem.scrollLeft;
    });
    elem.addEventListener("mouseleave", () => {
      isDown = false;
      elem.classList.remove("click-active");
    });
    elem.addEventListener("mouseup", () => {
      isDown = false;
      elem.classList.remove("click-active");
    });
    elem.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      e.stopPropagation();
      const x = e.pageX - elem.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      elem.scrollLeft = scrollLeft - walk;
    });
  });
};
