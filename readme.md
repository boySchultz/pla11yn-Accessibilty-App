## Setup

install dependencies

```sh
yarn install
```

run locally

```sh
yarn start
```

## Usage
once locally served, the App can either be Used on an Android or iOS emulator. 
alternatively, the App can be tested and debugged by Using Expo Go on your Phone and scanning the QR Code that gets generated when you call yarn start. 

if you should run into unexpected issues, you can reload the app by hitting "r" inside of your CLI or using the reload function of you emulator or phone.
## Tech Stack
- The Web App is build with React Native and relies on UI Elements that are provided by React and React Native Paper
- Material UIs Engine is used for global style definitions
- The Statemanagement Library Zustand handles the State of the Accessibilty Settings and memorizes the individual setup
- the WebView API enables interaction with and manipulation of Webcontent
