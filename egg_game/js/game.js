let game = function(){
	this.canvas         = null;
	this.context        = null;
	this.resource       = null;
	this.chickens       = [];
	this.eggs           = [];
	this.bar            = null;
	this.bowl           = null;
	this.resourceLoaded = false;
	this.score          = 0;

	let self = this;

	this.init = function(){
		this.canvas        = document.createElement('canvas');
		this.canvas.width  = 450; // chiều rộng game
		this.canvas.height = 400; // chiều cao game
		this.context       = this.canvas.getContext('2d');

		document.body.appendChild(this.canvas);
		this.resource = new resource(this);
		this.bar      = new bar(this);
		this.resource.load();
		this.chickens = [
			new chicken(this, 50, 25),
			new chicken(this, 150, 25),
			new chicken(this, 250, 25),
			new chicken(this, 350, 25),
		];

		this.bowl = new bowl(this);
		this.bowl.init();

		setInterval(self.createNewEgg, 1000);

	}

	this.start = function(){
		this.loop();
	}

	this.loop = function(){
		self.update();
		self.draw();
		setTimeout(self.loop, 20);
	}

	this.update = function(){
		this.updateAllEggs();
	}

	this.updateAllEggs = function(){
		for (var i = 0; i < this.eggs.length; i++){
			this.eggs[i].update();
		}
	}

	this.draw = function(){
		self.context.fillStyle = "#3e738e";
		self.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		if (self.resourceLoaded == false){
			self.drawLoading();
		}
		else {
			self.drawTheWorld();
		}
	}
	this.createNewEgg = function(){
		if (self.resourceLoaded){
			let newEgg = new egg(self);
			newEgg.init();
			self.eggs.push(newEgg);
		}
	}

	this.drawTheWorld = function(){
		self.drawScore();
		self.bar.draw();
		self.bowl.draw();
		self.drawAllEggs();
		self.drawAllChickens();
	}

	this.drawAllEggs = function(){
		for (let i = 0; i < this.eggs.length; i++){
			this.eggs[i].draw();
		}
	}
	this.drawAllChickens = function(){
		for (let i = 0; i < this.chickens.length; i++){
			this.chickens[i].draw();
		}
	}

	this.drawLoading = function(){
		self.context.fillStyle = '#ffffff';
		self.context.font = '30px Arial';
		self.context.fillText('Loading...', 100, 100);
	}

	this.drawScore = function(){
		self.context.fillStyle = '#ffffff';
		self.context.font = '30px Arial';
		self.context.fillText('Score: ' + this.score, 150, 200);
	}

}