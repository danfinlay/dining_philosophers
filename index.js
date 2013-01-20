//Four Philosophers Experimenting Widget
//A widget for experimenting with solutions to the Four Philosophers Problem.
//http://en.wikipedia.org/wiki/Dining_philosophers_problem
//Written to help me grasp the issue before reading the popularly accepted solutions.
//MIT License 2013 Dan Finlay

var public_rules = "It takes two forks to eat from a pile this big!"+
	"Write the philosopher's behavior so that each philosopher can both think and eat."

var user_input = $('#user_input').text()

var philosopher = {
	health:100.0,
	healthLossPerTic:0.001,
	enlightenment:100.0,
	enlightenmentLossPerTic:0.001,
	ticksToEat:3000,
	eating:false,
	timeSpentEating:0,
	thinking:true,
	ticksToThink:3000,
	timeSpentThinking:0,
	forksOnTable:{
		right:true,
		left:false
	}
	forksInHand:{
		right:false,
		left:false
	},
	behavior:function(){
		eval(user_input)
	},
	fate:function(){
		var philoNum = this.num

		if(this.eating && this.health >= 100){
			this.eating = false;
			this.forksInHand.left=false
			this.forksInHand.right=false
			this.forksOnTable.right=true
			this.forksOnTable.left=true
			philosophers[this.rightForkNum]="A Fork"
			philosophers[this.leftForkNum]="A Fork"
		}

		if(this.eating) this.health += 100 / this.ticksToEat
		if(this.thinking) this.enlightenment += 100/this.ticksToThink

		if(!this.eating) this.health -= this.healthLossPerTic
		if(!this.thinking) this.enlightenment -= this.enlightenmentLossPerTic

		if(this.eating){
			this.eating = true
			this.timeSpentEating = this.ticksToEat
		}
		this.eating ? this.timeSpentEating -= 1
		this.timeSpentEating === 0 ? this.eating = false
		!this.eating ? this.health -= this.healthLossPerTic
	},

	//These would be the publicly disclosed 'api' functions:
	pickUpFork:function(which){
		if(which==="Left"){
			if(philosophers[this.leftForkNum]==="A Fork"){
				philosophers[this.leftForkNum]="Nothing."
				this.forksInHand.left = true
				philosophers[this.leftForkNum-1].forksOnTable.left = true
				if(this.forksInHand.right) this.isEating = true
			}else{
				return "Fork left of "+this.name+" is missing!"
			}
		}else{
			if(philosophers[this.rightForkNum]==="A Fork"){
				philosophers[this.rightForkNum]="Nothing."
				this.forksInHand.right = true
				philosophers[this.rightForkNum-1].forksOnTable.right = true
				if(this.forksInHand.left) this.isEating = true
			}else{
				return "Fork right of "+this.name+" is missing!"
			}
		}
	},
	holdingFork:function(which){
		if(which==="Left"){
			return this.forksOnTable.left
		}else{
			return this.forksOnTable.right
		}
	},
	isForkOnTable:function(which){
		if(which==="Left"){
			return this.forksInHand.left
		}else{
			return this.forksInHand.right
		}
	},
	isEating:function(){
		return this.eating
	},
	isThinking:function(){
		return this.thinking
	},
	lifeRemaining:function(){
		return this.health
	},
	enlightenmentRemaining:function(){
		return this.enlightenment
	}
}

var philosopherNames = [
	"Socrates","Laotsu","Buddha","Jesus","Mohammed"
]

var philosophers = []
philosopherNames.forEach(function(philosopherName){
	philosopher.name=philosopherName
	philosopher.num=philosophers.length
	philoNum = philosopher.num
	if(philoNum = 0){
		philosopher.leftForkNum = philosophers.length-1; 
		philosopher.rightForkNum = philoNum+1
	} 
	if(philoNum = philosophers.length-1){
		philosopher.leftForkNum = philoNum-1
		philosopher.rightForkNum = 0
	}
	if (philoNum > 0 && philoNum < philosophers.length-1){
		philosopher.leftForkNum = philoNum-1
		philosopher.rightForkNum = philoNum+1
	}
	philosophers.push(philosopher)
	philosophers.push("A Fork")

})

function tick(){
	philosophers.forEach(function(philosopher){
		philosopher.behavior()
		philosopher.fate()
	})
	refreshView()
}
function refreshView(){

}
