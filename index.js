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

function getMediumLatestPost() {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  let parser = new RSSParser();
  parser.parseURL(CORS_PROXY + 'https://medium.com/feed/%E7%84%A1%E6%83%B3%E8%A8%AD%E8%A8%88', function(err, data) {
    let thumbnail = data.items[0]['content:encoded'].split("<figcaption>", 1)[0].split("src=")[1].split("/>")[0].split(`"`)[1];
    //取出 thumbnail 網址

    document.getElementById('medium-thumbnail').src = thumbnail;
    document.getElementById('medium-title').innerHTML = data.items[0].title;
    document.getElementById('medium-thumbnail-link').href = data.items[0].link;
    document.getElementById('medium-title-link').href = data.items[0].link;
    document.getElementById('medium-link').href = data.items[0].link;
  });
}

function setContent(json, prefix) {
  document.getElementById('no').innerHTML = json.No;
  document.getElementById('img').src = json.img;
  document.getElementById('name').innerHTML = json.name;
  document.getElementById('intro').innerHTML = json.intro;
  document.getElementById('medium-thumbnail').src = json.medium.img;
  document.getElementById('medium-title').innerHTML = json.medium.title;
  document.getElementById('medium-link').href = json.medium.link;

  let webLink = document.getElementsByClassName(prefix + 'link');
  for(let i = 0; i < webLink.length; i++) {
    console.log(webLink[i])
    webLink[i].href = json.link;
  }

  let webContent = document.getElementById(prefix + 'content');
  let contentLast = document.getElementById(prefix + 'medium');
  for(let i = 0; i < json.content.length; i++) {
    let contentDiv = document.createElement("DIV");
    contentDiv.setAttribute("class", "fade");
    contentDiv.setAttribute("data-aos", "fade-up");
    contentDiv.setAttribute("data-aos-once", "true");
    contentDiv.setAttribute("data-aos-duration", "1000");
    contentDiv.setAttribute("data-aos-anchor-placement", "top-bottom");

    let h4 = document.createElement("H4");
    let contentH4 = document.createTextNode(json.content[i].paragraphTitle);
    h4.appendChild(contentH4);

    let p = document.createElement("P");
    let contentP = document.createTextNode(json.content[i].paragraphContent);
    p.appendChild(contentP);

    contentDiv.appendChild(h4);
    contentDiv.appendChild(p);

    webContent.insertBefore(contentDiv, contentLast);

    AOS.refreshHard();
  }
}

function loadHTML(url, id) {
  if(url !== './home.html') {
    let jsonUrl;
    let prefix;
    if(url === './web.html') {
      prefix = 'web-';
      jsonUrl = './content/web/example.json';
    } else {
      prefix = 'app-';
      jsonUrl = './content/app/example.json';
    }

    let jsonReq = new XMLHttpRequest();
    jsonReq.open('GET', jsonUrl);
    jsonReq.responseType = 'json';
    jsonReq.send();
    jsonReq.onload = () => {
      let json = jsonReq.response;

      let req = new XMLHttpRequest();
      req.open('GET', url);
      req.responseType = 'text';
      req.send();
      req.onload = () => {
        document.getElementById(id).innerHTML = req.responseText;
        setContent(json, prefix);

        let images = document.getElementsByTagName('img');
        for(let i = 0; i < images.length; i++) {
          images[i].onload = () => {
            AOS.refreshHard();
          }
        }
      };
    };
  } else {
    let req = new XMLHttpRequest();
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

      getMediumLatestPost();
    };
  }
}




(function() {
  AOS.init();

  const router = new Navigo();
  router.on({
    '/project-web': function () {
      loadHTML('./web.html', 'view');
    },
    '/project-app': function () {
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

