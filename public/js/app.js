/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const nav = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
var btnTop = document.getElementById("btn");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// This function create the navItems and add the href value to each according to it's corrsponding section
const creatingNavItems = () => {
    const fake = document.createDocumentFragment();
    for (const section of sections) {
        const navItem = document.createElement("li");
        const anchor = document.createElement("a");
        navItem.appendChild(anchor);
        anchor.textContent = section.dataset.nav;
        const href = section.getAttribute("id");
        anchor.setAttribute("href", `#${href}`);
        anchor.setAttribute("class", "menu__link");
        fake.appendChild(navItem);
    }
    nav.appendChild(fake);
};
// This function make the current viewed section is active and also the navItem related to it active
const toggleActiveState = () => {
    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("your-active-class");
                    entry.target.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.childNodes.forEach(
                        (l) => {
                            if (l.textContent === entry.target.dataset.nav)
                                l.classList.add("x");
                            else l.classList.remove("x");
                        }
                    );
                } else entry.target.classList.remove("your-active-class");
            });
        },
        { threshold: 0.9 }
    );
    sections.forEach((s) => {
        observer.observe(s);
    });
};

// This function adds the behaviour of scrolling into specific section
const scrollToSection = (e) => {
    e.preventDefault();
    const sec = document.querySelector(e.target.hash);
    if (e.target.className === "menu__link")
        sec.scrollIntoView({ behavior: "smooth", block: "center" });
};

// This function hide the navbar while not scrolling
const hideNotScroll = () => {
    let isScrolling;
    window.addEventListener(
        "scroll",
        () => {
            if (isScrolling > 0) {
                document.querySelector(".page__header").style.visibility = "visible";
            }
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
                document.querySelector(".page__header").style.visibility = "hidden";
            }, 1000);
        },
        false
    );
};

hideNotScroll();


// This function shows and hide the go to top button
window.onscroll = ()=>{scrollFunction()};
const scrollFunction=()=>{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btnTop.style.display = "block";
    } else {
      btnTop.style.display = "none";
    }
  }


  //This function scroll to the top of the page
  function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
creatingNavItems();

// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", toggleActiveState());

// Scroll to anchor ID using scrollTO event
nav.addEventListener("click", scrollToSection);
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
