class Game {
    constructor(canvasId) {
        this.player = "Player1";
        this.score = 400;
        this.lives = 3;
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        ];
        this.start_screen();
    }
    start_screen() {
        this.text("yellow", 100, "center", "Asteroids", this.canvas.width / 2, 110);
        this.text("white", 40, "center", "Press play to start", this.canvas.width / 2, this.canvas.height - 170);
        this.writeStartButton();
        this.image(this.canvas.width / 2 - 50, this.canvas.height / 2 - 50, "", 0, null, "", null, null, "Meteors/meteorBrown_big1");
    }
    ;
    writeStartButton() {
        this.image(this.canvas.width / 2 - 100, this.canvas.height - 140, "black", 25, "center", "START", this.canvas.width / 2, this.canvas.height - 110, "UI/buttonBlue");
        this.canvas.addEventListener('click', (evt) => this.eventHandeler(evt));
    }
    ;
    eventHandeler(event) {
        console.log(event);
        const buttonX = this.canvas.width / 2 - 100;
        const buttonY = this.canvas.height - 140;
        const buttonW = 222;
        const buttonH = 32;
        if (event.x > buttonX &&
            event.x < buttonX + buttonW &&
            event.y > buttonY &&
            event.y < buttonY + buttonH) {
            console.log('Button was clicked!');
            this.level_screen();
        }
    }
    level_screen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayerLives();
        this.text("white", 20, "right", "Your score: 400", this.canvas.width - 30, 62.5);
        this.drawRandomAsteroids();
        this.image(this.canvas.width / 2, this.canvas.height / 2, "", 0, null, "", null, null, "playerShip1_blue");
    }
    drawPlayerLives() {
        const lifeImg = new Image();
        lifeImg.addEventListener('load', () => {
            this.ctx.drawImage(lifeImg, 30, 50, 33, 25);
            this.ctx.drawImage(lifeImg, 70, 50, 33, 25);
            this.ctx.drawImage(lifeImg, 110, 50, 33, 25);
        });
        lifeImg.src = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
    }
    drawRandomAsteroids() {
        const astroidPictures = ['meteorBrown_big1', 'meteorBrown_big2', 'meteorBrown_big3', 'meteorBrown_big4', 'meteorBrown_med1', 'meteorBrown_med3', 'meteorBrown_small1', 'meteorBrown_small2', 'meteorBrown_tiny1', 'meteorBrown_tiny2'];
        const amountAstroid = this.randomNumber(0, 5);
        console.log(amountAstroid);
        for (let i = 0; i < amountAstroid; i++) {
            const randomWidthPlace = this.randomNumber(this.canvas.width - this.canvas.width, this.canvas.width);
            const randomHeightPlace = this.randomNumber(this.canvas.height - this.canvas.height, this.canvas.height);
            const randomAstroid = this.randomNumber(0, astroidPictures.length - 1);
            const randomAsteroidPicture = (astroidPictures[randomAstroid]);
            this.image(randomWidthPlace, randomHeightPlace, "", 0, null, "", null, null, `Meteors/${randomAsteroidPicture}`);
        }
    }
    title_screen() {
        this.text("white", 70, "center", "Your score is 400", this.canvas.width / 2, this.canvas.height / 2 - 100);
        this.writeHighScores();
    }
    writeHighScores() {
        this.text("white", 40, "center", "HIGHSCORES", this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = "20px Minecraft";
        const highscoreNameList = this.highscores.slice(0);
        highscoreNameList.sort(function (a, b) {
            return b.points - a.points;
        });
        console.log(highscoreNameList);
        for (let i = 1; i - 1 < highscoreNameList.length; i++) {
            const highscoreList = highscoreNameList[i - 1];
            const obj = Object;
            const namePlayer = obj.values(highscoreList)[0];
            const pointsPlayer = obj.values(highscoreList)[1];
            console.log(namePlayer);
            this.ctx.fillText(`${i}: ${namePlayer} - ${pointsPlayer}`, this.canvas.width / 2, this.canvas.height / 2 + 20 + 35 * i);
        }
        ;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    image(xCoo, Ycoo, textColor, textFontSize, textAlignment, text, textxCoo, textyCoo, imagePath) {
        const buttonImg = new Image();
        buttonImg.addEventListener('load', () => {
            this.ctx.drawImage(buttonImg, xCoo, Ycoo);
            this.text(textColor, textFontSize, textAlignment, text, textxCoo, textyCoo);
        });
        buttonImg.src = `./assets/images/SpaceShooterRedux/PNG/${imagePath}.png`;
    }
    text(color, fontSize, alignment, text, xCoo, Ycoo) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoo, Ycoo);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map