export default (container) => {
  const scrollHorizontally = (e) => {
    e = window.event || e;
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)) * 2;
    Object.keys(document.getElementsByClassName(container)).map(
      (elem) => (elements[elem].scrollLeft -= delta * 40),
    ); // Multiplied by 40
    e.preventDefault();
  };
  let elements = document.getElementsByClassName(container);
  if (elements.length > 0) {
    // IE9, Chrome, Safari, Opera
    Object.keys(elements).map((elem) => elements[elem].addEventListener('mousewheel', scrollHorizontally, false));
    // Firefox
    Object.keys(elements).map((elem) => elements[elem].addEventListener(
      'DOMMouseScroll',
      scrollHorizontally,
      false,
    ));
  } else {
    // IE 6/7/8
    Object.keys(elements).map((elem) => elements[elem]
      .getElementsByClassName(container)
      .attachEvent('onmousewheel', scrollHorizontally));
  }
};
