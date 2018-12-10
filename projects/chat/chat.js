let robot,speech = {};
$(function(){
	robot = new ChatBot();
	speech = new Speech();

	for(let i=0; i<custome_skills.length; i++){
		robot.registerSkill(custome_skills[i]);
	}

	$(robot).on("responded",function(e,data){
		var html =
		`<div class='chat'>
			<div class='bubble received'>
				<div class='message'>${data}</div>
				<span class='time'>${(new Date()).toLocaleTimeString()}</span>
			</div>
		</div>`;

		$("#chat_threads").append(html);
		$('#chat_threads').scrollTop($('#chat_threads')[0].scrollHeight);
	});

	$(speech).on("responded",function(e,data){
		var html =
		`<div class='chat'>
			<div class='bubble sent'>
				<div class='message'>${data}</div>
				<span class='time'>${(new Date()).toLocaleTimeString()}</span>
			</div>
		</div>`;

		$("#chat_threads").append(html);
		$('#chat_threads').scrollTop($('#chat_threads')[0].scrollHeight);
		$("#msg").val('');
	});

	$(speech).on("intrim",function(e,data){
		$("#msg").val(data);
	});

	robot.bind(speech);
	speech.bind(robot);

	$("#send").on("click",function(){
		var msg = $("#msg").val();
		$(speech).trigger($.Event("responded"),msg);
	});
});
