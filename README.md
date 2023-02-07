# **<ins>---- PORTFOLIO 2 ----<ins>**

 <ins>Student numbers:<ins>

- s341873
- s341879
- s341857
- s341844


For the Portfolio 2 the group have chosen **task 2** from the assignment. We have created a snake game, based on the
classic game, but with an extra feature - lazers/gun. Therefore, our game is called *Snakes with Guns*.

## Development

### Installing dependencies
Running 
```
npm install
```
will install dependencies listed in `dependencies` and `devDependencies` in package.json

### Format code
We use [Prettier](https://prettier.io/) to format JavaScript, CSS and HTML files.
Running
```
npm run format
```
will run prettier and format the code. 

## **Features and languages in the program**
The languages and styling that are used in this project are the following:
- Javascript/Typescript
- Node
- HTML
- CSS


## **Running the program**

### <ins>From the terminal<ins>

If you want to run the program from the terminal, open a new terminal window with the path of the project and make sure
you are in the root of the project (*Portfolio2_DATA2410* in this case).

To install dependencies you need to have node installed, and run the following in your terminal:
```
$ npm install
```
This will install all dependencies listed in `package.json`.

After installing dependencies you need to build the server and frontend applications. 

We use [Webpack](https://webpack.js.org/) for building and bundling our frontend app. We chose to use Webpack because it can process import/export
statements in our code. Webpack creates one single javascript file as the entry point for our frontend-app.

We also use [TypeScript](https://www.typescriptlang.org/) to add typings to our JavaScript. We found it easier to discover
potential bugs and work together if we had a type system to help us.

After these dependencies have been installed, continue in your current terminal window and run the following commands to build the apps:
```
$ npm run build
```

Then you can start the server locally using:
```
$ npm run start
```

This will start the server and make the app (server) available to serve HTTP requests. The terminal should show this
message:

```
Server started on port 3000!
```
You can open a browser window with this link: [127.0.0.1:3000](127.0.0.1:3000) and the program should be up and running and looking
like this:

<img width="1424" alt="Skjermbilde 2021-05-20 kl  11 23 47" src="https://user-images.githubusercontent.com/55739737/118954875-7a9b6200-b95e-11eb-9dab-bbcf25be18ae.png">

### <ins>From a Docker Image<ins>

You can choose to run the program via an image and build a Docker Container from this. We have been running and building
images and docker container with *Docker Desktop*, which is compatible with both Windows, Mac and Linux.

1. Open a terminal window and make sure you are in the root of the project folder (Portfolio2_DATA2410).
Proceed to run the following commands:

```
$ docker build -t image_name .
```

*image_name* is a name you can choose. Give it some time, and when the build-process is finished your terminal
window should look something like this:


```
[+] Building 88.8s (5/10)                                                                                                                                                   
 => [internal] load build definition from Dockerfile                                                                                                                   0.2s
 => => transferring dockerfile: 597B                                                                                                                                   0.1s
 => [internal] load .dockerignore                                                                                                                                      0.1s
 => => transferring context: 148B                                                                                                                                      0.1s
[+] Building 89.0s (5/10)                                                                                                                                                   
 => [1/5] FROM docker.io/library/node:16-alpine@sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4                                               76.7s
 => => resolve docker.io/library/node:16-alpine@sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4                                                0.0s
 => => sha256:2a658af97ff6d31f7487c6f54d65875770274428b604c949bd54e4f439a083f5 1.16kB / 1.16kB                                                                         0.0s
 => => sha256:72ca8e2f26fa0f3384989bc175ae6eb322fb33afdae8a7b6129bda752d9ca411 6.73kB / 6.73kB                                                                         0.0s
 => => sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4 1.43kB / 1.43kB                                                                         0.0s
[+] Building 89.3s (5/10)                                                                                                                                                   
 => [1/5] FROM docker.io/library/node:16-alpine@sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4                                               77.0s
[+] Building 89.4s (5/10)                                                                                                                                                   
 => [1/5] FROM docker.io/library/node:16-alpine@sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4                                               77.1s
 => => sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4 1.43kB / 1.43kB                                                                         0.0s
[+] Building 199.1s (11/11) FINISHED                                                                                                                                        
 => [internal] load build definition from Dockerfile                                                                                                                   0.2s 
 => => transferring dockerfile: 597B                                                                                                                                   0.1s 
 => [internal] load .dockerignore                                                                                                                                      0.1s 
 => => transferring context: 148B                                                                                                                                      0.1s 
 => [internal] load metadata for docker.io/library/node:16-alpine                                                                                                     11.8s 
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                            0.0s 
 => [1/5] FROM docker.io/library/node:16-alpine@sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4                                              120.2s 
 => => resolve docker.io/library/node:16-alpine@sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4                                                0.0s
 => => sha256:2a658af97ff6d31f7487c6f54d65875770274428b604c949bd54e4f439a083f5 1.16kB / 1.16kB                                                                         0.0s
 => => sha256:72ca8e2f26fa0f3384989bc175ae6eb322fb33afdae8a7b6129bda752d9ca411 6.73kB / 6.73kB                                                                         0.0s
 => => sha256:572689dd24a48fb0058c7fe92229108cc47f428be5fec36ec367e8263817f4a4 1.43kB / 1.43kB                                                                         0.0s
 => => sha256:4f9832ab4c84eeeebe07317d77832bf516f6eadbba3e95982549488e61c1898f 35.83MB / 35.83MB                                                                      92.1s
 => => sha256:b660fdf4970674d8cfd489741fa49d6d0f9179d1b56a0f524212240598d6e1ce 2.35MB / 2.35MB                                                                         4.1s
 => => sha256:feaab9ebc3631f4a358d1f4fd58ea4d622db86d0adbb633cde0cc4f183407fc9 281B / 281B                                                                             6.1s
 => => extracting sha256:4f9832ab4c84eeeebe07317d77832bf516f6eadbba3e95982549488e61c1898f                                                                             22.9s
 => => extracting sha256:b660fdf4970674d8cfd489741fa49d6d0f9179d1b56a0f524212240598d6e1ce                                                                              1.4s
 => => extracting sha256:feaab9ebc3631f4a358d1f4fd58ea4d622db86d0adbb633cde0cc4f183407fc9                                                                              0.0s
 => [internal] load build context                                                                                                                                      0.8s
 => => transferring context: 4.17MB                                                                                                                                    0.8s
 => [2/5] WORKDIR /home/node/app                                                                                                                                       0.4s
 => [3/5] COPY package*.json ./                                                                                                                                        0.1s
 => [4/5] RUN npm install                                                                                                                                             63.4s
 => [5/5] COPY . .                                                                                                                                                     0.3s
 => exporting to image                                                                                                                                                 2.3s
 => => exporting layers                                                                                                                                                2.2s
 => => writing image sha256:8acb1f5a091605c67c7e19bf72990b561914af6b755af0e55103b51ce95577d8                                                                           0.0s
 => => naming to docker.io/library/portfolio2_data2410                                                                                                                 0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them

```

2. To start a docker container from the image you have built, run the following command:
```
$ docker run -p 3000:3000 image_name
```

The terminal should show the following:
```
> portfolio2_data2410_snakeswithguns@1.0.0 start
> node server/server.ts

Server started on port 3000!
```

You can proceed into a browser window and type  [127.0.0.1:3000](127.0.0.1:3000), and you should see the same page
as the picture of the browser above.

## **The program: Expected outcome**

### General information
In the top right corner of the start page there is a button that says *How to play*. Clicking this gives you some help 
and information about how the game works and which controllers you have to use.

<img width="1427" alt="Skjermbilde 2021-05-20 kl  11 37 56" src="https://user-images.githubusercontent.com/55739737/118956531-f944cf00-b95f-11eb-9086-1bcf7be4cb21.png">

To the left of the button, there is a speaker with the text *On* besides it. Clicking the speaker turns the music and 
sound effects in the game *off*. Both this and the *How to play* button can be clicked anytime. 

There are two game-modes you can choose between when you enter the start page, which is
single- and multiplayer. Type in your preferred nickname and choose what you want to do.

<img width="1428" alt="Skjermbilde 2021-05-20 kl  11 27 16" src="https://user-images.githubusercontent.com/55739737/118954746-5c356680-b95e-11eb-8f95-2786d06c33f8.png">

Both single- and multiplayer shows the snake/player that has reached the highest score in the current mode.
*NB!* We have used localstorage to store the score, so that means that the score that shows the highest score that
occurred in *your current browser*. 

### <ins>Singleplayer
When entering *singleplayer mode*, you are the only snake in the room.
The goal is to eat as much food as possible and
collect points (+10 ponts for each food). You can play as long as you wish - but beware of the bot-snake that is lurking
around. If you hit the bot-snake or it hits you - it is *game over*. If you hit yourself, it is also *game over*. 
Among the food on the gameboard there are also obstacles. These can be eaten, but you *lose* 10 points from your 
current score if you do.

<img width="1427" alt="Skjermbilde 2021-05-20 kl  11 30 33" src="https://user-images.githubusercontent.com/55739737/118955284-d6fe8180-b95e-11eb-9ebc-2064c462a20e.png">

Here is a screenshot that shows the highscore in singlemode, and the current score of the one playing:

<img width="1426" alt="Skjermbilde 2021-05-20 kl  11 35 25" src="https://user-images.githubusercontent.com/55739737/118956080-93584780-b95f-11eb-8261-b5e80f87de54.png">

The game clearly tells you when the game is over for you:

<img width="1005" alt="Screenshot 2021-05-23 at 23 49 14" src="https://user-images.githubusercontent.com/2527764/119277738-9da96880-bc21-11eb-9709-d02a92ad9ed4.png">

If it is game over for you, you can simply refresh the page and play again. (Or hit play again if the button works :-))



### <ins>Multiplayer
When entering *multiplayer mode*, you are presented with two options: create a room and start playing or join a room
with a room-id. If a friend has already created a room, they can share this ID with you and you can join the same room 
and start playing together.

The gameplay is the same as in singleplayer-mode, except there are not any bots or obstacles other than the other
players/snakes. If you run into yourself or any other snake/player - it's *game over*.

*SCREENSHOT OF MULTIPLAYER OPTIONS*

There must me at least two snakes in the room for the game to start. Once there are two snakes together in the room, the
game starts. Maximum players in one room are 5. If a room is full, you are not able to enter.

Here is a screenshot of one player waiting, and it clearly says below the gameboard that wee need
at least two snakes to start - so we are waiting. The *lobby ID* can be seen to the right of the gameboard,
and this can be shared with friends you want to join and play. 

<img width="1433" alt="Skjermbilde 2021-05-20 kl  11 55 04" src="https://user-images.githubusercontent.com/55739737/118959612-c8b26480-b962-11eb-85c2-f889e11b84f5.png">

Once a second snake has entered, the game starts and the board is filled with food.

<img width="1427" alt="Skjermbilde 2021-05-20 kl  11 56 26" src="https://user-images.githubusercontent.com/55739737/118959806-f26b8b80-b962-11eb-8e10-3219de789395.png">
The overview of the connected players can be seen to the left.




