#### View project online:

www.broadkats.me  
http://www.broadkats.me

Currently not working:  
[broadkats.me](broadkats.me)  
https://www.broadkats.me

#### To download and run locally:

```
git clone https://github.com/team-sadjediz/broadkatsme.git

cd broadkatsme\
npm ci     // installs express server dependencies
npm start  // starts the local express server

cd client\
npm ci     // installs react frontend dependencies
npm start  // starts the local react app
```

Then open a browser and navigate to either or both:

a. for express server:  
[localhost:5000/test](localhost:5000/test) (havent configured root path yet)

b. for react app:  
[localhost:3000](localhost:3000)

#### To deploy:

Download and install Heroku:  
https://devcenter.heroku.com/articles/heroku-cli

Restart your computer.

Open a CLI:

```
cd <into project directory>
heroku login
```

Login to our shared heroku account.

...some steps to link the project on heroku to this git repo (will edit this step soon).

```
git remote add heroku https://git.heroku.com/broadkatsme.git
```

Now everytime you commit something using `git commit -m "exmaple"`, it will be ready to deploy.  
And when you actually want to deploy:

```
git push heroku master
```
