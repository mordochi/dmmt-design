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
    let data = {};
    data.text = "來自官網的新訊息";
    data.attachments = [{
      "author_name": name,
      "color": "#ffe605",
      "text": email,
      "fields": [{
        "title": text,
        "short": false
      }]
    }];

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hooks.slack.com/services/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', true);
    xhr.onload = function () {
      // do something to response
      console.log(this.responseText);
    };
    xhr.send(JSON.stringify(data));

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

function moveIt(scrollTop) {
  let moveItems = document.querySelectorAll('[data-scroll-speed]');

  for(let i = 0; i < moveItems.length; i++) {
    let speed = moveItems[i].getAttribute('data-scroll-speed');

    moveItems[i].style.setProperty('transform', 'translateY(' + -(scrollTop / speed) + 'px)');
  }
}

function fadeIt(scrollTop, farestPosition) {
  let fadeItems = document.getElementsByClassName('fade');

  for(let i = 0; i < fadeItems.length; i++) {
    let bodyRect = document.body.getBoundingClientRect().top;
    let elRect = fadeItems[i].getBoundingClientRect().top;
    let itemPosition = elRect - bodyRect;

    if(!farestPosition[i] || itemPosition > farestPosition[i]) {
      farestPosition[i] = itemPosition;
    }

    let elHight = fadeItems[i].clientHeight;

    //AOS will affect the result
    if(fadeItems[i].getAttribute('data-aos')) {
      fadeItems[i].style.setProperty('opacity', 1 - ((scrollTop - farestPosition[i] + 150) / elHight));

    } else {
      fadeItems[i].style.setProperty('opacity', 1 - ((scrollTop - farestPosition[i]) / elHight));

      if(scrollTop - farestPosition[i] > 0) {
        fadeItems[i].style.setProperty('transform', 'translateY(' + -((scrollTop - farestPosition[i]) / elHight) * 50 + 'px)');
      } else {
        fadeItems[i].style.setProperty('transform', 'translateY(0px)');
      }
    }
  }


}

function showDot(scrollTop) {
  let dots1 = document.querySelectorAll('#dot-pack-1 div');
  let dots2 = document.querySelectorAll('#dot-pack-2 div');
  let dots3 = document.querySelectorAll('#dot-pack-3 div');

  for(let i = 0; i < dots1.length; i++) {
    if(scrollTop > 220 + (15 * i)) {
      dots1[i].style.setProperty('opacity', '1');
    } else {
      dots1[i].style.setProperty('opacity', '0');
    }
  }

  for(let i = 0; i < dots2.length; i++) {
    if(scrollTop > 500 + (15 * i)) {
      dots2[i].style.setProperty('opacity', '1');
    } else {
      dots2[i].style.setProperty('opacity', '0');
    }
  }

  for(let i = 0; i < dots3.length; i++) {
    if(scrollTop > 735 + (15 * i)) {
      dots3[i].style.setProperty('opacity', '1');
    } else {
      dots3[i].style.setProperty('opacity', '0');
    }
  }

}

(function() {
  AOS.init();

  let farestPosition = [];

  window.addEventListener('scroll', function(){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    moveIt(scrollTop);

    fadeIt(scrollTop, farestPosition);


     showDot(scrollTop);
  });

})();

