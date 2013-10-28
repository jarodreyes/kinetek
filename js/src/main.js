// Generated by CoffeeScript 1.6.3
(function() {
  var KinetekContent, KinetekLayout, NavItemView, NavItems, SidebarItemView, SidebarItems, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KinetekLayout = (function(_super) {
    __extends(KinetekLayout, _super);

    function KinetekLayout() {
      _ref = KinetekLayout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    KinetekLayout.prototype.template = '#sidebar-container';

    KinetekLayout.prototype.regions = {
      sidebar: '.sidebar',
      nav: '.nav-options'
    };

    KinetekLayout.prototype.initialize = function() {
      this.currentSlug = null;
      this.content = new KinetekContent;
      return this.listenTo(this.content, 'sync', this.showContent);
    };

    KinetekLayout.prototype.onRender = function() {
      return this.content.fetch();
    };

    KinetekLayout.prototype.showContent = function() {
      var contentCollection,
        _this = this;
      this.contentData = [];
      _.each(this.content.get('feed')['entry'], function(cell, idx) {
        var response;
        response = {
          place: idx,
          page: cell.gsx$page.$t,
          slug: cell.gsx$slug.$t,
          title: cell.gsx$title.$t,
          body: cell.gsx$body.$t,
          image: cell.gsx$image.$t
        };
        return _this.contentData.push(response);
      });
      console.log(this.contentData);
      contentCollection = new Backbone.Collection(this.contentData);
      this.sidebarItems = new SidebarItems({
        collection: contentCollection
      });
      this.navItems = new NavItems({
        collection: contentCollection
      });
      this.sidebar.show(this.sidebarItems);
      this.nav.show(this.navItems);
      return $('.clubhub').fadeIn('fast');
    };

    return KinetekLayout;

  })(Backbone.Marionette.Layout);

  SidebarItemView = (function(_super) {
    __extends(SidebarItemView, _super);

    function SidebarItemView() {
      _ref1 = SidebarItemView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    SidebarItemView.prototype.template = '#sidebar-item';

    SidebarItemView.prototype.className = 'sidebar-item';

    SidebarItemView.prototype.initialize = function() {
      var slug;
      slug = this.model.get('slug');
      this.$el.addClass("" + slug);
      return this.id = slug;
    };

    SidebarItemView.prototype.hide = function() {
      this.$el.fadeOut('fast');
      return console.log('hidden');
    };

    SidebarItemView.prototype.show = function() {
      this.$el.fadeIn('slow');
      return console.log('shown');
    };

    return SidebarItemView;

  })(Backbone.Marionette.ItemView);

  SidebarItems = (function(_super) {
    __extends(SidebarItems, _super);

    function SidebarItems() {
      _ref2 = SidebarItems.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    SidebarItems.prototype.itemView = SidebarItemView;

    SidebarItems.prototype.className = 'weiners';

    return SidebarItems;

  })(Backbone.Marionette.CollectionView);

  NavItemView = (function(_super) {
    __extends(NavItemView, _super);

    function NavItemView() {
      _ref3 = NavItemView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    NavItemView.prototype.template = '#nav-item';

    NavItemView.prototype.events = {
      'click': 'triggerEvent'
    };

    NavItemView.prototype.initialize = function() {
      return this.$el.attr('data-content', this.model.get('slug'));
    };

    NavItemView.prototype.triggerEvent = function(event) {
      var data;
      data = this.$el.data('content');
      return this.trigger("do:clicked", data);
    };

    return NavItemView;

  })(Backbone.Marionette.ItemView);

  NavItems = (function(_super) {
    __extends(NavItems, _super);

    function NavItems() {
      _ref4 = NavItems.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    NavItems.prototype.itemView = NavItemView;

    NavItems.prototype.initialize = function() {
      return this.on('itemview:do:clicked', function(cv, slug) {
        this.trigger("nav clicked", slug);
        $('.sidebar-item').hide();
        $("." + slug).fadeIn('fast');
        $(".cover").removeClass('slide-in');
        return $(".bg-" + slug).addClass('slide-in');
      });
    };

    return NavItems;

  })(Backbone.Marionette.CollectionView);

  KinetekContent = (function(_super) {
    __extends(KinetekContent, _super);

    function KinetekContent() {
      _ref5 = KinetekContent.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    KinetekContent.prototype.url = "https://spreadsheets.google.com/feeds/list/0AmkZRXO39XOSdEZXV0hLRHlVVXRiVXFlYW5RYmt3TkE/od6/public/values?alt=json";

    return KinetekContent;

  })(Backbone.Model);

  $(document).ready(function() {
    var lb;
    lb = new KinetekLayout({
      el: "#main-content"
    });
    return lb.render();
  });

}).call(this);