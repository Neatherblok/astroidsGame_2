class Game {
    //global attr for canvas
    //readonly attributes must be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; // find the right type
    private readonly ctx: CanvasRenderingContext2D; // find the right type


    //some global player attributes
    private readonly player: string = "Neatherblok";
    private readonly score: number = 400;
    private readonly lives: number = 3;
    private readonly highscores: Array<any>; //TODO: do not use 'any': write an interface!

    private leftPressed: boolean;
    private rightPressed: boolean;
    private upPressed: boolean;
    private downPressed: boolean;

    private shipXOffset: number = -50;
    private shipYOffset: number = -37;

    private readonly asteroids: Array<any> = [];

    public constructor(canvasId: HTMLCanvasElement) {
        //construct all canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //set the context of the canvas
        this.ctx = this.canvas.getContext('2d');
        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ]

        // all screens: uncomment to activate 
        this.start_screen();
        // this.level_screen();
        // this.title_screen();

    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Function to initialize the splash screen
     */
    public start_screen() {

        this.text("yellow", 100, "center", "Asteroids", this.canvas.width / 2, 110);
        this.text("white", 40, "center", "Press play to start", this.canvas.width / 2, this.canvas.height - 170);
        this.writeStartButton();
        this.image(this.canvas.width / 2 - 50, this.canvas.height / 2 - 50, 1, "", 0, null, "", null, null, "Meteors/meteorBrown_big1");

    };

    public writeStartButton() {
        this.image(this.canvas.width / 2 - 100, this.canvas.height - 140, 1, "black", 25, "center", "START", this.canvas.width / 2, this.canvas.height - 110, "UI/buttonBlue");
        this.canvas.addEventListener('click', (evt) => this.eventHandeler(evt));
    };

    public eventHandeler(event: MouseEvent) {
        console.log(event);
        const buttonX = this.canvas.width / 2 - 100;
        const buttonY = this.canvas.height - 140;
        const buttonW = 222;
        const buttonH = 32;
        if (
            event.x > buttonX &&
            event.x < buttonX + buttonW &&
            event.y > buttonY &&
            event.y < buttonY + buttonH
        ) {
            // Executes if button was clicked!
            console.log('Button was clicked!');
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvas.removeEventListener('click', (event) => this.eventHandeler(event));
            this.level_screen();
            window.addEventListener("keydown", (event) => this.keyDownHandler(event));
            window.addEventListener("keyup", (event) => this.keyUpHandler(event));

            window.setInterval(() => this.draw(), 1000 / 30);
            window.setInterval(() => this.text("white", 20, "right", `Your score: ${this.score}`, this.canvas.width - 30, 62.5), 1000 / 30)
            window.setInterval(() => this.drawPlayerLives(), 1000 / 30)
        }
    }



    //-------- level screen methods -------------------------------------
    /**
     * Function to initialize the level screen
     */
    public level_screen() {
        //1. load life images
        //2. draw current score
        this.text("white", 20, "right", `Your score: ${this.score}`, this.canvas.width - 30, 62.5);
        //3. draw random asteroids
        //const amountAstroid = this.randomNumber(0, 5);
        //console.log(amountAstroid);
        for (let i = 0; i < 5; i++) {
            this.drawRandomAsteroids();
            //4. draw player spaceship'
        }
        console.log(this.score)
    }

    public drawPlayerLives() {
        const lifeImg = new Image();
        lifeImg.addEventListener('load', () => {
            this.ctx.drawImage(lifeImg, 30, 50, 33, 25);
            this.ctx.drawImage(lifeImg, 70, 50, 33, 25);
            this.ctx.drawImage(lifeImg, 110, 50, 33, 25);
        });
        lifeImg.src = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png'
    }

    public drawRandomAsteroids() {
        const astroidPictures = ['meteorBrown_big1', 'meteorBrown_big2', 'meteorBrown_big3', 'meteorBrown_big4', 'meteorBrown_med1', 'meteorBrown_med3', 'meteorBrown_small1', 'meteorBrown_small2', 'meteorBrown_tiny1', 'meteorBrown_tiny2'];
        const astroidDirections = ['leftup', 'leftdown', 'rightdown', 'rightup'];
        const randomWidthPlace = this.randomNumber(-100, this.canvas.width + 100);
        const randomHeightPlace = this.randomNumber(-100, this.canvas.height + 100);
        const randomAstroid = this.randomNumber(0, astroidPictures.length - 1);
        const randomAsteroidPicture = (astroidPictures[randomAstroid]);
        if (randomWidthPlace < 0) {
            if (randomHeightPlace < 0) {
                var asteroidDirection = 'rightdown';
            }
            else if (randomHeightPlace > this.canvas.height) {
                var asteroidDirection = 'rightup';
            }
            else if (randomHeightPlace > 0) {
                const asteroidDirectionChoser = this.randomNumber(2, 3);
                var asteroidDirection = (astroidDirections[asteroidDirectionChoser]);
            }
        }
        else if (randomWidthPlace > this.canvas.width) {
            if (randomHeightPlace < 0) {
                var asteroidDirection = 'leftdown';
            }
            else if (randomHeightPlace > this.canvas.height) {
                var asteroidDirection = 'leftup';
            }
            else if (randomHeightPlace > 0) {
                const asteroidDirectionChoser = this.randomNumber(0, 1);
                var asteroidDirection = (astroidDirections[asteroidDirectionChoser]);
            }
        }
        else if (randomWidthPlace > 0 && (randomHeightPlace < 0 || randomHeightPlace > this.canvas.height)) {
            if (randomHeightPlace < 0) {
                const asteroidDirectionChoser = this.randomNumber(1, 2);
                var asteroidDirection = (astroidDirections[asteroidDirectionChoser]);
            }
            else if (randomHeightPlace > this.canvas.height) {
                const specificDirections = ['leftup', 'rightup'];
                const asteroidDirectionChoser = this.randomNumber(0, 1);
                var asteroidDirection = (specificDirections[asteroidDirectionChoser]);
            }
        }

        else {
            const asteroidDirectionChoser = this.randomNumber(0, 3);
            var asteroidDirection = (astroidDirections[asteroidDirectionChoser]);
        }
        const Asteroid = `${randomWidthPlace}, ${randomHeightPlace}, 1, "", 0, null, "", null, null, Meteors/${randomAsteroidPicture}, ${asteroidDirection}`;
        this.asteroids.push(Asteroid);
        console.log(this.asteroids);

    }

    //-------- Title screen methods -------------------------------------

    /**
    * Function to initialize the title screen   
    */
    public title_screen() {
        //1. draw your score
        this.text("white", 70, "center", `${this.player} score is ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 - 100);
        //2. draw all highscores
        this.writeHighScores();
    }

    public writeHighScores() {
        this.text("white", 40, "center", "HIGHSCORES", this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = "20px Minecraft";
        const highscoreNameList = this.highscores.slice(0);
        highscoreNameList.sort(function (a, b) {
            return b.points - a.points;
        });
        console.log(highscoreNameList)
        for (let i = 1; i - 1 < highscoreNameList.length; i++) {
            const highscoreList = highscoreNameList[i - 1];
            const obj = <any>Object;
            const namePlayer = obj.values(highscoreList)[0];
            const pointsPlayer = obj.values(highscoreList)[1];
            console.log(namePlayer);
            this.ctx.fillText(`${i}: ${namePlayer} - ${pointsPlayer}`, this.canvas.width / 2, this.canvas.height / 2 + 20 + 35 * i);
        };
    }


    //-------Generic canvas functions ----------------------------------

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    public image(xCoo: number, Ycoo: number, amountOfImages: number, textColor: string = "white", textFontSize: number, textAlignment: CanvasTextAlign = "center", text: string, textxCoo: number, textyCoo: number, imagePath: string) {
        const buttonImg = new Image();
        buttonImg.addEventListener('load', () => {
            for (let i = 0; i < amountOfImages; i++) {
                this.ctx.drawImage(buttonImg, xCoo, Ycoo);
            };

            this.text(textColor, textFontSize, textAlignment, text, textxCoo, textyCoo);
        });
        buttonImg.src = `./assets/images/SpaceShooterRedux/PNG/${imagePath}.png`;
    }

    public text(color: string, fontSize: number, alignment: CanvasTextAlign, text: string, xCoo: number, Ycoo: number) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoo, Ycoo);
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        if (this.leftPressed && this.upPressed) {
            if (this.canvas.width / 2 + this.shipXOffset > 0 && this.canvas.height / 2 + this.shipYOffset > 0) {
                this.shipXOffset -= 3;
                this.shipYOffset -= 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset < 3 && this.canvas.height / 2 + this.shipYOffset > 0) {
                this.shipYOffset -= 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset > 0 && this.canvas.height / 2 + this.shipYOffset < 3) {
                this.shipXOffset -= 3;
            }
        }
        else if (this.leftPressed && this.downPressed) {
            if (this.canvas.width / 2 + this.shipXOffset > 0 && this.canvas.height / 2 + this.shipYOffset < this.canvas.height - 75) {
                this.shipXOffset -= 3;
                this.shipYOffset += 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset < 3 && this.canvas.height / 2 + this.shipYOffset < this.canvas.height - 75) {
                this.shipYOffset += 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset > 0 && this.canvas.height / 2 + this.shipYOffset < this.canvas.height - 72) {
                this.shipXOffset -= 3;
            }
        }
        else if (this.rightPressed && this.upPressed) {
            if (this.canvas.width / 2 + this.shipXOffset < this.canvas.width - 99 && this.canvas.height / 2 + this.shipYOffset > 0) {
                this.shipXOffset += 3;
                this.shipYOffset -= 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset < this.canvas.width - 96 && this.canvas.height / 2 + this.shipYOffset > 0) {
                this.shipYOffset -= 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset < this.canvas.width - 99 && this.canvas.height / 2 + this.shipYOffset < 3) {
                this.shipXOffset += 3;
            }
        }
        else if (this.rightPressed && this.downPressed) {
            if (this.canvas.width / 2 + this.shipXOffset < this.canvas.width - 99 && this.canvas.height / 2 + this.shipYOffset < this.canvas.height - 75) {
                this.shipXOffset += 3;
                this.shipYOffset += 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset < this.canvas.width - 96 && this.canvas.height / 2 + this.shipYOffset < this.canvas.height - 75) {
                this.shipYOffset += 3;
            }
            else if (this.canvas.width / 2 + this.shipXOffset < this.canvas.width - 99 && this.canvas.height / 2 + this.shipYOffset < this.canvas.height - 72) {
                this.shipXOffset += 3;
            }
        }
        else if (this.leftPressed) {
            if (this.canvas.width / 2 + this.shipXOffset > 0) {
                this.shipXOffset -= 3;
            };
        }
        else if (this.upPressed) {
            if (this.canvas.height / 2 + this.shipYOffset > 0) {
                this.shipYOffset -= 3;
            }
        }
        else if (this.rightPressed) {
            if (this.canvas.width / 2 + this.shipXOffset < this.canvas.width - 99) {
                this.shipXOffset += 3;
            };
        }
        else if (this.downPressed) {
            if (this.canvas.height / 2 + this.shipYOffset < this.canvas.height - 75) {
                this.shipYOffset += 3;
            };
        }
        this.image(this.canvas.width / 2 + this.shipXOffset, this.canvas.height / 2 + this.shipYOffset, 1, "", 0, null, "", null, null, "playerShip1_blue");
        console.log(this.asteroids)
        if (this.asteroids.length <= 5) {
            for (let i = 0; i < this.asteroids.length; i++) {
                const asteroidArray = (this.asteroids[i]);
                const functionAsteroid = asteroidArray.split(', ');

                if (Number(functionAsteroid[0]) > 0 && Number(functionAsteroid[0]) < this.canvas.width && Number(functionAsteroid[1]) > 0 && Number(functionAsteroid[1]) < this.canvas.height) {
                    const asteroidDirection = functionAsteroid[10];
                    if (asteroidDirection == "leftup") {
                        var xAsteroidMove = Number(functionAsteroid[0]) - 1;
                        functionAsteroid[0] = xAsteroidMove;
                        var yAsteroidMove = Number(functionAsteroid[1]) - 1;
                        functionAsteroid[1] = yAsteroidMove;
                    }
                    else if (asteroidDirection == "leftdown") {
                        var xAsteroidMove = Number(functionAsteroid[0]) - 1;
                        functionAsteroid[0] = xAsteroidMove;
                        var yAsteroidMove = Number(functionAsteroid[1]) + 1;
                        functionAsteroid[1] = yAsteroidMove;
                    }
                    else if (asteroidDirection == "rightup") {
                        var xAsteroidMove = Number(functionAsteroid[0]) + 1;
                        functionAsteroid[0] = xAsteroidMove;
                        var yAsteroidMove = Number(functionAsteroid[1]) - 1;
                        functionAsteroid[1] = yAsteroidMove;
                    }
                    else if (asteroidDirection == "leftup") {
                        var xAsteroidMove = Number(functionAsteroid[0]) + 1;
                        functionAsteroid[0] = xAsteroidMove;
                        var yAsteroidMove = Number(functionAsteroid[1]) + 1;
                        functionAsteroid[1] = yAsteroidMove;
                    }
                    const amount = functionAsteroid[2];
                    const imagePath = functionAsteroid[9];

                    this.asteroids[i] = `${functionAsteroid[0]}, ${functionAsteroid[1]}, ${functionAsteroid[2]}, ${functionAsteroid[3]}, ${functionAsteroid[4]}, ${functionAsteroid[5]}, ${functionAsteroid[6]}, ${functionAsteroid[7]}, ${functionAsteroid[8]}, ${functionAsteroid[9]}, ${functionAsteroid[10]}`;
                    this.image(xAsteroidMove, yAsteroidMove, amount, '', null, null, '', null, null, imagePath);
                }
                else {
                    this.asteroids.splice(i, 1);
                    if (this.asteroids.length <= 4) {
                        this.drawRandomAsteroids();
                    }
                }
            }

        }
        else {
            this.asteroids.pop();
        }

    }

    private keyDownHandler(event: KeyboardEvent) {
        if (event.keyCode == 65) {
            this.leftPressed = true;
        }
        else if (event.keyCode == 68) {
            this.rightPressed = true;
        }
        else if (event.keyCode == 87) {
            this.upPressed = true;
        }
        else if (event.keyCode == 83) {
            this.downPressed = true;
        }
    }

    private keyUpHandler(event: KeyboardEvent) {
        if (event.keyCode == 65) {
            this.leftPressed = false;
        }
        else if (event.keyCode == 68) {
            this.rightPressed = false;
        }
        else if (event.keyCode == 87) {
            this.upPressed = false;
        }
        else if (event.keyCode == 83) {
            this.downPressed = false;
        }
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};
//add loadlistener for custom font types
window.addEventListener('load', init);
