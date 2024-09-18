// This is where it all goes :)
const observer = new IntersectionObserver((entries) => {
  console.log('method running');
  entries.forEach((entry) => {

    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
hiddenElements.forEach((el) => {
  consolelog(el)
});
