After an ```npm install``` the folowing line needs to be added to ```/node_modules/semver/semver.js``` inside the function that opens around line 300:
```
  if (version === undefined) version = '2.0.0';
```
Parcel has a MAJOR issue that they don't appear willing to address in Parcel V1 that they should have fixed in V2 once it's out of beta.

Until then this will bundle as long as that line is added. Not ideal but at least removed the complete blocker. 