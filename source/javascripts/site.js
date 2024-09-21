document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  });

  const hiddenItems = document.querySelectorAll('.fade-in-section');
  hiddenItems.forEach((el) => observer.observe(el));
});
