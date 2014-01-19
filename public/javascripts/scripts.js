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
})();
