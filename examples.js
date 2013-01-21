var examples = {
	default:{code:'',difficulty:100},
	patient:{code:'',difficulty:100}
}

examples.default.code = $('#user_input').val()
examples.default.difficulty = 100

examples.patient.code = "if(philo.lifeRemaining()<=75){"+
"  if(philo.isForkOnTable('Left')&&philo.isForkOnTable('Right')){"+
"    philo.pickUpFork('Left');"+
"    philo.pickUpFork('Right')"+
"  }"+
"}"
examples.patient.difficulty = 350

$('select#strategySelector').change(function(ev){
	var difficulty = examples[document.getElementById("strategySelector").value]['difficulty']
	var code = examples[document.getElementById("strategySelector").value]['code']
	$('#difficulty').attr('value', difficulty)
	$('#user_input').val(code)
})