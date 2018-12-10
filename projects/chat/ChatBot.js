Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

class ChatBot{
	constructor(){
		var _this = this;
		this.transcript = [];
		this.skills = {};
		this.last_skill = {};
		this.variables = {};

		for(let i=0; i<default_skills.length; i++){
			this.registerSkill(default_skills[i]);
		}
	}

	bind(speech){
		var _this = this;
		$(speech).on("responded",function(e,data){
			_this.decode(data);
		});
	}

	decode(phrase, wait){
		if(wait === false){
			this.transcript.push({ts:(new Date()*1), who:'guest', text:phrase});

			if(this.last_skill.active){
				this.respond(this.last_skill.hook({text:phrase,transcript:this.transcript,variables:this.variables}));
				return;
			}

			for(let skillid in this.skills){
				if(this.skills[skillid].passive_listen){
					this.respond(this.skills[skillid].response({text:phrase,transcript:this.transcript,variables:this.variables}));
				}
			}

			for (let skillid in this.skills) {
				let re = new RegExp(this.skills[skillid].listen_phrase, "gi");
				let res = phrase.match(re);

				if (res != null && res.length > 0) {
					this.transcript.push({ts:(new Date()*1), who:'guest', text:phrase});
					this.last_skill = this.skills[skillid];
					this.respond(this.last_skill['response']);
					return
				}
			}

			this.transcript.push({ts:(new Date()*1), who:'guest', text:"gibberish"});
			this.respond("gibberish")
		}else{
			var _this = this;
			//Slow down the response just a little.
			window.setTimeout(function(){
				_this.decode(phrase,false)
			},500);
		}
		return
	}

	respond(response){
		switch (typeof response) {
			case "string":
				if(response != ""){
					this.transcript.push({ts:(new Date()*1), who:'bot', text:response});
					$(this).trigger("responded",response);
					return response;
				}
				return;
				break;
			case "function":
				this.last_skill.hook = response;
				return this.respond(response({text:"",transcript:this.transcript,variables:this.variables}));
				break;
			default:
				if(response.hasOwnProperty("active")){
					this.last_skill.active = response.active;
					for(let key in response.variables){
						this.variables[key] = response.variables[key];
					}
					return this.respond(response.text);
				}

				if(response.length){
					//Assume array
					return this.respond(response.randomElement());
				}
				break;
		}

		this.transcript.push({ts:(new Date()*1), who:'guest', text:"gibberish"});
		return "gibberish";
	}

	registerSkill(skill){
		this.skills[skill.skill_name] = skill;
	}
}

let default_skills = [
	{
		skill_name:'greeting',
		listen_phrase:'hello|good morning|good afternoon',
		response:[
			'Hello',
			function(response){
				if(response.text == ""){

					return {active:true, text:'Hello, how are you'};
				}

				if(response.text == "good"){
					return {active:false, text:"That was a rhetorical question"};
				}

				return {active:false, text:"What ever... What do you want."};
			},
			'How is it hanging'
		]
	},

	{
		skill_name:'close',
		listen_phrase: 'good night|good day',
		response:['Talk later','bye']
	},

	{
		skill_name:'speakup',
		listen_phrase:'speak up',
		response:function(response){
			var volume = (response.variables.volume||10)+10;
			return {active:false, text:'Setting volume to '+volume,variables:{volume:volume}};
		}
	},

	{
		skill_name:'repeat',
		listen_phrase:'what',
		response:function(response){
			switch(response.text){
				case "yes":
					return {active:false,text:['too bad','Well I can\'t scream now can I?  If you have the speak up skill registerd, just say \"speak up\"']};
					break;
				case "no":
					return {active:false,text:"good, b/c this is my only setting"};
				default:
					var myResponses = response.transcript.filter(function(e,i,a){return e.who=='bot'});
					return {active:true,text:"I said " + myResponses[myResponses.length-1].text + " Do I need to speak louder for you?"};
			}
		}
	}

]
