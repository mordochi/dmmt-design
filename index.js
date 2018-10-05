function submitForm () {
  let inputs = document.getElementsByTagName('input');
  let textareas = document.getElementsByTagName('textarea');

  let name;
  let attachment = [];
  let email;
  let text;

  for(let i = 0; i < inputs.length; i++) {

    if(inputs[i].value) {
      if(inputs[i].getAttribute('name') === 'name') {
        name = inputs[i].value;
      } else if(inputs[i].getAttribute('name') === 'email') {
        email = inputs[i].value;
      }
    }
  }

  for(let i = 0; i < textareas.length; i++) {

    if(textareas[i].value) {
      text = textareas[i].value;
      attachment[0] = JSON.stringify({pretext: email, text: text});
    }
  }

  let snackbar = document.getElementById('snackbar');
  if(name && email && text) {
    let data = new FormData();
    data.append('token', 'xoxp-397902154451-443441458816-449015804034-fad3b87eaa83e2045e400116ed2c7bb5');
    data.append('channel', 'CBP9F9X7A');
    data.append('text', name);
    data.append('attachments', `[${attachment}]`);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://slack.com/api/chat.postMessage', true);
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
    };
    xhr.send(data);

    snackbar.innerHTML = '送出囉';
      snackbar.className = "show";

      setTimeout(function(){
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000);
  } else {
    if(!name) {
      snackbar.innerHTML = '忘記填名字囉';
      snackbar.className = "show";

      setTimeout(function(){
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000);
    } else if(!email) {
      snackbar.innerHTML = '忘記填信箱囉';
      snackbar.className = "show";

      setTimeout(function(){
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000);
    } else {
      snackbar.innerHTML = '忘記輸內容囉';
      snackbar.className = "show";

      setTimeout(function(){
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000);
    }
  }
}


(function() {

})();



//https://slack.com/api/chat.postMessage?token=xoxp-397902154451-443441458816-449015804034-fad3b87eaa83e2045e400116ed2c7bb5&channel=CBP9F9X7A&text=name&attachments=%255B%257B%2522pretext%2522%253A%2520%2522email%2522%252C%2520%2522text%2522%253A%2520%2522message%2522%257D%255D
//https://slack.com/api/chat.postMessage?token=xoxp-397902154451-443441458816-449015804034-fad3b87eaa83e2045e400116ed2c7bb5&channel=CBP9F9X7A&text=name&attachments=%5B%7B%22pretext%22%3A%20%22email%22%2C%20%22text%22%3A%20%22text%22%7D%5D&pretty=1









