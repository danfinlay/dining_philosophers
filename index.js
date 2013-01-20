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
	tickLength=15;

$('button#simulate').click(function(ev){
	ev.preventDefault()
	console.log("Simulate clicked.")
	if(!simulating){
		//alert("Beginning simulation!");
		$('#simulate').html('End')
		tickCounter=0
		simulating=true
		console.log(unescape($('#user_input').text()))
		user_input = unescape($('#user_input').text())
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
		this.ticksToEat=3000,
		this.eating=false,
		this.timeSpentEating=0,
		this.thinking=true,
		this.ticksToThink=3000,
		this.timeSpentThinking=0,
		this.forksOnTable={
			right:true,
			left:true
		}
		this.forksInHand={
			right:false,
			left:false
		}
		this.behavior=function(philo){
			console.log("Attmepting to eval")
			eval(user_input)
		}
		this.fate=function(){
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

			if(!this.eating) this.health -= healthLossPerTic
			//if(!this.thinking) this.enlightenment -= this.enlightenmentLossPerTic

			if(this.eating){
				this.eating = true
				this.timeSpentEating = this.ticksToEat
			}
			if(this.eating) this.timeSpentEating -= 1
			if(this.timeSpentEating === 0) this.eating = false
			if(!this.eating) this.health -= healthLossPerTic
			if(this.health<=0) {
				alert(this.name+" died after "+tickCounter*tickLength/1000+" seconds! You lose!")
				clearInterval(mainInterval)
			}
		}

		//These would be the publicly disclosed 'api' functions:
		this.pickUpFork=function(which){
			if(which==="Left"){
				if(philosophers[this.leftForkNum]==="A Fork"){
					philosophers[this.leftForkNum]="Nothing."
					this.forksInHand.left = true
					philosophers[this.leftForkNum-1].forksOnTable.left = true
					console.log(this.name+" picked up "+which+" fork.")
					if(this.forksInHand.right) this.isEating = true
				}else{
					return "Fork left of "+this.name+" is missing!"
				}
			}else{
				if(philosophers[this.rightForkNum]==="A Fork"){
					philosophers[this.rightForkNum]="Nothing."
					this.forksInHand.right = true
					console.log(this.name+" picked up "+which+" fork.")
					philosophers[this.rightForkNum-1].forksOnTable.right = true
					if(this.forksInHand.left) this.isEating = true
				}else{
					return "Fork right of "+this.name+" is missing!"
				}
			}
		}
		this.holdingFork=function(which){
			if(which==="Left"){
				return this.forksOnTable.left
			}else{
				return this.forksOnTable.right
			}
		}
		this.isForkOnTable=function(which){
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
		}
}

var philosopherNames = [
	"socrates","laotsu","buddha","jesus","mohammed"
]

var philosophers = []
for(var i = 0; i<philosopherNames.length; i++){
	var philosopherName = philosopherNames[i]
	var newPhilosopher = new philosopher()
	newPhilosopher.name=philosopherName
	newPhilosopher.num=philosophers.length
	philoNum = philosopher.num
	if(philoNum === 0){
		newPhilosopher.leftForkNum = philosophers.length-1; 
		newPhilosopher.rightForkNum = philoNum+1
	} 
	if(philoNum === philosophers.length-1){
		newPhilosopher.leftForkNum = philoNum-1
		newPhilosopher.rightForkNum = philosophers.length
	}
	if (philoNum > 0 && philoNum < philosophers.length-1){
		newPhilosopher.leftForkNum = philoNum-1
		newPhilosopher.rightForkNum = philoNum+1
	}
	philosophers.push(newPhilosopher)
	philosophers.push("A Fork")
}

function tick(){
	tickCounter+=1
	philosophers.forEach(function(philosopher){
		if(philosopher.name){
			philosopher.behavior(philosopher)
			philosopher.fate()
		}
	})
	console.log(philosophers)
	refreshView()
}
function refreshView(){
	for(var i=0; i<philosophers.length; i++){
		if(philosophers[i]==="A Fork"){
			$('#fork'+i).show()
		}
		if(philosophers[i]==="Nothing."){
			$('#fork'+i).hide()
		}
		if(philosophers[i].name){
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
