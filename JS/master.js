//Check if there is local storege color option
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  //set color on root
  document.documentElement.style.setProperty("--main-color", mainColor);
  //Remove active class from all colors list items.
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    //Add active class on elemet with datacolor ====local storage item
    if (el.dataset.color === mainColor) {
      //add active class
      el.classList.add("active");
    }
  });
}

//Open and Spin class on icon
document.querySelector(".gear-container .fa-gear").onclick = function () {
  //Toggle class fa-spin on gear element.
  this.classList.toggle("fa-spin");
  //Toggle class open on main settings box open.
  document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
//Loop on all list items
colorsLi.forEach((li) => {
  // click on every list item
  li.addEventListener("click", (event) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      event.target.dataset.color
    );
    //set Color on ocal storage
    localStorage.setItem("color-option", event.target.dataset.color);
    handleActive(event);



  });
});


//variable to control background option
let backgroundImgs = true;

//variabl to control the backgroud interval;
let backgroundInterval;

//Check if there is loacalstorage for background option.
let backgroundLocalItem = localStorage.getItem("background_option");
//check if random background local storage is empty
if (backgroundLocalItem !== null) {
  console.log(backgroundLocalItem);
  console.log(typeof (backgroundLocalItem)) //string
  if (backgroundLocalItem === 'true') {
    backgroundImgs = true;
  } else {
    backgroundImgs = false
  }

  //Remove active class from all spans 
  document.querySelectorAll(".random-backgrounds span").forEach(el => {
    el.classList.remove("active");
  })
  if (backgroundLocalItem === 'true') {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }

}

//Switch random backgrunds option
const randomBackgroundEl = document.querySelectorAll(
  ".random-backgrounds span"
);
//Loop on span
randomBackgroundEl.forEach((span) => {
  // click on every list item
  span.addEventListener("click", (event) => {
    handleActive(event);

    if (event.target.dataset.background === "yes") {
      backgroundImgs = true;
      randomizeImgs()
      localStorage.setItem("background_option", true)
    } else {
      backgroundImgs = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});




//Select the landing page
let landingPage = document.querySelector(".landing-page");

//array of imgs
let imgsArray = ["01.jpg ", "02.jpg", "03.jpg ", "04.jpg ", "05.jpg", "06.jpg"];


// Function to randomize images on the background.
function randomizeImgs() {
  if (backgroundImgs === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      //change backgroung imgs
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 1000);

  }


}
randomizeImgs();

//Select Skills Sellector

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  //Skills offset top
  //offset top is the ppart above the ousskills.
  let skillsOffsetTop = ourSkills.offsetTop;

  //Get skils the outer height
  //offsetHeight ==> calculates the height includding the border and padding. 
  let skillsOuterHeight = ourSkills.offsetHeight

  // get the window height (the windw you are scrolling at.)
  let windowHeight = this.innerHeight;

  //window scrollTop (allias for scroll Y)
  //document you currently scrolled
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}


//Create POP UP with the image.
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    //Create Overlay Image.
    let overlay = document.createElement("div");
    //Add Class to overlay.
    overlay.className = "popup-overlay";
    //Append overlay to body.
    document.body.appendChild(overlay);

    //Create the popup box
    let popupBox = document.createElement("div");
    //Add class to the box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //Create Heading
      let imgHeading = document.createElement("h3");
      //Create text for heading
      let imgText = document.createTextNode(img.alt);
      //Append text to heading
      imgHeading.appendChild(imgText);
      //Append The Heading to popup bpx
      popupBox.appendChild(imgHeading);
    }
    //Create the image
    let popupImage = document.createElement("img");
    //set image source
    popupImage.src = img.src;
    //Append popupimag to popup box
    popupBox.appendChild(popupImage);
    //Append popup box to body
    document.body.appendChild(popupBox);

    //Create the close Span 
    let closeButton = document.createElement("span");
    //Create the Close button text;
    let closeButtonText = document.createTextNode("X");
    //Append text to close button
    closeButton.appendChild(closeButtonText);
    //Add class to close Button
    closeButton.className = "close-button";
    //Add close button to the popup box
    popupBox.appendChild(closeButton);
  })
})

//Close popup
document.addEventListener('click', function (e) {
  if (e.target.className === "close-button")
    //Remove the current popup.
    e.target.parentNode.remove();
  // closest('.popup-overlay') searches up the DOM tree and finds the nearest ancestor element that matches the selector. This is safer than document.querySelector() because it ensures you're removing the overlay related to the clicked popup 
  // — not just the first one in the document.
  // e.target.closest(".popup-overlay").remove();
  const overlay = e.target.closest(".popup-overlay");
  if (overlay) overlay.remove(); // safely removes overlay


})

//Select All bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")


//Select All links
const allLinks = document.querySelectorAll(".links a")




function scrollToView(elements) {
  elements.forEach(ele => {
    //scroll into view ==> scroll element smoothly.
    ele.addEventListener('click', (ele) => {
      //to prevent the default behaviour of a link.
      ele.preventDefault();
      document.querySelector(ele.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}
scrollToView(allBullets)
scrollToView(allLinks)

//Handle active status
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  //add active class on selected element color
  event.target.classList.add("active");


}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletlocalItem = localStorage.getItem("bullets-option");
if (bulletlocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  })

  if (bulletlocalItem === 'block') {
    bulletsContainer.style.display = 'block'
    document.querySelector(".bullets-option .yes").classList.add("active")
  } else {
    bulletsContainer.style.display = 'none'
    document.querySelector(".bullets-option .no").classList.add("active")
  }
}
bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets-option", "block")
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets-option", "none")
    }
    handleActive(e)
  })
})

//Reset Button
document.querySelector(".reset-options").onclick = function () {

  localStorage.removeItem("bullets-option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("background_option");
  // localStorage.clear()
  //Reload window
  window.location.reload();
}


//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let menuLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Prevent multiple event handlers from being triggered unnecessarily.

  // Control specific behavior (e.g., custom dropdowns, modals, etc.).

  // Avoid conflicts when nesting interactive elements.
  //Stop propagation
  //Now when er click on the span nothing happens.
  e.stopPropagation()
  //Toggle Class on Button
  this.classList.toggle("menu-active")
  //Toggle class on Links
  menuLinks.classList.toggle("open")

}

//Click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== menuLinks) {
    //the span on the button outputs the message but the space not.
    // console.log("This is not the btn")

    // Check if the menu is open
    if (menuLinks.classList.contains("open")) {
      // console.log("Menu is open")
      //Toggle Class on Button
      toggleBtn.classList.toggle("menu-active")
      //Toggle class on Links
      menuLinks.classList.toggle("open")
    }

  }
})

//Stop propagation on menu links
menuLinks.onclick = function (e) {
  e.stopPropagation();
}