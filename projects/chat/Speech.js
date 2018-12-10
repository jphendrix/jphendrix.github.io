class Speech {
	constructor(){
		this.recognition = new window.webkitSpeechRecognition();
		this.recognition.lang = 'en-US';
		this.recognition.interimResults = true;
		this.recognition.maxAlternatives = 1;
		this.recognition.continous = false;
		this.recognizing = false;

		var _this = this;

		this.recognition.onaudioend = function () {
			_this.recognizing = false;
			console.log("onaudioend","Not listening.");
		}

		this.recognition.onstart = function () {
			_this.recognizing = true;
			console.log("onstart","listening.");
		}

		this.recognition.end = function () {
			_this.recognizing = false;
			console.log("end","Not listening.");
		}

		this.recognition.onerror = function (err) {
			_this.recognizing = false;
			console.log("onerror","Not Listening",err);
		}

		this.recognition.onresult = function (event) {
			var transcript = event.results[0][0];
			transcript.isFinal = event.results[0].isFinal;

			console.log(event);
			console.log("transcript: " + transcript.transcript, "| confidence: " + transcript.confidence + "| final: " + transcript.isFinal);

			$(_this).trigger("intrim",transcript.transcript);

			if(transcript.isFinal){
				$(_this).trigger("responded",transcript.transcript);
			}

		}

		this.listen(true);
	}

	bind(chatbot){
		$(chatbot).on("responded",function(e,data){
			console.log("Robot says:",data);
			window.speechSynthesis.speak((new window.SpeechSynthesisUtterance(data)));
		});
	}

	listen(on){
		if(on){
			var _this = this;
			this.interval=window.setInterval(function(){
				if(!_this.recognizing){
					try{
						if(!_this.recognizing){
							console.log("trying to start");
							_this.recognition.start();
						}
					}catch{}
				}
			},500);
		}else{
			window.clearInterval(this.interval);
			this.recognition.stop();
		}
	}
}
