# Template for Flask and React integration with basic example

Generic setup (with example) for Flask API (with SQLAlchemy and Marshmallow) and React. 

The project has just 2 API endpoints: for getting the list of hackathons and submitting a new hackathon. The app is simplistic and has zero validation, so please enter the date as 'yyyy-mm-dd'


## Flask and DB setup 
Create a virtual env and install requirements: 

```pip install -r requirements.txt```

Initalize DB and migrate: 

```
flask db init 
python manage.py
```

Run the API 

```
chmod 777 run 
./run
```

You can go to main page or try endpoints. Since we initalized an empty DB, there is nothing there yet. 

## React 


If you don't have package.json, you can start React project from scratch:
```
npm init -y
npm i webpack babel-loader @babel/preset-react @babel/core -D
npm i babel-preset-react html-webpack-plugin -D
npm i webpack-dev-server css-loader style-loader -D
npm i @babel/plugin-proposal-class-properties webpack-cli -D
npm i react react-dom -S
```

Otherwise, just run install in the frontend folder 
```npm install```

Then you can run React in the second terminal 
```npm start```
