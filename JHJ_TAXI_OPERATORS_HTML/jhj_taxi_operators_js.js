// Function to change the theme
function changeTheme(theme) {
    localStorage.setItem('selectedTheme', theme);

    // Remove any existing theme classes
    document.body.classList.remove('green-apple-theme', 'lavender-theme', 'yotsuba-theme');

    // Apply the selected theme class to the body
    if (theme === 'green-apple') {
        document.body.classList.add('green-apple-theme');
    } else if (theme === 'lavender') {
        document.body.classList.add('lavender-theme');
    } else if (theme === 'yotsuba') {
        document.body.classList.add('yotsuba-theme');
    }
}

// Function to enable dark mode
function setDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('darkMode', 'true');
}

// Function to enable light mode
function setLightMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
}

// Function to apply the stored preferences for theme and mode
function applyStoredPreferences() {
    const storedTheme = localStorage.getItem('selectedTheme');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (storedTheme) {
        changeTheme(storedTheme);
    }

    if (isDarkMode) {
        setDarkMode();
    } else {
        setLightMode();
    }
}

// Apply preferences when the page loads
window.onload = applyStoredPreferences;

document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const modeSelect = document.getElementById('mode-select');

    // Function to apply theme and mode
    function applyPreferences() {
        const theme = localStorage.getItem('selectedTheme');
        const mode = localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light';

        if (theme) {
            document.body.classList.add(`${theme}-theme`);
        }
        document.body.classList.add(`${mode}-mode`);
        themeSelect.value = theme || 'default';
        modeSelect.value = mode;
    }

    // Function to handle theme change
    function changeTheme(theme) {
        document.body.classList.remove('green-apple-theme', 'lavender-theme', 'yotsuba-theme');
        localStorage.setItem('selectedTheme', theme);
        document.body.classList.add(`${theme}-theme`);
    }

    // Function to handle mode change
    function setMode(mode) {
        document.body.classList.remove('light-mode', 'dark-mode');
        localStorage.setItem('darkMode', mode === 'dark');
        document.body.classList.add(`${mode}-mode`);
    }

    // Event listeners for dropdown changes
    themeSelect.addEventListener('change', (e) => {
        changeTheme(e.target.value);
    });

    modeSelect.addEventListener('change', (e) => {
        setMode(e.target.value);
    });

    // Apply stored preferences on page load
    applyPreferences();
});

//Validating forms
// Registration form validation and storing user info
function validateAndStore() {
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    // Simple email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }

    // Store the values in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Redirect to the login page
    window.location.href = "jhj_log_in.html";

    // Prevent form submission (already redirected)
    return false;
}

// Pre-fill login form using local storage
function prefillLoginForm() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        document.getElementById("loginUsername").value = storedUsername;
        document.getElementById("loginPassword").value = storedPassword;
    }
}

// Validate the login form
function validateLogin() {
    const enteredUsername = document.getElementById("loginUsername").value;
    const enteredPassword = document.getElementById("loginPassword").value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Simple validation to match stored credentials
    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        alert("Login successful!");

        // Redirect to the next page (in this case, homepage.html)
        window.location.href = "jhj_homepage.html"; // Replace with your next page name

        return false; // Prevent form submission
    } else {
        alert("Invalid username or password.");
        return false; // Prevent form submission
    }
}

// Closing || Opening Side Panel
document.getElementById('toggleButton').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const container = document.querySelector('.container');
    if (sidebar.style.display === 'none') {
        sidebar.style.display = 'block';
        container.style.paddingLeft = '210px';  // Adjust padding when sidebar is shown
        this.textContent = '⬅️';
    } else {
        sidebar.style.display = 'none';
        container.style.paddingLeft = '60px';  // Adjust padding when sidebar is hidden
        this.textContent = '➡️';
    }
});

// Accounts
document.getElementById('showChoicesButton').onclick = function() {
    const choicesBox = document.getElementById('choicesBox');
    choicesBox.style.display = choicesBox.style.display === 'none' ? 'block' : 'none';
};

// For sorting
// Function to sort the table based on selected column
function sortTable() {
    const select = document.getElementById("sortSelect");
    const columnIndex = parseInt(select.value);
    const table = document.getElementById("driverTable");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);
    
    rows.sort((a, b) => {
        let cellA, cellB;

        if (columnIndex === 3) { // Sorting by Plate #
            const lastDigitA = parseInt(a.cells[columnIndex].innerText.slice(-1));
            const lastDigitB = parseInt(b.cells[columnIndex].innerText.slice(-1));
            return lastDigitA - lastDigitB; // Ascending order based on last digit
        } else {
            cellA = (columnIndex === 0) ? parseInt(a.cells[columnIndex].innerText.replace('#', '')) : a.cells[columnIndex].innerText;
            cellB = (columnIndex === 0) ? parseInt(b.cells[columnIndex].innerText.replace('#', '')) : b.cells[columnIndex].innerText;
        }

        return (cellA < cellB) ? -1 : (cellA > cellB) ? 1 : 0; // Alphabetical or numeric comparison
    });

    rows.forEach(row => tbody.appendChild(row)); // Re-attach rows in sorted order
}

// Populate the table with the Coding day based on the Plate #
document.querySelectorAll('#driverTable tbody tr').forEach(row => {
    const plate = row.cells[3].innerText;
    const dutyDate = getDutyDate(plate);
    row.cells[4].innerText = dutyDate;
});

// Getting the formatted date
// Get current date and display in the format: Monday, September 23, 2024
const currentDate = new Date();
document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',  // This adds the day of the week (e.g., Monday)
    year: 'numeric',  // This adds the year (e.g., 2024)
    month: 'long',    // This adds the full name of the month (e.g., September)
    day: 'numeric'    // This adds the day of the month (e.g., 23)
});

// Driver data (could be moved to a separate file or a database)
const drivers = [
    { unit: "#001", driver: "Polking, Jich", altDriver: "Smith, Jane", plate: "ABC-123", coding: "Monday" },
    { unit: "#002", driver: "Golsing, Haller", altDriver: "Brown, Tom", plate: "XYZ-456", coding: "Tuesday" },
    { unit: "#003", driver: "Baucan, Jeremy", altDriver: "Green, Susan", plate: "PQR-789", coding: "Friday" },
    { unit: "#004", driver: "White, Anna", altDriver: "Black, Chris", plate: "DEF-012", coding: "Monday" },
    { unit: "#005", driver: "Taylor, Lisa", altDriver: "Hall, James", plate: "GHI-345", coding: "Wednesday" },
    { unit: "#006", driver: "Pine, Chris", altDriver: "Winslet, Kate", plate: "JKL-678", coding: "Thursday" },
    { unit: "#007", driver: "Alba, Jessica", altDriver: "Jordan, Michael B.", plate: "MNO-901", coding: "Monday" },
    { unit: "#008", driver: "Reynolds, Ryan", altDriver: "Johansson, Scarlett", plate: "PQR-234", coding: "Tuesday" },
    { unit: "#009", driver: "Watson, Emma", altDriver: "Radcliffe, Daniel", plate: "STU-567", coding: "Thursday" },
    { unit: "#010", driver: "Hardy, Tom", altDriver: "Hathaway, Anne", plate: "VWX-890", coding: "Friday" },
    { unit: "#011", driver: "Affleck, Ben", altDriver: "Gadot, Gal", plate: "YZA-123", coding: "Tuesday" },
    { unit: "#012", driver: "Cavill, Henry", altDriver: "Robbie, Margot", plate: "BCD-456", coding: "Thursday" },
    { unit: "#013", driver: "Hemsworth, Chris", altDriver: "Hiddleston, Tom", plate: "EFG-789", coding: "Friday" },
    { unit: "#014", driver: "Larson, Brie", altDriver: "Jackson, Samuel L.", plate: "HIJ-012", coding: "Tuesday" },
    { unit: "#015", driver: "Fassbender, Michael", altDriver: "Vikander, Alicia", plate: "KLM-345", coding: "Wednesday" },
    { unit: "#016", driver: "Theron, Charlize", altDriver: "Statham, Jason", plate: "NOP-678", coding: "Thursday" },
    { unit: "#017", driver: "Smith, Will", altDriver: "Smith, Jada Pinkett", plate: "QRS-901", coding: "Monday" },
    { unit: "#018", driver: "Reeves, Keanu", altDriver: "N/A", plate: "TUV-234", coding: "Tuesday" },
    { unit: "#019", driver: "Jackman, Hugh", altDriver: "N/A", plate: "WXY-567", coding: "Thursday" },
    { unit: "#020", driver: "Portman, Natalie", altDriver: "N/A", plate: "ZAB-890", coding: "Friday" },
];

// Get current day of the week
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = daysOfWeek[currentDate.getDay()];
document.getElementById("currentDate").innerText = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Filter drivers based on the coding schedule
const filteredDrivers = drivers.filter(driver => driver.coding !== currentDay);

// Function to populate table with the first five drivers
function populateFirstFive() {
    const driverSchedule = document.getElementById("driverSchedule");
    driverSchedule.innerHTML = ""; // Clear any existing content
    const firstFiveDrivers = filteredDrivers.slice(0, 5); // Get the first five drivers
    firstFiveDrivers.forEach(driver => {
        const row = `
            <tr>
                <td>${driver.unit}</td>
                <td>${driver.driver}</td>
                <td>${driver.altDriver}</td>
                <td>${driver.plate}</td>
            </tr>
        `;
        driverSchedule.innerHTML += row;
    });
}

// Function to show all drivers
function showAllDrivers() {
    const driverSchedule = document.getElementById("driverSchedule");
    driverSchedule.innerHTML = ""; // Clear existing content
    filteredDrivers.forEach(driver => {
        const row = `
            <tr>
                <td>${driver.unit}</td>
                <td>${driver.driver}</td>
                <td>${driver.altDriver}</td>
                <td>${driver.plate}</td>
            </tr>
        `;
        driverSchedule.innerHTML += row;
    });
}

// Show more and less functionality
document.getElementById("seeMoreBtn").addEventListener("click", () => {
    showAllDrivers();
    document.getElementById("seeMoreBtn").style.display = "none"; // Hide See More button
    document.getElementById("seeLessBtn").classList.remove("hidden"); // Show Show Less button
});

document.getElementById("seeLessBtn").addEventListener("click", () => {
    populateFirstFive(); // Revert to showing first five drivers
    document.getElementById("seeMoreBtn").style.display = "inline"; // Show See More button
    document.getElementById("seeLessBtn").classList.add("hidden"); // Hide Show Less button
});

// Initialize the first five drivers on page load
populateFirstFive();

// Image Gallery
// Array of image sources
const images = [
    'Images/pm_1709970780526_cmp_1.jpg',
    'Images/459437164_2650301388477549_21174017789693804_n.jpg',
    'Images/459346292_1172487267156212_2883374078259706850_n.jpg',
    'Images/att.AlVxzYA8zrHEoFZiohp5fSp1iDDAQFYU_BA2zPuXdTQ.jpg',
    'Images/att.IcMlXNNsNgM46iR36QuHwTodr6rVv83wFfl1lgmZNY4.jpg',
    'Images/att.THyXWIywV1Pgjls0F-6ci5YwBGpN54D5OsI0biBEspU.jpg',
    'Images/att.giGGBxuArWb6uwg29iHCa8zst5FlYTBxqo6P666imz8.jpg',
    'Images/att.ix-2ikrq-89I3GADcvsX6S6uw6bgdZikoWXXq8f7hSE.jpg',
    'Images/att.-N4Z04YKolVf0WwmCmS6SvckZvzZ-ULSK1lOTzVGpwg.jpg',
    'Images/att.PcPt5Ht86qG9c5ebZqzEE5myIdXQfiNAbD7vLSJ02Ek.jpg',
    'Images/att.qzIPWSDzKbjrDQUKW-FeZLvg19_zTBXyg8_edJ-yAQM.jpg',
];

let currentIndex = 0;

        function updateImage() {
            const imgElement = document.getElementById('gallery-image');
            const counterElement = document.getElementById('counter');
            
            imgElement.src = images[currentIndex];
            counterElement.textContent = `${currentIndex + 1}/${images.length}`;
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }

        function previousImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        }
