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
    data.text = text;
    data.attachments = [{
      "author_name": name,
      "color": "#ffe605",
      "text": email,
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

function loadHTML(url, id) {
  req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = () => {
    document.getElementById(id).innerHTML = req.responseText;
    let images = document.getElementsByTagName('img');
    for(let i = 0; i < images.length; i++) {
      images[i].onload = () => {
        AOS.refreshHard();
      }
    }

    if(url === './home.html') {
      getMediumLatestPost();
    }
  };
}

function getMediumLatestPost() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    if (xhr.readyState==4 && xhr.status==200) {
      var data = JSON.parse(xhr.responseText);

      if(data.status == 'ok'){
        document.getElementById('medium-thumbnail').src = data.items[0].thumbnail;
        document.getElementById('medium-title').innerHTML = data.items[0].title;
        document.getElementById('medium-thumbnail-link').href = data.items[0].link;
        document.getElementById('medium-title-link').href = data.items[0].link;
        document.getElementById('medium-link').href = data.items[0].link;
      }
    }
  };
  xhr.open(
    'GET',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%25E7%2584%25A1%25E6%2583%25B3%25E8%25A8%25AD%25E8%25A8%2588',
    true
  );
  xhr.send();
}


(function() {
  AOS.init();

  const router = new Navigo();
  router.on({
    '/webproject': function () {
      loadHTML('./web.html', 'view');
    },
    '/appproject': function () {
      loadHTML('./app.html', 'view');
    },
    '*': function () {
      loadHTML('./home.html', 'view');
    }
  })
  .resolve();

  // set the 404 route
  router.notFound((query) => { document.getElementById('view').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>'; });




  let farestPosition = [];

  window.addEventListener('scroll', function(){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    moveIt(scrollTop);
    fadeIt(scrollTop, farestPosition);
    showDot(scrollTop);
  });

})();

