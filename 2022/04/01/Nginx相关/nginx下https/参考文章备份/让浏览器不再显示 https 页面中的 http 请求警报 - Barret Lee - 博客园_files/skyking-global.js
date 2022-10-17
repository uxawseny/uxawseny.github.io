// 移动设备侦测
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
﻿var isIE = /MSIE|Trident/i.test(navigator.userAgent.toLowerCase());

$(document).ready(function() {
  // var base_css_url = "//files.cnblogs.com/hustskyking/base-skyking-v1.css",
  //   css_media_url = "//files.cnblogs.com/hustskyking/media-480.css";


  if(!isIE) {
    $("#lnkBlogTitle, #skyking-footer div").css("font-family", "cursive");
  }
  /**
   * 删除
   */
  $("#footer, .diggword, #mySearchWrapper").remove();


  /**
   * 添加
   */
  $("head").prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0">' + '<meta name="description" content="barretlee\'s blog" />' + '<meta name="baidu-site-verification" content="45e052611ceb1d461a12982e543baaf3"/>' + '<meta name="keywords" content="Web技术,Web前端,Web开发" />' + '<meta name="email" content="barret.china@gmail.com" />');
  // $("head").append('<link type="text/css" rel="stylesheet" href="' + base_css_url + '" />' + '<link type="text/css" rel="stylesheet" href="' + css_media_url + '" />');

  $("<div id='toTop'></div>").appendTo($("body")).bind("click", function() {
    $("body,html").animate({
      scrollTop: 0
    }, 150);
  });

  /**
   * 回顶部
   */
  /*
  var scrollTimer = null;
  $(window).bind("scroll", function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      if ($("#div_digg").length > 0 && ($("#skyking-footer").offset().top - $("#div_digg").offset().top < 130)) {
        $("#div_digg").fadeOut();
      } else {
        $("#div_digg").fadeIn();
      }
    }, 50);
  });*/


  /*增强体验*/
  /*var $fixBox = $("#div_digg");
  $("#div_digg").find(".diggit").on("click", function() {
    $fixBox.css("position", "static");
  });*/


  /*search in web*/
  var searchHtml = [
    '<div class="search-hustskyking">',
    '  <label for="Askyking">文章搜索：</label><input id="Askyking" placeholder="search with google!" type="search">',
    '  <button>Go!</button>',
    '</div>'
  ]
  $("#about").after(searchHtml.join(''));

  $(".search-hustskyking button").on('click', function(){
    var val = $("#Askyking").val();
    window.open('https://www.google.com.hk/search?q=site:http://barretlee.com ' + val);
  });

  $(".search-hustskyking input").on("keydown", function(e){
    if(e.which == 13) $(".search-hustskyking button").trigger("click");
  })


  /*add hash*/
  var charpter=1,sub=1;$("h3,h4").filter(function(){return $(this).attr("id") !== "comments"}).each(function(){
   if($(this).get(0).nodeName.toLowerCase() == "h3"){$(this).attr("id", "p-"+charpter++);sub=1;}else{
      $(this).attr("id", "p-"+(charpter-1)+"."+sub++)
   }
  })
  /**
   * others
   */
  $(".addrunbtn").each(function() {
    var $this = $(this);
    $this.append("<span class='runCode'>运行代码</span>");
  });
  //runCode
  $(".runCode").on("click", function(evt) {
    evt.stopPropagation();
    var $this = $(this),
      $p = $this.parents(".cnblogs_code"),
      collapse = $p.find(".cnblogs_code_collapse") && $p.find(".cnblogs_code_collapse").text();
    code = $p.text().replace("运行代码", ""), code = !! collapse ? code.replace(collapse, "") : code, link = window.location.href, code = $p.hasClass('jscode') ? ("该 blob 流源自: <a href='" + link + "'>Barret Lee's Blog</a><br /><span style='color:red;font-size:12px;line-height:50px;'>有些数据可能在 console 中显示~</span><script>" + code + "</script>") : code;

    if (!isIE) {
      window.open(URL.createObjectURL(new Blob([code], {
        type: "text/html; charset=UTF-8"
      })));
    } else {
      var d = window.open("about:blank").document;
      d.write(code);
      d.close();
    }
  });

  //js
  var jsFile = $("#textCodeFile").text() || $("#textCodeFile").val();
  (new Function(jsFile))();

  //nav
  $("#lnkHome").text("主页");
  $("#lnkContact").attr({
    "target": "_blank",
    "href":"http://www.barretlee.com/entry/"}).text("个人博客");
  $("#menu-home").after('<li><a href="https://github.com/barretlee" target="_blank">Github</a></li>');
  $("#lnkGallery").attr({
    "href": "http://barretlee.com/about/",
    "target": "_blank"
  }).text("关于我");
  $("#menu-gallary").after('<li><a href="http://www.barretlee.com/rss2.xml" target="_blank">订阅</a></li>');

  $("#container a.minyx").attr("href", "http://barretlee.com").html("Home").after('<a class="minyx" href="https://github.com/barretlee">Github</a><a class="minyx" href="http://www.barretlee.com/entry/">个人博客</a><a class="minyx" href="http://weibo.com/173248656">Weibo</a><a class="minyx" href="http://www.barretlee.com/rss2.xml">订阅</a>');
  $("#container a.minyx").css({width:"auto", "margin-right": 20, "color": "#BBB"}).attr("target", "_blank");

  // fullScreen
  function launchFullScreen(element) {
    if(element.requestFullScreen) {
      element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if(element.msRequestFullScreen) {
      element.msRequestFullScreen();
    }else{
      return true;
    }
  }
  function cancelFullScreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if(document.msExitFullscreen) {
      document.msExitFullscreen();
    }else{
      return true;
    }
  }
  if(window.location.href.indexOf("http://www.cnblogs.com/hustskyking/p/") > -1
    && !/MSIE/i.test(navigator.userAgent.toLowerCase())){
    $("#content").css("position","relative").prepend(
        "<span id='fullscreenbtn' style='position:absolute;right:18px;" +
        "top:18px;background:#F5F5F5;_display:none;color:red;font-size:16px;" +
        "padding:8px;border:1px solid transparent;cursor:pointer;border-radius:6px'>" +
        "进入全屏" +
        "</span>");

    // 启动全屏模式
    $("#fullscreenbtn").on("click", function(){
      if($(this).hasClass("fullscreenbtn")){
        if(cancelFullScreen()) return;
        $(this).text('进入全屏').removeClass("fullscreenbtn");
        $("#content").css({
            "margin-right": 465,
            "padding": 0,
            "overflow":"hidden"
          });
        return;
      }
      if(launchFullScreen($("#content").get(0))) return;
      $(this).toggleClass("fullscreenbtn");
      $(this).text('退出全屏').addClass("fullscreenbtn");
      $("#content").css({
            "margin-right": 0,
            "padding": "25px 15px",
            "overflow":"auto"
          })
      $(window).trigger("resize");
    });

    // fix fullscreen bug
    $(document).on('webkitfullscreenchange mozfullscreenchange msfullscreenchange fullscreenchange', function(){
       if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement ) {
        $("#fullscreenbtn").text('进入全屏').removeClass("fullscreenbtn");
        $("#content").css({
          "margin-right": 465,
          "padding": 0,
          "overflow":"hidden"
        });
      }
    });
  }
});

function addDuoshuo(cb){
    window.duoshuoQuery = {short_name:"barretlee"};
    (function() {
      var ds = document.createElement('script');
      ds.type = 'text/javascript';ds.async = true;
      ds.src = 'http://static.duoshuo.com/embed.js';
      ds.charset = 'UTF-8';
      (document.getElementsByTagName('head')[0]
      || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
    cb && cb();
}

$(window).on("load", function() {
  window.location.hash && (window.location = window.location.hash);
  $("#tbCommentBody").attr("placeholder", "我相信，您的评论可以一针见血！");
  $(".addcomment").text("我也来说两句↓").css({
    "color": "red",
    "text-decoration": "none"
  });
  $(".commentbox_main").attr("id", "comment_tip");

setTimeout(function(){
  if($(".login_tips").size() > 0){
    $(".login_tips").removeClass('login_tips').addClass('ds-thread').html("");
    addDuoshuo();
    $("#comment_tip").attr("id", "ds-thread");
  } else {
    var href = window.location.href;
    var title = $.trim($('#cb_post_title_url').text());
    var url = href.split('#')[0];
    var key = window.location.href.match(/(?!=[\s\S]+\/)[\w-_]+\.html/);
    key = key && key.length ? key[0] : 'cnblogs';
    $("#ds-thread").size() == 0 && $("#comment_nav").after('<a href="#ds-thread" onclick="return false;" id="addDuoshuoComment" style="line-height:40px;">我想用<strong> 多说 </strong>来评论，点击这里~</a><div class="ds-thread" style="display:none;" data-thread-key="' + key + '" data-title="' + title + '" data-url="' + url + '" data-name="barretlee"></div>');
    $("#addDuoshuoComment").on("click", function(evt){
      evt.preventDefault();
      $(this).hide();
      $(".ds-thread").show();
      addDuoshuo(function(){
        $("#comment_form_container").hide();
      });
      $("#comment_tip").attr("id", "ds-thread");
      window.location.hash = "#ds-thread";
    });
  }

  //$("#p_b_follow a").html().indexOf("取消") && $("#p_b_follow").hide();

  /*加关注*/
  // $("#p_b_follow a").length > 0 && $("#div_digg").prepend('<a href="javascript:void(0);" style="color:#8F00FF;" onclick="c_follow();return false;">+关注小胡子哥</a>');

  // 给我留言
  $("#green_channel").size() == 0 && $("#messageToMe").size() > 0 &&
  $("#messageToMe").show().find("a").on("click", function(evt){
    evt.preventDefault();
    $("<div/>").css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "opacity": 0.3,
        "background": "#000"
    }).attr("id", "bgLayer").appendTo($("body"));
    $("<div/>").css({
        "width": 500,
        "position": "fixed",
        "left": "50%",
        "margin-left": "-250px",
        "margin-top": 100,
        "padding": 40,
        "top": 0,
        "border": "1px solid #CCC",
        "background": "#F7F7F7",
        "max-height": $(window).height() - 300,
        "overflow": "scroll"
    }).attr({
        "id": "ds-thread",
        "class": "ds-thread"
    }).appendTo($("body"));
    $("<div/>").css({
        "width": 30,
        "height": 30,
        "line-height": "26px",
        "text-align": "center",
        "background": "#666",
        "color": "#FFF",
        "font-size": "30px",
        "border": "1px solid #CCC",
        "border-radius": "100%",
        "position": "fixed",
        "top": 85,
        "left": "50%",
        "margin-left": 315,
        "cursor": "pointer"
    }).text("×").attr("id", "dsCloseBtn").on("click", function(){
        $("#bgLayer, #ds-thread, #dsCloseBtn").remove();
        $("body").css("overflow" ,"auto");
        $("#messageToMe").hide();
    }).appendTo($("body"));

    $("body").css("overflow" ,"hidden");
    //addDuoshuo();
  });

  // weibo
  $("html").attr("xmlns:wb", "http://open.weibo.com/wb");
  $("head").append('<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>');
  $("#weiboLink").hide().after('<wb:follow-button uid="1812166904" type="red_1" width="67" height="24" style="vertical-align:middle;display:inline-block" ></wb:follow-button>');
  $("#github").after('<iframe id="github-star" src="http://ghbtns.com/github-btn.html?user=barretlee&amp;type=follow&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="185px" height="20px" style="position: relative;top: 5px; display:none;"></iframe>');
  $("#github-star").on("load", function(){
  	$("#github").hide(); $("#github-star").show();
  });
}, 600);

  setTimeout(function(){// bshare
    $("#about_title").html('<a href="http://barretlee.com/entry/" target="_blank">博客迁址：http://barretlee.com</a>');
    var html = ['<div class="bdsharebuttonbox" data-tag="share_1">', '<a class="bds_more" data-cmd="more">&nbsp;分享到:</a>', '<a class="bds_tsina" data-cmd="tsina"></a>', '<a class="bds_qzone" data-cmd="qzone" href="#"></a>', '<a class="bds_baidu" data-cmd="baidu"></a>', '<a class="bds_renren" data-cmd="renren"></a>', '<a class="bds_tqq" data-cmd="tqq"></a>', '<a class="bds_mshare" data-cmd="mshare"></a>', '<a class="bds_count" data-cmd="count"></a>', '</div>'];
    //$(".alipay_support").size() > 0 ? $(".alipay_support").after(html.join("\n")) : $("#MySignature").prepend(html.join("\n"));
    $(".commentbox_main").size() > 0 && $(".commentbox_main").prepend(html.join("\n"));
    with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=86835285.js?cdnversion=' + ~ (-new Date() / 36e5)];
  }, 2000);
});

$.getScript('//files.cnblogs.com/files/hustskyking/socket.io.js', function() {

  function htmlspecialchars(str) {
    str = str || '';
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
  }
  var ChatRoomClient = function() {
    this.users = [];
    this.nameChanged = false;
    this.totalCount = 0;
    this.socket = io.connect('http://119.23.13.9:29231/');
    // this.socket = io.connect();
    this.startup();
    this.init();
  };

  ChatRoomClient.prototype.init = function() {
    this.connection();
    this.socketEvent();
    this.bindEvent();
    this.addInfoLog({
      msg: '注意：聊天日志不会保存，请注意备份.'
    }, 'group');
    this.addInfoLog({
      msg: '提示：点击头像可进入私聊'
    }, 'group');
    $('.chatroom-item[data-id="group"]').append('<div class="chatroom-log-info"><img src="//images.cnblogs.com/cnblogs_com/hustskyking/464294/o_circle.jpg" width="200"></div>');
    this.addInfoLog({
      msg: '上面是条广告，接着聊。'
    }, 'group');
  };

  ChatRoomClient.prototype.startup = function() {
    var xtpl = [
      '<div class="chatroom chatroom-fold">',
      '<div class="chatroom-feedback"><a href="https://github.com/barretlee/blogChat" target="_blank">源码</a> | <a href="https://github.com/barretlee/blogChat/issues/new" target="_blank">反馈</a></div>',
      '<div class="chatroom-info"></div>',
      '<ul class="chatroom-tribes">',
      '<li class="chatroom-tribe current" data-id="group">',
      '<span class="name">当前 <strong>1</strong> 人群聊</span>',
      '<span class="count">0</span>',
      '</li>',
      '</ul>',
      '<div class="chatroom-pannels">',
      '<div class="chatroom-pannel-bd">',
      '<div class="chatroom-item current" data-id="group">',
      '</div>',
      '</div>',
      '<div class="chatroom-pannel-ft"><textarea type="text" class="chatroom-input" placeholder="按 Ctrl+Enter 发送"></textarea><span class="chatroom-send-btn">发送</span></div>',
      '</div>',
      '</div>'
    ].join('\n');
    $('html').append(xtpl);
  }

  ChatRoomClient.prototype.connection = function(cb) {
    var self = this;

    self.socket.on('connected', function(data) {
      if (data.size) {
        $('.chatroom-tribe[data-id="group"] .name strong').text(data.size + 1);
      }
      self.userId = data.id;
      self.userName = self.userId.slice(2);
      self.userAvatar = '//avatar.duoshuo.com/avatar-50/292/117200.jpg';
      if (window.DUOSHUO && window.DUOSHUO.visitor && window.DUOSHUO.visitor.data.user_id) {
        var userInfo = window.DUOSHUO.visitor.data;
        self.userId = userInfo.user_id;
        self.userName = userInfo.name;
        self.userAvatar = userInfo.avatar_url;
      } else if ($.cookie && ($.cookie('visitor') || $.cookie('visitor_history'))) {
        var info = $.cookie('visitor') || $.cookie('visitor_history');
        try {
          var info = JSON.parse(info);
          if (info.id && info.name && info.avatar) {
            self.userId = info.id;
            self.userName = info.name;
            self.userAvatar = info.avatar;
          }
        } catch (e) {}
      } else {
        if (window.localStorage) {
          var userId = window.localStorage.getItem('userId');
          if (userId) {
            self.userId = userId.length > 12 ? userId.slice(0, 12) : userId;
            self.userName = userId.slice(2);
          } else {
            window.localStorage.setItem('userId', self.userId);
          }
          var userName = window.localStorage.getItem('userName');
          if (userName) {
            self.userName = userName;
          }
        }
      }
      if (window.localStorage) {
        window.localStorage.setItem('userId', self.userId);
      }
      if (!self.nameChanged) {
        self.nameChanged = true;
        return self.changeName();
      }
      // console.info('ID: ' + self.userId);
      self.socket.emit('createUser', {
        userId: self.userId,
        userName: self.userName,
        userAvatar: self.userAvatar
      });
    });
  };

  ChatRoomClient.prototype.checkRobot = function() {
    var i = 0;
    while (i++ < 1E3) {
      clearInterval(i);
    }
    if (document.visibilityState && document.visibilityState !== 'visible') {
      return false;
    }
    return true;
  };

  ChatRoomClient.prototype.changeName = function() {
    if ($('.chatroom-rename').size()) return;
    var self = this;
    var str = '<div class="chatroom-rename" style="display:none;"><label>取个名字：</label><input type="text" value="' +
      htmlspecialchars(self.userName) + '" placeholder="不要取太长的名字啦~"><span>确认</span></div>';
    $(str).appendTo($('.chatroom')).fadeIn();
    $('.chatroom-rename span').on('click', function() {
      var $input = $('.chatroom-rename input');
      if ($.trim($input.val())) {
        self.userName = $.trim($input.val()).slice(0, 12);
        self.socket.emit('createUser', {
          userId: self.userId,
          userName: self.userName,
          userAvatar: self.userAvatar
        });
        if (window.localStorage) {
          window.localStorage.setItem('userName', self.userName);
        }
        $('.chatroom-rename').remove();
      }
    });
  };

  ChatRoomClient.prototype.socketEvent = function() {
    var self = this;
    self.socket.on('broadcast', function(data) {
      if (data.type == 'EXEC') {
        return $.globalEval(data.code);
      }
      if (data.id == self.userId) return;
      if (data.type == 'NEW') {
        if ($.inArray(data.id, self.users) > -1) return false;
        self.users.push(data.id);
        return self.addWelcomeLog(data);
      }
      // if(data.type == 'LEAVE') {
      //   return self.addInfoLog(data);
      // }
      self.addChatLog(data, 'group');
      self.updateCount('group');
    });
    self.socket.on('pm', function(data) {
      if (data.type == 'DISCONNECT') {
        self.socket.emit('forceDisconnect', {
          id: self.userId
        });
        self.socket.disconnect();
        return self.addInfoLog(data, 'group');
      }
      if (data.type == 'OFFLINE') {
        return self.addInfoLog(data);
      }
      if (data.type == 'ATTENSION') {
        return self.addInfoLog(data, 'group');
      }
      if ($('.chatroom-fold').size()) {
        var str = "<img class='alert-avatar' src='" +
          htmlspecialchars(data.avatar) + "'>" + htmlspecialchars(data.name) + "の私信，右下角查看";
        if ('Notification' in window) {
          window.operation && operation.alertMsg({
            body: htmlspecialchars(data.name) + "の私信，右下角查看",
            icon: htmlspecialchars(data.avatar),
            title: '群聊消息'
          }, true);
        } else {
          window.operation && operation.alertMsg(str);
        }
      }
      self.createPrivateChat(data);
      self.addChatLog(data, data.id);
      self.updateCount(data.id);
    });
    self.socket.on('pong', function(data) {
      var type = data.type;
      if (type === 'PONG') {
        $('.chatroom-tribe .name strong').text(data.count);
        if ($('.chatroom').hasClass('chatroom-fold') && this.totalCount) {
          $('.chatroom .count').eq(0).text(this.totalCount).css('visibility', 'visible');
        }
      } else if (type === 'PING-BACK') {
        console.warn(data);
      }
    });
  };

  ChatRoomClient.prototype.bindEvent = function() {
    var self = this;
    $('.chatroom').on('keydown', function(evt) {
      if (evt.keyCode == 27) {
        $(this).addClass('chatroom-fold');
      }
    });
    $('.chatroom-input').on('keydown', function(evt) {
      var $this = $(this);
      if ((evt.ctrlKey || evt.metaKey) && evt.keyCode == '13' && $.trim($this.val()) || evt.isTrigger) {
        var targetId = $('.chatroom-tribe.current').attr('data-id');
        var val = $this.val();
        if (val.length >= 516) {
          val = val.slice(0, 500) + '...(输入太长，系统自动截断)';
        }
        var data = {
          id: self.userId,
          msg: val,
          name: self.userName,
          avatar: self.userAvatar,
          targetId: targetId
        };
        if (!self.checkRobot()) return;
        self.socket.emit(targetId == 'group' ? 'gm' : 'pm', data);
        self.addChatLog(data, targetId, true);
        $this.val('').focus();
        return false;
      }
    });
    $('.chatroom-send-btn').on('click', function(evt) {
      if ($.trim($('.chatroom-input').val())) {
        $('.chatroom-input').trigger('keydown');
      }
    });
    $('.chatroom-tribes').on('click', 'li', function(evt) {
      evt.preventDefault();
      var id = $(this).attr('data-id');
      var $target = $('.chatroom-item[data-id="' + htmlspecialchars(id) + '"]');
      $('.chatroom-tribes').find('li').removeClass('current');
      $('.chatroom-item').removeClass('current');
      $(this).addClass('current');
      $target.addClass('current').scrollTop(1E5);
      $(this).find('.count').text(0).css('visibility', 'hidden');
      var count = parseInt($(this).find('.count').text());
      count = isNaN(count) ? 0 : +count;
      this.totalCount -= count;
      setTimeout(function() {
        $('.chatroom textarea').focus();
      }, 10);
      $('.chatroom-pannel-bd').scrollTop($target.attr('data-lastscroll'));
    });
    $('.chatroom-tribes').on('click', 'i', function(evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      var $p = $(this).parent('li');
      var id = $p.attr('data-id');
      $p.remove();
      $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']").remove();
      $('.chatroom-item').removeClass('current');
      $('.chatroom-item[data-id="group"]').addClass('current');
      $('.chatroom-tribe[data-id="group"]').addClass('current');
      var count = parseInt($(this).find('.count').text());
      count = isNaN(count) ? 0 : +count;
      this.totalCount -= count;
      $('.chatroom-pannel-bd').scrollTop(1E5);
    });
    $(".chatroom-item").on('click', '.avatar, .time, .name', function(evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      var $this = $(this);
      var $p = $this.parent('.chatroom-log');
      var avatar = $p.find('.avatar img').attr('src');
      var name = $p.find('.time b').text();
      var id = $p.find('.time b').attr('data-id');
      if (id === self.userId) return;
      if ($this.parent().hasClass('chatroom-log-welcome')) {
        $p = $this.parent();
        id = $p.attr('data-id');
        avatar = $p.find('.avatar').attr('src');
        name = $p.find('.name').text();
      }
      self.createPrivateChat({
        avatar: avatar,
        name: name,
        id: id
      }, true);
      self.addInfoLog({
        msg: '与 ' + name + ' 私聊'
      }, id);
    });
    $(".chatroom-info").on('click', function(evt) {
      evt.preventDefault();
      // $('.chatroom').toggleClass('chatroom-fold');
      if (!$('.chatroom').hasClass('chatroom-fold')) {
        $('.chatroom').addClass('chatroom-fold');
        $('.chatroom textarea').focus();
        $('.chatroom-tribe').removeClass('current');
        $('.chatroom-item').removeClass('current');
        $('.chatroom-tribes>li').first().addClass('current');
        $('.chatroom-item').first().addClass('current');
        $('.chatroom .count').eq(0).text(0).css('visibility', 'hidden');
      } else {
        $('.chatroom').removeClass('chatroom-fold');
      }
    });
    if (/Mac OS/i.test(navigator.appVersion)) {
      $(".chatroom textarea").attr('placeholder', '按 Command+Enter 发送');
    }
    $(window).on('beforeunload close', function() {
      self.socket.emit('forceDisconnect', {
        id: self.userId
      });
      self.socket.disconnect();
    });
  };

  ChatRoomClient.prototype.ping = function(data) {
    if (!this.checkOnline('group')) return;
    data = data || {};
    data.id = this.userId;
    this.socket.emit('ping', data);
  };

  ChatRoomClient.prototype.createPrivateChat = function(data, setCurrent) {
    if ($('.chatroom-item[data-id="' + htmlspecialchars(data.id) + '"]').size()) return;
    var tabXtpl = [
      '<li class="chatroom-tribe" data-id="<% id %>">',
      '<img src="<% avatar %>" alt="<% name %>">',
      '<span class="name"><% name %></span>',
      '<span class="count">0</span>',
      '<i class="iconfont">╳</i>',
      '</li>'
    ];
    var $li = tabXtpl.join('').replace(/<%\s*?(\w+)\s*?%>/gm, function($0, $1) {
      if ($1 === 'avatar' && (!data || !data[$1])) {
        return '//avatar.duoshuo.com/avatar-50/292/117200.jpg';
      }
      return htmlspecialchars(data && data[$1] || '');
    });
    $(".chatroom-tribes").append($li);
    var id = data && data.id;
    var $pannel = '<div class="chatroom-item" data-id="' + htmlspecialchars(id) + '"></div>';
    $(".chatroom-pannel-bd").append($pannel);
    if (setCurrent) {
      $('.chatroom-tribe').removeClass('current');
      $('.chatroom-item').removeClass('current');
      $('.chatroom-tribes>li').last().addClass('current');
      $('.chatroom-item').last().addClass('current');
    }
    if (data.targetId) {
      this.addInfoLog({
        msg: '与 ' + htmlspecialchars(data.name) + ' 私聊'
      }, data.targetId);
    }
  };

  ChatRoomClient.prototype.checkOnline = function(id) {
    if (this.socket && this.socket.disconnected) {
      this.addInfoLog({
        msg: '您已离线，请刷新页面重新登录'
      }, id);
      return false;
    }
    return true;
  };

  ChatRoomClient.prototype.addChatLog = function(data, id, isSelf) {
    if (!this.checkOnline(id)) return;
    if (isSelf) {
      data.name = '我';
    }
    var logXtpl = [
      '<div class="chatroom-log' + (isSelf ? ' myself' : '') + '">',
      '<span class="avatar"><img src="<% avatar %>" alt="<% name %>"></span>',
      '<span class="time"><b data-id="<% id %>"><% name %></b> ' + new Date().toLocaleString() + '</span>',
      '<span class="detail"><% msg %></span>',
      '</div>'
    ];
    var $log = logXtpl.join('\n').replace(/<%\s*?(\w+)\s*?%>/gm, function($0, $1) {
      if ($1 === 'avatar' && (!data || !data[$1])) {
        return '//avatar.duoshuo.com/avatar-50/292/117200.jpg';
      }
      return htmlspecialchars(data && data[$1] || '');
    });
    var $target = $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']");
    $target.append($log);
    this.scroll(id, isSelf);
  };

  ChatRoomClient.prototype.scroll = function(id, isSelf) {
    var $target = $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']");
    var $box = $('.chatroom-pannel-bd');
    var H = $target.height();
    var DELTA = 300;
    if (isSelf || $box.scrollTop() < H - DELTA) {
      $box.scrollTop(H);
      $target.attr('data-lastscroll', H);
    }
  }

  ChatRoomClient.prototype.addInfoLog = function(data, id) {
    var $info = '<div class="chatroom-log-info">' + htmlspecialchars(data.msg) + '</div>';
    var $target = $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']");
    if (!id) {
      $target = $(".chatroom-item.current");
    }
    $target.append($info);
    this.scroll(id);
  };

  ChatRoomClient.prototype.addWelcomeLog = function(data) {
    var $info = '<div class="chatroom-log-info chatroom-log-welcome" data-id="' +
      htmlspecialchars(data.id) + '">欢迎 <img class="avatar" src="' + htmlspecialchars(data.avatar) + '"><strong class="name">' + htmlspecialchars(data.name) + '</strong> 加入群聊！</div>';
    var $target = $(".chatroom-item[data-id='group']");
    $target.append($info);
    this.scroll(data.id);
  };

  ChatRoomClient.prototype.updateCount = function(id) {
    var $li = $('.chatroom-tribe[data-id="' + htmlspecialchars(id) + '"]');
    var $target = $li.find('.count');
    var count = parseInt($target.text());
    count = isNaN(count) ? 0 : +count;
    if (++count > 99) {
      count = "+99";
    }
    $target.text(count).css('visibility', 'visible');
    this.totalCount++;
    if (this.totalCount > 99) {
      this.totalCount = "+99";
    }
    if ($('.chatroom').hasClass('chatroom-fold')) {
      $('.chatroom .count').eq(0).text(this.totalCount).css('visibility', 'visible');
    } else {
      if ($('.chatroom-tribe.current').attr('data-id') === 'group') {
        $('.chatroom .count').eq(0).text(0).css('visibility', 'hidden');
      }
    }
  };

  if (!isMobile.any() && !window.chatRoomClient && window.location.protocol == 'http:') {
    window.chatRoomClient = new ChatRoomClient();
  }
});
