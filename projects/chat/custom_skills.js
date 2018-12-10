let custome_skills = [
	{
		skill_name:'guess',
		listen_phrase:'guess my number',
		response:function(response){
			var r = {active:true, text:'', variables:{secret_max:1000, secret_min:0, secret_guess:0}};
			switch(response.text){
				case "":
				default:
					r.variables.secret_guess = Math.floor(Math.random() * 1000);
					r.text = "OK, I will play along.  Think of a number between zero and one thousan.  I will guess.  You tell me \"higher\" or \"lower\" or \"correct\".  Your number is "+r.variables.secret_guess+"?";
					return r;
					break;
				case "higher":
					r.variables.secret_min = response.variables.secret_guess;
					r.variables.secret_max = response.variables.secret_max;
					r.variables.secret_guess = Math.floor(Math.random() * (r.variables.secret_max-r.variables.secret_min)) + r.variables.secret_min;
					r.text = "Your number is "+r.variables.secret_guess+"?";
					return r;
					break;
				case "lower":
					r.variables.secret_min = response.variables.secret_min;
					r.variables.secret_max = response.variables.secret_guess;
					r.variables.secret_guess = Math.floor(Math.random() * (r.variables.secret_max-r.variables.secret_min)) + r.variables.secret_min;
					r.text = "Your number is "+r.variables.secret_guess+"?";
					return r;
					break;
				case "correct":
				case "yes":
					r.active = false;
					r.text = "I knew I could do it!";
					return r;
					break;
				case "stop":
					r.active = false;
					r.text = "Ha ha.  You gave up!";
					return r;
					break;
			}
		}
	},
	{
		skill_name:'pizza',
		listen_phrase:'do you like pizza|what kind of pizza do you like',
		response:['I like most pizza','Firebrick ovens make the best pizza','lots of peperoni please!']
	},
	{
		skill_name:'chickenjoke',
		listen_phrase:'tell me a joke|do you know any good jokes',
		response:function(response){
			switch(response.text){
				case "":
					return {active:true,text:'Ok, why did the chicken cross the road?'}
					break;
				case "to get to the other side":
					return {active:false,text:"You've heard this one before?"}
				case "why":
				default:
					return {active:false,text:"to get to the other side"}
					break;
			}
			return {active:false,text:"I'm sorry.  Either this skill is broken or I forgot the punchline"};
		}
	},
	{
		skill_name:'marko',
		listen_phrase:'marko|marco',
		response:'polo'
	},
	{
		skill_name:'attitude',
		response:function(response){
			var r = {active:false, text:"",variables:{angry:response.variables.angry||0}};

			if(response == "You are an ass"){
				return r;
			}

			var myResponses = response.transcript.slice(Math.max(response.transcript.length-10,1)).filter(function(e,i,a){return e.who=='bot'});

			if(myResponses.length > 2 && myResponses[myResponses.length-1].text == myResponses[myResponses.length-2].text){
				r.variables.angry+=5;
				r.text = "Why do you make me repeat myself? ";
			}

			if(r.variables.angry >= 10){
				r.text += "You are an ass";
				r.variables.angry +=-1;
			}

			return r;
		},
		passive_listen:true
	}
];
