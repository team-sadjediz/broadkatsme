
#### View project online:
www.broadkats.me
http://www.broadkats.me

Currently not working:
broadkats.me 
https://www.broadkats.me 

#### To download and run locally:
```
git clone https://github.com/team-sadjediz/broadkatsme.git
cd broadkatsme\
npm ci // installs express server dependencies
npm start // starts the local express server

cd client\
npm ci // installs react frontend dependencies
npm start // starts the local react app
```
Then open a browser and navigate to either or both:
a. for express server:
localhost:5000

b. for react app:
localhost:3000

#### To deploy:
Download and install Heroku:
https://devcenter.heroku.com/articles/heroku-cli

Restart your computer.

Open a CLI:
```
heroku login
```

Login to our shared heroku account.

...some steps to link the project on heroku to this git repo.

Everytime you wanna deploy:
```
git push heroku master
```
