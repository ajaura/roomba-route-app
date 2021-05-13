# Roomba Route App
# Amber Jaura

# Intro 


- This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hover positions. The bottom left corner is the point of origin for the grid.
- This room has X and Y coordinates for the locations of patches of dirt in the room
- The Roomba has an initial position and Roomba is always on when running the app
- The roomba is given driving commands as cardinal directions N for North, S for South, E for East, and W for West

The room is rectangular and has no obstacles except walls, no doors and all locations in the room will be clean unless given as locations of the patches of dirt within the input.txt.

As the Roomba moves it cleans any dirt patches and driving into a wall has no effect on the position as the Roomba skids in place.

# Goal
The goal of the program is to take the room dimensions, the locations of the dirt patches, Roomba's location and the driving instructions as input and to then output the following:

- The final hover position (X, Y)
- The number of patches of dirt the robot cleaned up

# Input
Program input is received in a file input.txt and resides in the same directory as my executable program.

# Example:
////////////////////////

5 5
1 2
1 0
2 2
2 3
NNESEESWNWW

//////////////////////// 

- the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
- the second line holds Roomba initial position
- subsequent lines contain the zero or more positions of patches of dirt (one per line)
- the next line then always contains the driving instructions (at least one)

# Output
Output is displayed in the terminal 

- First line of my program output displays the X and Y coordinates marking the position of Roomba after processing all commands.
- The second line of the program output displays the number of patches of dirt the robot cleaned up

# Prior to running the App 
1. Ensure that both Node and NPM are installed
    - check by using the commands

////////////////////////
node -v  
npm -v
///////////////////////

The versions of node and npm should display in your terminal output but if needed download at https://nodejs.org/en/download/). NPM is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.

# Test the program
Modify the input.txt as needed for range of x and y coordinates of the room, starting roomba position, dirt patches in the room and directions (N,S,E,W) within the input.txt file. 

# Run the App

1. Open Terminal
2. Change to the working directory for the location where you downloaded the zip & extracted the contained files
3. Run the command node roomba-route.js to begin the app and modify the input.txt as needed for testing.

Happy testing! :) 