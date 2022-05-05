# React: Autocorrection App

## Environment 

- React Version: 16.13.1
- Node Version: 12(LTS)
- Default Port: 8000

## Project Specifications 

Create a basic autocorrection application, as shown below. Application requirements are given below, and the finished application must pass all of the unit tests.

![Gif](https://hrcdn.net/s3_pub/istreet-assets/776SJzqheIQd4c0r6b7_ig/autocorrection.gif)

Your task is to complete the implementation of `src/components/AutocorrectTextarea.js` according to the following requirements:

- AutocorrectTextarea is a component that takes a corrections Object that maps strings to their corrections. For example, the below corrections Object denotes that 'really' is a correction for 'realy', and 'weird' is a correction of 'wierd':
```javascript
const corrections = {
  'realy': 'really',
  'wierd': 'weird',
};
```
- You may assume that no value of the corrections Object appears as the property in the corrections Object.
- AutocorrectTextarea renders a textarea element and lets users write text in it.
- You may assume that the text consists only of words separated by single space characters.
- Once a space character is typed, the word preceding it is considered to be complete and must be autocorrected according to the corrections Object if a correction for it exists in the corrections Object.

Initially, the file is filled with boilerplate code. Note the following:

- The textarea element must have `data-testid="textarea"`.

Please note that the component has the above data-testid attributes for test cases and certain classes and ids for rendering purposes. It is advised not to change them.

**Read-Only Files**
- `src/App.test.js`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
