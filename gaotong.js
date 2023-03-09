const PAGE = {
  data: {
    navigatorBarIdArr: ['intro-section', 'course-section', 'teacher-section', 'product-section', 'qual-section'],
    navigatorBarActiveId: '',
    navigatorBarFixed: false,
    navigatorBarFixedOffset: 424,   
    navigatorBarHeight: 70,       
    duration: 500,
    itemWidth: 225,       
    translateX: 0,        //每一次记录，必须有
    index: 0,
    islock: false,
  },
  init: function () {
    this.bind();
  },
  bind: function () {
    window.addEventListener('scroll', this.refreshNavigator);
    let navigatorBar = document.getElementsByClassName('nav-container')[0];
    this.onEventListener(navigatorBar, 'click', 'nav-item', this.goNavigator);
    let classArrow = document.getElementsByClassName('dragon-class-arrow')
    classArrow[0].addEventListener('click', this.classChangeFirst)
    classArrow[1].addEventListener('click', this.classChangeSecond)
    classArrow[2].addEventListener('click', this.classChangeThird)
    let dragonList = document.getElementsByClassName("dragon-list")[0];
    this.onEventListener(dragonList, 'click', 'dragon-item', this.goVideo);
    let teacherLeft = document.getElementsByClassName('teacher-left')[0];
    teacherLeft.addEventListener('click', this.siwperPrev);
    let teacherRight = document.getElementsByClassName('teacher-right')[0];
    teacherRight.addEventListener('click', this.siwperNext);
  },
  siwperPrev: function () {
    let index = PAGE.data.index;
    PAGE.goIndex(index - 1);
    PAGE.data.islock = true;
  },
  siwperNext: function () {
    let index = PAGE.data.index;
    PAGE.goIndex(index + 1);
    PAGE.data.islock = true;
  },
  goIndex: function (index) {
    if (PAGE.data.islock == true) {
      if (index == -1) {
        index = 3
      }
      if (index == 4) {
        index = 0
      }
      let swiperDuration = PAGE.data.duration;
      let swiperItemWidth = PAGE.data.itemWidth;
      let beginTranslateX = PAGE.data.translateX;
      let endTranslateX = - (swiperItemWidth * index);
      let teacherBanner = document.getElementsByClassName('teacher-banner')[0];
      PAGE.animateTo(beginTranslateX, endTranslateX, swiperDuration, function (value) {
        teacherBanner.style.transform = `translateX(${value}px)`;
        PAGE.data.islock = false;
      }, function (value) {
        teacherBanner.style.transform = `translateX(${value}px)`;
        PAGE.data.index = index;
        PAGE.data.translateX = value;
      })
    }
  },
  animateTo: function (begin, end, duration, changeCallback, finishCallback) {
    let startTime = Date.now();
    requestAnimationFrame(function update() {
      let dataNow = Date.now();
      let time = dataNow - startTime;
      let value = PAGE.linear(time, begin, end, duration);
      typeof changeCallback === 'function' && changeCallback(value)
      if (startTime + duration > dataNow) {
        requestAnimationFrame(update)
      } else {
        typeof finishCallback === 'function' && finishCallback(end)
      }
    })
  },
  linear: function (time, begin, end, duration) {
    return (end - begin) * time / duration + begin;
  },
  goVideo: function () {
    let offsetTop = document.getElementsByClassName('course-video')[0].offsetTop - PAGE.data.navigatorBarHeight;
    document.documentElement.scrollTop = offsetTop;
    document.getElementsByClassName('course-video')[0].play()
  },
  classChangeFirst: function (e) {
    if (e.target.className.indexOf('active') != -1) {
      e.target.className = 'dragon-class-arrow'
      e.target.parentNode.parentNode.nextElementSibling.className = 'dragon-small-list-first'
    } else {
      e.target.className += ' active'
      e.target.parentNode.parentNode.nextElementSibling.className += ' active'
    }
  },
  classChangeSecond: function (e) {
    if (e.target.className.indexOf('active') != -1) {
      e.target.className = 'dragon-class-arrow'
      e.target.parentNode.parentNode.nextElementSibling.className = 'dragon-small-list-second'
    } else {
      e.target.className += ' active'
      e.target.parentNode.parentNode.nextElementSibling.className += ' active'
    }
  },
  classChangeThird: function (e) {
    if (e.target.className.indexOf('active') != -1) {
      e.target.className = 'dragon-class-arrow'
      e.target.parentNode.parentNode.nextElementSibling.className = 'dragon-small-list-third'
    } else {
      e.target.className += ' active'
      e.target.parentNode.parentNode.nextElementSibling.className += ' active'
    }
  },
  onEventListener: function (parentNode, action, childClassName, callback) {
    parentNode.addEventListener(action, function (e) {
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  goNavigator: function (e) {
    let id = e.target.dataset.nav;
    let offsetTop = document.getElementsByClassName(id)[0].offsetTop - PAGE.data.navigatorBarHeight;
    document.documentElement.scrollTop = offsetTop;
  },
  refreshNavigator: function () {
    PAGE.fixedNavigator();
    PAGE.heightLightNavigator();
  },
  heightLightNavigator: function () {
    let scrollTop = document.documentElement.scrollTop;
    let filterNav = PAGE.data.navigatorBarIdArr.filter(data => {
      let offsetTop = document.getElementsByClassName(data)[0].offsetTop;
      return scrollTop >= offsetTop - PAGE.data.navigatorBarHeight
    })
    let navigatorBarActiveId = filterNav.length ? filterNav[filterNav.length - 1] : '';
    if (PAGE.data.navigatorBarActiveId !== navigatorBarActiveId) {
      PAGE.data.navigatorBarActiveId = navigatorBarActiveId;
      let navigatorBarItems = document.getElementsByClassName('nav-item');
      for (let i = 0; i < navigatorBarItems.length; i++) {
        let navigatorBarItem = navigatorBarItems[i];
        let dataNav = navigatorBarItem.dataset.nav;
        if (dataNav === navigatorBarActiveId) {
          navigatorBarItem.className = 'nav-item active';
        } else {
          navigatorBarItem.className = 'nav-item';
        }
      }
    }
  },
  fixedNavigator: function () {
    let scrollTop = document.documentElement.scrollTop;
    let navigatorBarTop = (PAGE.data.navigatorBarFixedOffset + PAGE.data.navigatorBarHeight);
    let navigatorBarFixed = scrollTop >= navigatorBarTop; //它把true or false状态储存在了data里。
    if (PAGE.data.navigatorBarFixed !== navigatorBarFixed) {
      PAGE.data.navigatorBarFixed = navigatorBarFixed;
      let navigatorBar = document.getElementsByClassName('nav-container')[0];
      if (navigatorBarFixed) {
        navigatorBar.className = 'nav-container fixed-top'
      } else {
        navigatorBar.className = 'nav-container'
      }
    }
  }
}

PAGE.init();