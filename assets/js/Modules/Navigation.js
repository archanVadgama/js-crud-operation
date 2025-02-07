// navigation for small deviece
export function toggleNavigation() {
    const toggleNav = document.querySelector(".icon-color");
    const responsiveNav = document.querySelector(".responsive-nav");
  
    toggleNav.addEventListener("click", () => {
      responsiveNav.style.display = "flex";
    });
  
    const closeNav = document.querySelector(".close-nav");
    closeNav.addEventListener("click", () => {
      responsiveNav.style.display = "none";
    });
  }
  