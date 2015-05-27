####
# Script used to configure and setup the dependincies after being transfered to the server as a minimal zip file
####

# Download bower dependencies
bower install
npm install minifier
./node_modules/minifier/index.js css/
./node_modules/minifier/index.js js/

