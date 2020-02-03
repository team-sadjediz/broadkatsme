#### View project online:

www.broadkats.me  
http://www.broadkats.me

Currently not working:  
[broadkats.me](broadkats.me)  
https://www.broadkats.me

#### To download and run locally:
1. Open a cli, navigate to desired directory, and then enter:
```
git clone https://github.com/team-sadjediz/broadkatsme.git

cd broadkatsme\
npm ci     // installs express server dependencies
npm start  // starts the local express server

cd client\
npm ci     // installs react frontend dependencies
npm start  // starts the local react app
```

2. Then open a browser and navigate to either or both:

  - Express server: [localhost:5000/test](http://localhost:5000/test) (havent configured root path yet)

  - React app: [localhost:3000](http://localhost:3000)

#### To deploy:

1. Download and install [Heroku](https://devcenter.heroku.com/articles/heroku-cli):
2. Restart your computer.
3. Open a CLI and enter:
```
cd <into project directory>
heroku login
```
4. Login to our shared heroku account.
5. Add a remote ref to the heroku project:
```
git remote add heroku https://git.heroku.com/broadkatsme.git
```
6. To deploy:
```
git push heroku master
```

NOTE: Everything you commit locally to the master branch will be deployed once you do step #6.
