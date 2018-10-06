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

function moveIt(beMoved) {
  let speed = beMoved.getAttribute('data-scroll-speed');
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  beMoved.style.setProperty('transform', 'translateY(' + -(scrollTop / speed) + 'px)');
}

(function() {
  AOS.init();

  window.addEventListener('scroll', function(){
    let items = document.querySelectorAll('[data-scroll-speed]');
    for(let i = 0; i < items.length; i++) {
      moveIt(items[i]);
      let scrollTop = items[i].scrollTop;
    }
  });

})();

