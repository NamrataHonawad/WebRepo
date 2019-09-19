var dat;
function fetchjson(q) {
	
	fetch('question.json')
	  .then(response => {
	    return response.json()
	  })
	  .then(data => {
	    // Work with JSON data here
		 dat = data;
	    console.log(dat[q]);
	    document.getElementById('demo2').innerHTML = data[q].question
	    document.getElementById('option1').innerHTML = (data[q].options[0])
	    document.getElementById('option2').innerHTML = (data[q].options[1])
	    document.getElementById('option3').innerHTML = (data[q].options[2])
	    document.getElementById('option4').innerHTML = (data[q].options[3])
	  })
	  .catch(err => {
	    // Do something for an error here
	  })
}

function getCookie(ques) {
	  var question = ques + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(question) == 0) {
	      return c.substring(question.length, c.length);
	    }
	  }
	  return "";
}

function setCookie(ques,selected_opt,exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  var expires = "expires=" + d.toGMTString();
	  document.cookie = ques + "=" + selected_opt + ";" + expires;
}

function checkCookie(ques, selected_opt) {
	setCookie(ques, selected_opt, 30);
}

var Save = function(q) {
	var opt = document.getElementsByName('option'); 
    var selected_opt;
    for(i = 0; i < opt.length; i++) { 
    	if(opt[i].checked) {
    		selected_opt = opt[i].value;
    	}
    }
    
    checkCookie(q, selected_opt);
}

var Result = function(q) {
	Save(q);
	var i=1, count = 0;
	for(x in dat) {
		var user=getCookie("q"+i);
		if(user == dat[x].answer) {
			count++;
		}
		i++;
	}
	setCookie("result", count, 30);
}

function displayResult() {
	var result = getCookie("result");
	document.getElementById("result").innerHTML = "The result is  " + result;
}


