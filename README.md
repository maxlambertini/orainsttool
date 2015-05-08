# Oracle Instance Script Generation

The html page contained here  is a quick tool to help DBA create a database instance on linux systems when X11 -- and thus dbca -- is not available. This tools is opinionated, that is it enforces a datafile tree which may or may not be of your liking. If you don't like it, just change directories generated in #3 and double-check the path specified in CREATE DATABASE section (#5).

A note to the DBA: the DB created is in NOARCHIVELOG mode.

## Instructions

Download this project (duh)

Open `index.html` file in browser

Fill the input boxes with the appropriate values. 

Then, follow the steps, copy the preformatted code and paste it in a unix shell. For more informations, refer to this link from Oracle to learn how to create an Oracle instance using the command line.

## Want to test this tool?

Easy. Simply go to http://maxlambertini.github.io/orainsttool/  and check it out. Pretty it ain't basic it certainly is, creating an instance using command-line, certainly help it can ;-) 


