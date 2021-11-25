# transaction-manager
Due to time constraints this is pretty much a first pass at this project. 
Ideally unit tests would be included and the styling improved.  

## Project setup
```
npm install
```

### Compiles javascript
```
npm run build
```

### run server
```
npm install -g json-server
cd server
json-server --watch db.json
The server should be running on port 3000 (the base url being used by axios is http://localhost:3000/)
```
