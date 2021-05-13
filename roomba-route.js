// Node.js file system module to enable working with the computer file system 
var fs = require('fs');

// Input stores the method reading in the input.txt file for the Roomba detailing :
// 1) Room Dimensions (X,Y)
// 2) The Roomba's initial position (X,Y)
// 3) Coordinates of Dirt Patch 1 (X,Y)
// 4) Coordinates of Dirt Patch 2... (X,Y)
// 5) Coordinates of Dirt Patch N (X,Y)
// 6) One or more Direction Command(s) for the Roomba (N, S, E, W)
var input = fs.readFileSync('input.txt', 'utf8');

// Define Variables for Roomba-Route App

let initialPosition = []; //Array for Roomba initial position
let grid = []; //Grid Array to hold coordinate values
let xRows = 0 //# of Rows on X-Axis for Room Grid
let yCols = 0 //# of Cols on Y-Axis for Room Grid
let dirtPatches = []; //Array for Dirt Patches
let directions = "" //String value for Direction Commands through Characters (N, S, E, W)
let finalPosition = [0, 0]; //Array for final position of the Roomba
let count = 0; //# of Dirt Patches identified
let currentPosition = []; //Current Position Array of Roomba
let inputGridArray = [] // Array for Room provided by input.txt 

// The function updates the starting position, grid, dirt patches, directions, and current position using the info provided in the input.txt
function initializeGrid(input) {
    // Updates the inputGridArray so each line in the text file is an element in the array
    inputGridArray = input.split("\n");
    // Store the length of the inputGridArray (number of rows specified for room dimensions in the input.txt)
    let len = inputGridArray.length
    // Iterate through the inputGridArray to set up the starting position, grid, dirt patches, directions and current position
    for (let i = 0; i < len; i++) {
        // Checking the value of the first character in the row specific to directionals N, E, S or W 
        if (inputGridArray[i][0] === "N" || inputGridArray[i][0] === "E" || inputGridArray[i][0] === "S" || inputGridArray[i][0] === "W") {
            // If the value is N, E, S or W this value remaining values of the content and update the variable directions
            directions = inputGridArray[i]
            // If no initial position given for the roomba in the index.txt file return error message
            if (typeof currentPosition[0] != 'number') {
                console.log("No value provided for roomba initial position. Update your index.txt file and try again. Make sure your roomba initial position coordinates are on the second line!")
                return;
            }
            else if (currentPosition[0] < 0 || currentPosition[1] <0 || currentPosition[0]>xRowsMax || currentPosition[1]>yColsMax) {
                console.log("Position given is not within the room dimensions. Please update with a starting position which is within the given dimensions.")
                return;
            }
            else
                //Call to the updateCount function to see if the current position of the roomba is a dirt patch, if it is, update the count 
                updateCount(currentPosition[0], currentPosition[1])
                // The startRoomba function will now have the directions passed to use in the call for roomba's moves, updating positions, and count on dirt patches
                startRoomba(directions)
                return;
        }
        // the first line of the file holds the room dimensions, so the inputGridArray at index 0 will represent the grid row and grid column 
        else if (i === 0) {
            let numArray = inputGridArray[i].split(' ')
            // converting the string into a number
            let xRows = Number(numArray[0]);
            let yCols = Number(numArray[1]);
            // Checks if the grid allows for Roomba to move within one patch if X,Y is 0,1 or 1,0 
            if (xRows <= 0 && yCols <= 0) {
                //Error message out for Roomba negative values 
                console.log("The X and Y coordinates you have given for the grid are not valid.")
                return;
            }
            // Update values for grid based on xRowsMax and yColsMax
            // Then, pass the dimensions of the room to use for the stopRoomba function use for hitting a wall
            else {
                grid = [xRows, yCols];
                xRowsMax = xRows;
                yColsMax = yCols;
            }
        }
        //Checks the index of the inputGridArray  at 1 which holds the coordinates and can be used for the initalPosition value for the Roomba
        else if (i === 1) {
            let numArray = inputGridArray[i].split(' ')
            // converting the string into a number
            let xRows = Number(numArray[0]);
            let yCols = Number(numArray[1]);
            // updating the starting position and current position
            initialPosition = [xRows, yCols];
            currentPosition = initialPosition;
        }
        // The remaining elements of the array represent dirt patches where the string must be converted using the Number function
        // Then, the [X,Y] coordinates for each dirt patch are updated to the dirtPatches Array using the Push function
        else {
            let numArray = inputGridArray[i].split(' ')
            // converting the string into a number using the function while passing X and Y coordinates
            let xRows = Number(numArray[0]);
            let yCols = Number(numArray[1]);
            // I want the coordinates to be added into the dirt array variable
            dirtPatches.push([xRows, yCols]);
        }

    }

    //Error message out and reprompting user to update with Roomba instructions if null value found 
    if (directions === '') {
        console.log("No directions were given for the Roomba. Please update the index.txt file and specific directions using N, S, E, W.")
    }
}

initializeGrid(input)

//The function starts up the roomba to move and clean dirt patches using directional commands
function startRoomba() {
    // Set the direction using the first given command in the input.txt
    let direction = directions[0]
    // if the value of direction is undefined exit the function
    if (direction === undefined) {
        stopRoomba()
        return;
    }
    // Checks if the direction command is North, the roomba will move up one column so increase the column value by 1 for the grid using the currentPosition array element
    else if (direction === "N") {
        let xRows = currentPosition[0];
        let yCols = currentPosition[1] + 1;
        //if the column value goes beyond the room grid dimensions, no movement & print out roomba hit a wall
        if (yCols > yColsMax) {
            console.log("The roomba is stuck and can't move due to a wall.")
            return;
        }
        else {
            // update the current position & implement the function to update the count if the current position is tied to a dirt patch
            currentPosition = [xRows, yCols];
            updateCount(xRows, yCols)
        }
    }
    // if the value of the direction is East
    else if (direction === "E") {
        // define and assign values to xRows and yCols variables, yCols is not impacted, however xRows needs to increase by 1 since the roomba is moving right/east
        let xRows = currentPosition[0] + 1;
        let yCols = currentPosition[1];
        // if the updated xRows is greater than the xMax dimension of the room, then the roomba cannot move in that direction (cannot move through a wall)
        if (xRows > xRowsMax) {
            console.log("The roomba is stuck and can't move due to a wall.")
            return;
        }
        else {
            // Update the current position
            currentPosition = [xRows, yCols];
            // Call to the updateCount function which checks ifthe current position of the roomba is a dirt patch, if it is, update the count variable
            updateCount(xRows, yCols)
        }
    }
    // Checks for if the direction is South
    else if (direction === "S") {
        // Update yCols by decrementing the value as the position moves downwards 1 
        let xRows = currentPosition[0];
        let yCols = currentPosition[1] - 1;
        // Checks if the updated yCols is less than 0 where the roomba cannot move due to reaching the edge of the grid  
        if (yCols < 0) {
            console.log("The roomba is stuck and cannot move due to a wall.")
            return;
        }
        else {
            // Update the current position
            currentPosition = [xRows, yCols];
            // calling on updateCount function below to see if the current position of the roomba is a dirt patch, if it is, update the count variable
            updateCount(xRows, yCols)
        }
    }
    // if the value of the direction is West
    else if (direction === "W") {
    // Update xRows by decrementing the value as the position moves left 1 
        let xRows = currentPosition[0] - 1;
        let yCols = currentPosition[1];
        // Checks whether xRows is less than 0 where the roomba cannot move due to reaching the edge of the grid
        if (xRows < 0) {
            console.log("The roomba is stuck and cannot move due to a wall.")
            return;
        }

        // Remaining condition means the directions commands have been completed 
        // Update the current position and pass values for position to pass to updateCount to check & update dirt patches count if true for the coordinates
    
        else {
            // Update the current position
            currentPosition = [xRows, yCols];
            updateCount(xRows, yCols)
        }
    }
    //Use the Substring function to remove the first character in the directions due to the updated current position and dirt patches count
    //This lets us move on to the next direction command and movements needed for the Roomba
    directions = directions.substring(1);
    //The startRoomba function loops through each character of direction commands given to update the current position and dirt patches count at each line given within input.txt
    startRoomba(directions)
}


//The function updates count variable if the current position matches the coordinates for a dirt patch
function updateCount(xRows, yCols) {
    if (dirtPatches.length === 0) {
        return;
    }
    else {
        // Checks within the dirtPatches array for each set of coordinates. Increments count on dirt patches if this matches up. Then the dirtPatches array is updated by using the splice function to remove the element
        for (let j = 0; j < dirtPatches.length; j++) {
            let x = dirtPatches[j][0]
            let y = dirtPatches[j][1]
            if (x === xRows && y === yCols) {
                count++
                let removedpatch = dirtPatches.splice(j, 1);
            }
        }
    }
}

//Function to stop Roomba & print the final position of the roomba and how many dirt patchs were cleaned
function stopRoomba() {
    // update finalPosition variable to be the currentPosition
    finalPosition = currentPosition
    // print out the final hover position (x and y coordinates)
    console.log(finalPosition[0], finalPosition[1])
    // print out the total # of dirt patches the roomba cleaned up
    console.log(count)
}