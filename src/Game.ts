class Game {
    //global attr for canvas
    //readonly attributes must be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; // find the right type
    private readonly ctx: CanvasRenderingContext2D; // find the right type


    //some global player attributes
    private readonly player: string = "Player1";
    private readonly score: number = 400;
    private readonly lives: number = 3;
    private readonly highscores: Array<any>; //TODO: do not use 'any': write an interface!

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
        this.image(this.canvas.width / 2 - 50, this.canvas.height / 2 - 50, "", 0, null,"", null, null,  "Meteors/meteorBrown_big1");

    };

    public writeStartButton() {
        this.image(this.canvas.width / 2 - 100, this.canvas.height - 140, "black", 25, "center", "START", this.canvas.width / 2, this.canvas.height - 110, "UI/buttonBlue");
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
            this.level_screen();
        }
    }

    //-------- level screen methods -------------------------------------
    /**
     * Function to initialize the level screen
     */
    public level_screen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //1. load life images
        this.drawPlayerLives();
        //2. draw current score
        this.text("white", 20, "right", "Your score: 400", this.canvas.width - 30, 62.5);
        //3. draw random asteroids
        this.drawRandomAsteroids();
        //4. draw player spaceship'
        this.image(this.canvas.width/2, this.canvas.height/2, "", 0, null, "", null, null, "playerShip1_blue");
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
        const amountAstroid = this.randomNumber(0, 5);
        console.log(amountAstroid);
        for (let i = 0; i < amountAstroid; i++) {
            const randomWidthPlace = this.randomNumber(this.canvas.width - this.canvas.width, this.canvas.width);
            const randomHeightPlace = this.randomNumber(this.canvas.height - this.canvas.height, this.canvas.height);
            const randomAstroid = this.randomNumber(0, astroidPictures.length - 1);
            const randomAsteroidPicture = (astroidPictures[randomAstroid]);
            this.image(randomWidthPlace,randomHeightPlace,"", 0, null, "", null, null, `Meteors/${randomAsteroidPicture}`);
        }
    }

    //-------- Title screen methods -------------------------------------

    /**
    * Function to initialize the title screen   
    */
    public title_screen() {
        //1. draw your score
        this.text("white", 70, "center", "Your score is 400", this.canvas.width / 2, this.canvas.height / 2 - 100);
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

    public image(xCoo: number, Ycoo: number, textColor: string, textFontSize: number, textAlignment: CanvasTextAlign, text: string, textxCoo: number, textyCoo: number, imagePath: string) {
        const buttonImg = new Image();
        buttonImg.addEventListener('load', () => {
            this.ctx.drawImage(buttonImg, xCoo, Ycoo);

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
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};
//add loadlistener for custom font types
window.addEventListener('load', init);
