const menuBtn = document.querySelector('.menu-btn');
const menuIcon = document.getElementById('menu-icon');
const navList = document.querySelector('.nav-list');

const desktopToggle = document.getElementById('toggle');
const mobileToggle = document.getElementById('mobile-toggle');
const body = document.body;

menuBtn.addEventListener("click", (e) => {
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.replace("fa-bars", "fa-xmark");
    navList.style.right = "0px"; // show menu
    navList.style.opacity = 1;
  } else {
    menuIcon.classList.replace("fa-xmark", "fa-bars");
    navList.style.right = "-100%"; // hide menu
    navList.style.opacity = 0;
  }
});
// Close the menu when clicking outside of it
document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !navList.contains(e.target)) {
    menuIcon.classList.replace("fa-xmark", "fa-bars");
    navList.style.right = "-100%"; // hide menu
    navList.style.opacity = 0;
  }
}
);

// No scroll when the menu is open
navList.addEventListener("transitionend", () => {
  if (navList.style.right === "0px") {
    document.body.style.overflow = "hidden"; // Disable scrolling
  } else {
    document.body.style.overflow = ""; // Enable scrolling
  }
}
);
// Ensure the menu is closed on page load
if (navList.style.right === "0px") {
  navList.style.right = "-100%"; // hide menu
  navList.style.opacity = 0;
  menuIcon.classList.replace("fa-xmark", "fa-bars");
}

// Note: The following code handles the dark mode toggle functionality

// Function to toggle dark mode
function toggleTheme(isDark) {
  if (isDark) {
    body.classList.add('darkmode');
    mobileToggle.checked = true; // Ensure the toggle is checked
    if (desktopToggle) desktopToggle.checked = true; // Ensure the desktop toggle is checked
    localStorage.setItem('theme', 'dark'); // Save the theme preference
  } else {
    body.classList.remove("darkmode");
    mobileToggle.checked = false; // Ensure the toggle is unchecked
    if (desktopToggle) desktopToggle.checked = false; // Ensure the desktop toggle is unchecked
    localStorage.setItem('theme', 'light'); // Save the theme preference
  }
}

// Event listener
mobileToggle.addEventListener('change', function() {
  toggleTheme(mobileToggle.checked);
  if (desktopToggle) {
    desktopToggle.checked = mobileToggle.checked; // Sync desktop toggle with mobile toggle
  }
  body.classList.toggle('darkmode', mobileToggle.checked); // Toggle dark mode class
  localStorage.setItem('theme', mobileToggle.checked ? 'dark' : 'light'); // Save the theme preference
});

if (desktopToggle) {
  desktopToggle.addEventListener('change', function() {
    toggleTheme(desktopToggle.checked);
    if (mobileToggle) {
      mobileToggle.checked = desktopToggle.checked; // Sync mobile toggle with desktop toggle
    }
    body.classList.toggle('darkmode', desktopToggle.checked); // Toggle dark mode class
    localStorage.setItem('theme', desktopToggle.checked ? 'dark' : 'light');
  });
}

// Close navigation menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuIcon.classList.contains("fa-xmark")) {
      menuIcon.classList.replace("fa-xmark", "fa-bars");
      navList.style.right = "-100%"; // hide menu
      navList.style.opacity = 0;
      document.body.style.overflow = ""; // Enable scrolling
    }
  });
});

// Ensure the theme toggle reflects the saved preference on page load
if (mobileToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    mobileToggle.checked = savedTheme === 'dark';
    toggleTheme(savedTheme === 'dark');
  } else {
    // Default to light mode if no preference is saved
    mobileToggle.checked = false;
    toggleTheme(false);
  }
}
if (desktopToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    desktopToggle.checked = savedTheme === 'dark';
    toggleTheme(savedTheme === 'dark');
  } else {
    // Default to light mode if no preference is saved
    desktopToggle.checked = false;
    toggleTheme(false);
  }
}

//Theme setup based on system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  toggleTheme(savedTheme === 'dark');
}

// Listen for system theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    toggleTheme(true); // System prefers dark mode
  } else {
    toggleTheme(false); // System prefers light mode
  }
});
// Initial theme setup based on system preference
if (mediaQuery.matches) {
  toggleTheme(true); // System prefers dark mode
}
// Initial theme setup based on saved preference
if (savedTheme) {
  toggleTheme(savedTheme === 'dark');
}

