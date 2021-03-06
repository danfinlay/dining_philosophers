//Four Philosophers Experimenting Widget
//A widget for experimenting with solutions to the Four Philosophers Problem.
//http://en.wikipedia.org/wiki/Dining_philosophers_problem
//Written to help me grasp the issue before reading the popularly accepted solutions.
//MIT License 2013 Dan Finlay


var user_input,
	mainInterval,
	simulating=false,
	tickCounter=0,
	healthLossPerTic=0.1,
	ticksToEat=210,
	tickLength=15;

$('button#simulate').click(function(ev){
	ev.preventDefault()
	//console.log("Simulate clicked.")
	if(!simulating){
		//console.log("Difficulty: "+$('#difficulty').val())
		healthLossPerTic = parseFloat($('#difficulty').val())/1000
		//alert("Beginning simulation!");
		$('#simulate').html('End')
		tickCounter=0
		simulating=true
		console.log($('#user_input').val())
		user_input = $('#user_input').val()
		mainInterval = setInterval(function(){
			tick()
		},tickLength)
	}else{
		//alert("Ending simulation!");
		simulating=false

		$('#simulate').html('Simulate')
		clearInterval(mainInterval)
	}
})


var philosopher = function(){
		this.health=75.0,
		this.enlightenment=100.0,
		this.enlightenmentLossPerTic=0.001,
		this.eating=false,
		this.timeSpentEating=0,
		this.thinking=true,
		this.ticksToThink=3000,
		this.timeSpentThinking=0,
		this.forksInHand={
			right:false,
			left:false
		}
		this.behavior=function(philo){
			//console.log("Attmepting to eval")
			eval(user_input)
		}
		this.fate=function(){
			var philoNum = this.num

			if(this.eating && this.health >= 100){
				this.eating = false;
				this.forksInHand.left=false
				this.forksInHand.right=false
				philosophers[this.rightForkNum]="A Fork"
				philosophers[this.leftForkNum]="A Fork"
			}

			if(this.eating) this.health += 100 / ticksToEat
			if(this.thinking) this.enlightenment += 100/this.ticksToThink

			if(!this.eating) this.health -= healthLossPerTic
			//if(!this.thinking) this.enlightenment -= this.enlightenmentLossPerTic

			if(this.eating){
				this.eating = true
				this.timeSpentEating = ticksToEat
			}
			if(this.eating) this.timeSpentEating -= 1
			if(this.timeSpentEating === 0) this.eating = false
			//if(!this.eating) this.health -= healthLossPerTic
			if(this.health<=0) {
				alert(this.name+" died after "+tickCounter*tickLength/2000+" weeks! You lose!")
				clearInterval(mainInterval)
				simulating=false
				for(var l=0; l<philosophers.length;l++){
					var phil=philosophers[l]
					if(phil!==undefined&&phil.name!==undefined){
						phil.health=75.0
					}
				}
			}
		}

		//These would be the publicly disclosed 'api' functions:
		this.pickUpFork=function(which){
			//console.log(this.name+ " Trying to pick up a fork.")
			if(which==="Left"){
				//console.log("Wanting a left fork"+this.leftForkNum)
				if(philosophers[this.leftForkNum]!==undefined){
					//console.log(this.name+" picking up a left fork, undefining "+this.leftForkNum)
					philosophers[this.leftForkNum]=undefined
					this.forksInHand.left = true
					//philosophers[this.leftForkNum-1].forksOnTable.right = false
					//console.log(this.name+" picked up "+which+" fork.")
					if(this.forksInHand.right) this.eating = true
				}else{
					return "Fork left of "+this.name+" is missing!"
				}
			}else{
				if(philosophers[this.rightForkNum]!==undefined){

					//console.log("picking up a right fork")
					philosophers[this.rightForkNum]=undefined
					this.forksInHand.right = true
					//console.log(this.name+" picking up a right fork, undefining "+this.rightForkNum)
					//philosophers[this.rightForkNum-1].forksOnTable.left = true
					if(this.forksInHand.left) this.eating = true
				}else{
					return "Fork right of "+this.name+" is missing!"
				}
			}
		}
		this.putDownFork=function(which){
			if(this.holdingFor(which)){
				if(which==="Left"){
					//console.log("Wanting a left fork"+this.leftForkNum)
					philosophers[this.leftForkNum]="A Fork"	
					this.forksInHand.left = false
				}else{
					philosophers[this.rightForkNum]="A Fork"	
					this.forksInHand.right = false
				}
			}	
		}
		this.isForkOnTable=function(which){
			//console.log("Checking if holding "+which +" which is "+ this.forksOnTable.left+this.forksOnTable.right)
			if(which==="Left"){
				//console.log("Left activated"+(philosophers[this.leftForkNum]!==undefined))
				return philosophers[this.leftForkNum]!==undefined
			}else{
				return philosophers[this.rightForkNum]!==undefined
			}
		}
		this.holdingFork=function(which){
			if(which==="Left"){
				return this.forksInHand.left
			}else{
				return this.forksInHand.right
			}
		}
		this.isEating=function(){
			return this.eating
		}
		this.lifeRemaining=function(){
			return this.health
		},
		this.leftForkNum=0
		this.rightForkNum=0
}

var philosopherNames = [
	"socrates","laotsu","buddha","jesus","mohammed"
]

var philosophers = []
for(var i = 0; i<10; i++){
	var philosopherName = philosopherNames[i]
	var newPhilosopher = new philosopher()
	newPhilosopher.name=philosopherName

	philoNum = i*2

	newPhilosopher.num=philosophers.length
	newPhilosopher.rightForkNum = philoNum+1
	if(philoNum === 0){
		newPhilosopher.leftForkNum = 9; 
	}else{
		newPhilosopher.leftForkNum = philoNum-1
	}
	philosophers.push(newPhilosopher)
	philosophers.push("A Fork")
}

function tick(){
	tickCounter+=1
	for(var i = 0; i < philosophers.length; i++){
		var philosopher = philosophers[i]
		if(philosopher!==undefined&&philosopher.name!==undefined){
			philosopher.behavior(philosopher)
			philosopher.fate()
		}
	}
	//console.log(philosophers)
	refreshView()
}
function refreshView(){
	for(var i=0; i<philosophers.length; i++){
		if(philosophers[i]==="A Fork"){
			$('#fork'+i).show()
		}
		if(philosophers[i]===undefined){
			$('#fork'+i).hide()
		}
		if(philosophers[i]!==undefined&&philosophers[i].name){
			if(philosophers[i].forksInHand.left){
				$('#'+philosophers[i].name+' .leftArm img').show()
			}else{
				$('#'+philosophers[i].name+' .leftArm img').hide()
			}
			if(philosophers[i].forksInHand.right){
				$('#'+philosophers[i].name+' .rightArm img').show()
			}else{
				$('#'+philosophers[i].name+' .rightArm img').hide()
			}
			$('#'+philosophers[i].name+' .lifebar').css('width', Math.floor(philosophers[i].health*2))
		}
	}
}
