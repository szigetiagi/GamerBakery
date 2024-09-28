// Define constants for various elements and API endpoints
const inputField = '#username'; // Selector for input field
const searchButton = '#search'; // Selector for search button
const loader = '#loader'; // Selector for loader element
const dataField = '#user-data'; // Selector for user data display area
const GITHUB_PUBLIC_API = 'https://api.github.com/users/'; // Endpoint for GitHub API
const FREE_API_TO_PRACTICE = 'https://jsonplaceholder.typicode.com/users?username='; // Endpoint for a free API to practice
const FREE_API_TO_PRACTICE_IMAGES = 'https://jsonplaceholder.typicode.com/photos?id='; // Endpoint for images related to the practice API

// Function to handle input events
export function inputEvents(){
    document.querySelector(searchButton).addEventListener('click', async ()=> {
        // Introduce a delay of 2 seconds
        const delay = new Promise((resolve,reject)=>{
            setTimeout(resolve,2000)
        })
        await delay; // Wait for the delay to finish

        loading(); // Show loader

        // Get username from input field
        const username = getUsername();
        if(username && username.length != 0){
            console.log('Searching for user:', username);

            // Fetch user data from the practice API
            const data = await fetchUserData(username);

            // Extract the first user's data from the response
            const userData = data[0];

            if(userData){
                // If user data is available

                // Clear the data field
                document.querySelector(dataField).innerHTML = "";

                // Extract user ID
                const ID = userData.id;

                // Fetch user image from the practice images API
                const response = await fetch(`${FREE_API_TO_PRACTICE_IMAGES}${ID}`);
                const imageData = await response.json();
                const image = imageData[0].thumbnailUrl;

                // Hide the loading indicator
                hideLoading();

                // Create an image element and set its source to the fetched image
                const IMG = document.createElement('img')
                IMG.src = image;

                // Append the image to the data field
                document.querySelector(dataField).append(IMG);
                console.log(imageData);

                // Display user data in the data field
                const keysArray = Object.keys(userData);
                keysArray.forEach((key) => {
                    const dataRow = userData[key];
                    if(typeof dataRow === 'string'){
                        // Create a div element to display each piece of user data
                        const div = document.createElement("div");
                        div.innerHTML = `${key}: ${dataRow}`;
                        document.querySelector(dataField).append(div);
                    }
                });
            } else {
                // If user data is not found, display a message
                document.querySelector(dataField).innerHTML = "User not found";
            }
        }
    });
}

// Function to fetch user data from the practice API
async function fetchUserData(username){
    const response = await fetch(`${FREE_API_TO_PRACTICE}${username}`);
    const data = await response.json();
    return data;
}

// Function to get the value of the input field
function getUsername(){
    return document.querySelector(inputField).value;
}

// Function to show the loading indicator
function loading(){
    document.querySelector(loader).classList.remove('hidden');
}

// Function to hide the loading indicator
function hideLoading(){
    document.querySelector(loader).classList.add('hidden');
}

// Exporting necessary constants and functions
export {inputField, searchButton, loader};
