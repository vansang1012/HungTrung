let egg = function(game){
	this.game       = game;
	this.x          = 0;
	this.y          = 80;
	this.img        = null;
	this.type       = 1;
	this.popped     = false;
	this.visible    = true;
	this.addedScore = false;
	let self = this;


	this.init = function(){

		this.type = this.getRandomInt(1, 2); // loại trứng 1 và 2

		if (this.type == 1){
			this.img = this.game.resource.egg1.img;
		}
		else {
			this.img = this.game.resource.egg2.img;
		}

		let positions = [78, 178, 278, 378];
		this.x = positions[this.getRandomInt(0, 3)];
	}

	this.getRandomInt = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.update = function(){
		
		if (this.y <= 380){
			this.y += 2;
		}
		else {
			this.popped = true;
		}

		if (this.popped) {
			this.img = this.game.resource.egg_popped.img;
		}

		this.checkInBowl();
	}

		this.checkInBowl = function(){
		if (
			(this.x > this.game.bowl.x) &&
			(this.x < (this.game.bowl.x + this.game.resource.bowl.img.width)) &&
			(this.y >= 350)
		){
			this.visible = false;

			if (this.addedScore == false){
				this.game.score += this.type;
				this.addedScore = true;
			}
		}
	}

	this.draw = function(){
		if (this.visible){
			this.game.context.drawImage(
				self.img,
				this.x - (this.img.width / 2), // vẽ ở giữa chiều ngang
				this.y
			);
		}
	}
}