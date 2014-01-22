(function() {
  if (!Modernizr.csstransforms) {
    return;
  }

  function Zoomer(content, navLinks) {
    this.content = content;
    this.navLinks = navLinks;

    this.scrolled = 0;
    this.levels = 7;
    this.docHeight = document.documentElement.offsetHeight;

    this.levelGuide = {
      '#bio' : 0,
      '#work' : 1,
      '#hobbies' : 2,
      '#food' : 3,
      '#contact' : 4
    }

    window.addEventListener('scroll', this, false);

    for(var i = 0, len = this.navLinks.length; i < len; i++) {
      this.navLinks[i].addEventListener('click', this, false);
    }
  }

  Zoomer.prototype.handleEvent = function(event) {
    if(this[event.type]) {
      this[event.type](event);
    }
  };

  Zoomer.prototype.scroll = function(event) {
    this.scrolled = window.scrollY / (this.docHeight - window.innerHeight);

    var scale = Math.pow(3, this.scrolled * this.levels),
        transformValue = 'scale('+scale+')';

    this.content.style.WebkitTransform = transformValue;
    this.content.style.MozTransform = transformValue;
    this.content.style.OTransform = transformValue;
    this.content.style.transform = transformValue;

    this.currentLevel = Math.round(this.scrolled * this.levels);

    if (this.currentLevel !== this.previousLevel) {
      if (this.currentNavLink) {
        this.currentNavLink.className = '';
      }

      this.currentNavLink = this.navLinks[this.currentLevel];
      this.currentNavLink.className = 'current';
      this.previousLevel = this.currentLevel;
    }
  };

  Zoomer.prototype.click = function(event) {
    var hash = event.target.hash || event.target.parentNode.hash;
    if (Modernizr.csstransitions) {
      this.content.className = 'transitions-enabled';
      this.content.addEventListener('webkitTransitionEnd', this, false);
      this.content.addEventListener('oTransitionEnd', this, false);
      this.content.addEventListener('transitionend', this, false);
      
      this.scrollFormHash(hash);
      event.preventDefault();
    }
  };

  Zoomer.prototype.scrollFromHash = function(hash) {
    var targetLevel = this.levelGuide[hash];

    if (targetLevel === undefined) {
      return;
    }
    var scrollY = targetLevel / this.levels;

    scrollY = scrollY * (this.docHeight - window.innerHeight);
    window.location.hash = hash;

    window.scrollTo(0, scrollY);
  };

  Zoomer.prototype.webkitTransitionEnd = function(event) {
    this.transitionEnded(event);
  };

  Zoomer.prototype.transitionend = function(event) {
    this.transitionEnded(event);
  };

  Zoomer.prototype.oTransitionEnd = function(event) {
    this.transitionEnded(event);
  };

  Zoomer.prototype.transitionEnded = function(event) {
    this.content.className = '';
    this.content.removeEventListener('webkitTransitionEnd', this, false);
    this.content.removeEventListener('transitionend', this, false);
    this.content.removeEventListener('oTransitionEnd', this, false);
  };

  function init() {
  }
})();
