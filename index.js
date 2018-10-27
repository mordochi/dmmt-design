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

function redDot() {
  let jumping1s = document.getElementsByClassName('jumping1');
  let jumping2s = document.getElementsByClassName('jumping2');

  for(let i = 0; i < jumping1s.length; i++) {
    jumping1s[i].animate([
      // keyframes
      { opacity: '1' },
      { opacity: '0.1' }
    ], {
      // timing options
      duration: 2000,
      iterations: Infinity
    });

    jumping1s[i].animate([
    // keyframes
      { transform: 'scale(0.4)' },
      { transform: 'scale(2)' }
    ], {
      // timing options
      duration: 2000,
      iterations: Infinity
    });

    jumping2s[i].animate([
    // keyframes
      { opacity: '1' },
      { opacity: '0.1' }
    ], {
      // timing options
      duration: 2000,
      delay: 1000,
      iterations: Infinity
    });

    jumping2s[i].animate([
    // keyframes
      { transform: 'scale(0.4)' },
      { transform: 'scale(2)' }
    ], {
      // timing options
      duration: 2000,
      delay: 1000,
      iterations: Infinity
    });
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
  let windowWidth = window.innerWidth;
  let dots1 = document.querySelectorAll('#dot-pack-1 div');
  let dots2 = document.querySelectorAll('#dot-pack-2 div');
  let dots3 = document.querySelectorAll('#dot-pack-3 div');

  for(let i = 0; i < dots1.length; i++) {
    if(scrollTop > 0.26 * windowWidth + (13 * i)) {
      dots1[i].style.setProperty('opacity', '1');
    } else {
      dots1[i].style.setProperty('opacity', '0');
    }
  }

  for(let i = 0; i < dots2.length; i++) {
    if(scrollTop > 0.54 * windowWidth + (13 * i)) {
      dots2[i].style.setProperty('opacity', '1');
    } else {
      dots2[i].style.setProperty('opacity', '0');
    }
  }

  for(let i = 0; i < dots3.length; i++) {
    if(scrollTop > 0.81 * windowWidth + (13 * i)) {
      dots3[i].style.setProperty('opacity', '1');
    } else {
      dots3[i].style.setProperty('opacity', '0');
    }
  }
}

function clickNav(id) {
  document.getElementById('nav-checkbox').checked = false;
  document.getElementById(id).scrollIntoView(
    {
      behavior: 'smooth',
      block: 'start'
    },
  );
}

function shrinkRedCover(prefix) {
  let bodyRect = document.body.getBoundingClientRect();
  let elemRect = document.getElementById(prefix + 'jump').getBoundingClientRect();
  let offsetTop   = elemRect.top - bodyRect.top;
  let offsetLeft   = elemRect.left - bodyRect.left;

  if(document.getElementById('red-cover').offsetWidth > document.getElementById('red-cover').offsetHeight) {
    document.getElementById('red-cover').style.top =`-50vh`;
    document.getElementById('red-cover').style.left =`-20vw`;
    document.getElementById('red-cover').style.width = "150vw";
    document.getElementById('red-cover').style.height = "150vw";
  } else {
    document.getElementById('red-cover').style.top =`-20vh`;
    document.getElementById('red-cover').style.left =`-50vw`;
    document.getElementById('red-cover').style.width = "150vh";
    document.getElementById('red-cover').style.height = "150vh";
  }
  document.getElementById('red-cover').style.borderRadius = "50%";

  //避免上面的改變影響後續的改變
  setTimeout(() => {
    document.getElementById('red-cover').style.top =`${offsetTop}px`;
    document.getElementById('red-cover').style.left =`${offsetLeft}px`;
    document.getElementById('red-cover').style.width="0px";
    document.getElementById('red-cover').style.height="0px";
  }, 400);
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

function setProjectContent(json, prefix) {
  shrinkRedCover(prefix);

  document.getElementById('no').innerHTML = json.No;
  document.getElementById('img').src = json.img;
  document.getElementById('name').innerHTML = json.name;
  document.getElementById('intro').innerHTML = json.intro;
  document.getElementById('medium-thumbnail').src = json.medium.img;
  document.getElementById('medium-title').innerHTML = json.medium.title;
  document.getElementById('medium-link').href = json.medium.link;

  let webLink = document.getElementsByClassName(prefix + 'link');
  for(let i = 0; i < webLink.length; i++) {
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

    if(i === json.content.length - 1) {
      AOS.refreshHard();
    }
  }
}

function setHomeContent(json) {
  let serviceTitles = document.querySelectorAll('.service h2');
  let serviceDescs = document.querySelectorAll('.service p');

  for(let i = 0; i < serviceTitles.length; i++) {
    serviceTitles[i].innerHTML = json.services[i].title;
  }

  for(let i = 0; i < serviceDescs.length; i++) {
    serviceDescs[i].innerHTML = json.services[i].desc;
  }

  document.querySelectorAll('.belief p')[0].innerHTML = json["aboutUs"];
}

function anotherProject(type, direction) {
  let currentProjectId = Number(window.location.href.split("?id=")[1]);

  if(direction === "prev") {
    if(currentProjectId === 1) {
      projectId = projectNum;
    } else {
      projectId = currentProjectId - 1;
    }
  } else {
    if(currentProjectId === projectNum) {
      projectId = 1;
    } else {
      projectId = currentProjectId + 1;
    }
  }

  router.navigate('/project-' + type + '?id=' + projectId);
}

function showProject(type) {
  //下面的訪談文章原有position: relative 因此不會被擴大的紅色背景擋住
  document.getElementsByClassName('article')[0].style.position="static";

  if(type === 'web') {
    document.querySelectorAll('.app div')[0].style.position="static";
    document.getElementById('app-zoom-in').style.position="static";
    document.getElementById('web-zoom-in').style.transform="scale(25)";
    document.getElementById('web-zoom-in-inner').style.transform="translateY(100vh)";
  } else {
    document.getElementById('app-zoom-in').style.transform="scale(150)";
  }

  setTimeout(() => {
    router.navigate('/project-' + type + '?id=1');
  }, 900);

}

function setContent(page, id) {
  document.getElementById(id).innerHTML = sessionStorage.getItem(page + 'HTML');
  let storageJson = JSON.parse(sessionStorage.getItem(page + 'Json'));

  if(page === "home") {
    getMediumLatestPost();
    setHomeContent(storageJson);
  } else {
    projectId = Number(window.location.href.split("?id=")[1]);
    projectNum = storageJson.length;
    document.getElementById(page + '-intro').scrollIntoView();
    setProjectContent(storageJson[projectId - 1], (page + '-'));
  }

  redDot();

  let images = document.getElementsByTagName('img');
  for(let i = 0; i < images.length; i++) {
    images[i].onload = () => {
      AOS.refreshHard();
    }
  }
}

function firstRequest(jsonUrl, url, id) {
  console.log(jsonUrl);
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
      if(url === './pages/home.html') {
        sessionStorage.setItem('homeHTML', req.responseText);
        sessionStorage.setItem('homeJson', JSON.stringify(json));

        setContent('home', id);
      } else if(url === './pages/web.html') {
        sessionStorage.setItem('webHTML', req.responseText);
        sessionStorage.setItem('webJson', JSON.stringify(json));

        setContent('web', id);
      } else {
        sessionStorage.setItem('appHTML', req.responseText);
        sessionStorage.setItem('appJson', JSON.stringify(json));

        setContent('app', id);
      }
    };
  };
}

function loadHTML(url, id) {
  let jsonUrl;

  if(url === './pages/home.html') {
    jsonUrl = './content/home.json';

    if(sessionStorage.getItem('homeHTML') && sessionStorage.getItem('homeJson')) {
      setContent('home', id);
    } else {
      firstRequest(jsonUrl, url, id);
    }
  } else if(url === './pages/web.html') {
    jsonUrl = './content/web/example.json';

    if(sessionStorage.getItem('webHTML') && sessionStorage.getItem('webJson')) {
      setContent('web', id);
    } else {
      firstRequest(jsonUrl, url, id);
    }
  } else {
    jsonUrl = './content/app/example.json';

    if(sessionStorage.getItem('appHTML') && sessionStorage.getItem('appJson')) {
      setContent('app', id);
    } else {
      firstRequest(jsonUrl, url, id);
    }
  }
}




const router = new Navigo();
let projectId;
let projectNum;

(function() {
  AOS.init();

  router.on({
    '/project-web*': function () {
      loadHTML('./pages/web.html', 'view');
    },
    '/project-app*': function () {
      loadHTML('./pages/app.html', 'view');
    },
    '*': function () {
      loadHTML('./pages/home.html', 'view');
    }
  }).resolve();

  let farestPosition = [];

  window.addEventListener('scroll', function(){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    moveIt(scrollTop);
    fadeIt(scrollTop, farestPosition);
    showDot(scrollTop);
  });
})();

