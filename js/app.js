(function (){

  $(function(){

    //configure marionette template compilation
    Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate, options) {
      // use Handlebars.js to compile the template
      return Handlebars.compile(rawTemplate);
    };

    Handlebars.registerHelper('formatCurrency', function(number){
      return numeral(number).format('0,0.00');
    });

    Handlebars.registerHelper('formatNumber', function(number, format){
      return numeral(number).format(format);
    });

    var app = new Mn.Application();

    var globalCh = Backbone.Wreqr.radio.channel('global');

    var data = {
      choices: [
        {
          id: 1,
          name: "Plan 1",
          description: "Plan option 1",
          type: "plan",
          cost: 1000,
          carbon: 20494,
          hasModel: true,
          project: PROJECTS.GROUND_FLOOR[0],
          optionId: 0
        },
        {
          id: 2,
          name: "Plan 2",
          description: "Plan option 2",
          type: "plan",
          cost: 1200,
          carbon: 20494,
          hasModel: true,
          project: PROJECTS.GROUND_FLOOR[1],
          optionId: 1
        },
        {
          id: 3,
          name: "Roof 1",
          description: "Roof option 1",
          type: "roof",
          cost: 2300,
          carbon: 20393,
          hasModel: true,
          project: PROJECTS.ROOF[0],
          optionId: 0
        },
        {
          id: 4,
          name: "Roof 2",
          description: "Roof option 2",
          type: "roof",
          cost: 2139,
          carbon: 19348,
          hasModel: true,
          project: PROJECTS.ROOF[1],
          optionId: 1
        },
        {
          id: 5,
          name: "Windows 1",
          description: "Windows option 1",
          type: "window",
          cost: 1000,
          carbon: 12398,
          hasModel: false,
          optionId: 0
        },
        {
          id: 6,
          name: "Windows 2",
          description: "Windows option 2",
          type: "window",
          cost: 1200,
          carbon: 22398,
          hasModel: false,
          optionId: 0
        }
      ]
    };

    var designChoices = new Backbone.Collection(data.choices, {parse: true});
    var myDesignChoices = new Backbone.Collection();
    myDesignChoices.add(designChoices.get(1));

    var planChoices = new Backbone.Collection(designChoices.where({type: "plan"}), {parse: true});
    var roofChoices = new Backbone.Collection(designChoices.where({type: "roof"}), {parse: true});
    var windowChoices = new Backbone.Collection(designChoices.where({type: "window"}), {parse: true});

    var collectionTabMap = {
      'plan': planChoices,
      'roof': roofChoices,
      'window': windowChoices
    };

    var OptionView = Backbone.Marionette.ItemView.extend({
      template: '#option-template',
      triggers: {
        'click input': {
          event: 'option:select',
          preventDefault: false
        }
      },
      serializeData: function(){
        var data = this.model.toJSON();
        data.isSelected = this.getOption('isSelected');
        return data;
      }
    });

    var OptionsView = Backbone.Marionette.CollectionView.extend({
      childView: OptionView,
      childEvents: {
        'option:select': 'optionSelected'
      },
      childViewOptions: function(model){
        return {
          model: model,
          isSelected: this.getOption('selectedOption') == model
        };
      },
      optionSelected: function(args){
        this.trigger('optionSelected', args.model);
      }
    });

    var ChoiceInfoView = Backbone.Marionette.ItemView.extend({
      template: '#choice-info-template'
    });

    var SummaryView = Backbone.Marionette.ItemView.extend({
      template: '#summary-template',
      collectionEvents: {
        add: 'render'
      },
      serializeData: function(){
        var data = {
          cost: 0,
          carbon: 0
        };
        this.collection.each(function(option){
          data.cost += option.get('cost');
          data.carbon += option.get('carbon');
          data[option.get('type')] = option.toJSON();
        });

        return data;
      }
    });

    var MainView = Backbone.Marionette.LayoutView.extend({
      el: "#main",
      template: false,
      regions: {
        optionsRegion: '#options-panel',
        viewerRegion: '#viewer',
        choiceInfoRegion: '#choice-info',
        summaryRegion: '#summary-panel'
      },
      ui: {
        'nextBtn': 'button.next-btn'
      },
      events: {
        'click .nav-tabs a': function(e){
          this.tabSelected($(e.currentTarget).attr('data-tab'));
        },
        'click @ui.nextBtn': 'selectNextTab'
      },
      selectNextTab: function(){
        var nextTabMap = {
          'plan': 'roof',
          'roof': 'window'
        };
        var nextTab = nextTabMap[this.selectedTab];
        this.$(".nav-tabs a[data-tab='" + nextTab + "']").click();
      },
      tabSelected: function(tab){
        this.selectedTab = tab;
        var selectedOption = myDesignChoices.find(function(option){
          return option.get('type') == tab;
        });

        if (!selectedOption) {
          selectedOption = designChoices.find(function(option){
            return option.get('type') == tab;
          });
          this.optionSelected(selectedOption);
        }

        this.choiceInfoRegion.show(new ChoiceInfoView({model: selectedOption}));

        var optionsView = new OptionsView({
          collection: collectionTabMap[tab],
          selectedOption: selectedOption
        });
        this.optionsRegion.show(optionsView);
        this.listenTo(optionsView, 'optionSelected', this.optionSelected);
        focus = tabToFocus(tab);
        if (window.threedView) {
          update();
          setCamera();
        }

        this.ui.nextBtn.prop('disabled', tab == 'window');
        
      },
      optionSelected: function(option){
        this.choiceInfoRegion.show(new ChoiceInfoView({model: option}));
        var sameTypeChoices = myDesignChoices.filter(function(choice){
          return choice.get('type') == option.get('type');
        });
        myDesignChoices.remove(sameTypeChoices);
        myDesignChoices.add(option);

        var planChoice = myDesignChoices.find(function(option){
          return option.get('type') == 'plan';
        });
        options[0] = planChoice ? planChoice.get('optionId') : 0;
        var roofChoice = myDesignChoices.find(function(option){
          return option.get('type') == 'roof';
        });
        options[2] = roofChoice ? roofChoice.get('optionId') : 0;
        var windowChoice = myDesignChoices.find(function(option){
          return option.get('type') == 'window';
        });
        options[1] = windowChoice ? windowChoice.get('optionId') : 0;

        focus = tabToFocus(option.get('type'));
        update();
      },
      onRender: function(){
        this.summaryRegion.show(new SummaryView({collection: myDesignChoices}));
        this.tabSelected('plan');
      }
    });

    app.mainView = new MainView();
    app.on('start', function(){
      app.mainView.render();
    });

    app.start();
  });

  function tabToFocus(tab) {
    return {
      'plan': 0,
      'roof': 2,
      'window': 1
    }[tab];
  }

  var focus = 0;
  var options = [0, 0, 0];

  function choose(choice) {
    options[focus] = choice;
    update()
  }

  function update() {
    if (options[0] == 0) {
      threedView.showProject(PROJECTS.GROUND_FLOOR[0]);
      threedView.hideProject(PROJECTS.GROUND_FLOOR[1]);
    } else if (options[0] == 1) {
      threedView.hideProject(PROJECTS.GROUND_FLOOR[0]);
      threedView.showProject(PROJECTS.GROUND_FLOOR[1]);
    } else {
      threedView.hideProject(PROJECTS.GROUND_FLOOR[0]);
      threedView.hideProject(PROJECTS.GROUND_FLOOR[1]);
    }

    if (focus >= 1) {
      if (options[1] == 0) {
        threedView.showProject(PROJECTS.FIRST_FLOOR[0]);
      } else {
        threedView.hideProject(PROJECTS.FIRST_FLOOR[0]);
      }
    } else {
      threedView.hideProject(PROJECTS.FIRST_FLOOR[0]);
    }

    if (focus >= 1) {
      if (options[2] == 0) {
        threedView.showProject(PROJECTS.ROOF[0]);
        threedView.hideProject(PROJECTS.ROOF[1]);
      } else if (options[2] == 1) {
        threedView.hideProject(PROJECTS.ROOF[0]);
        threedView.showProject(PROJECTS.ROOF[1]);
      } else {
        threedView.hideProject(PROJECTS.ROOF[0]);
        threedView.hideProject(PROJECTS.ROOF[1]);
      }
    } else {
      threedView.hideProject(PROJECTS.ROOF[0]);
      threedView.hideProject(PROJECTS.ROOF[1]);
    }
  }

  function setCamera() {
    if (focus == 1) {
      threedView.setCamera({x: -10000, y: 0, z: 0}, {x: 0.98, y: 0, z: -0.2}, 10000);
    } else {
      threedView.setCamera({x: -2000, y: 0, z: 10000 + focus * 3000}, {x: 0.2, y: 0, z: -0.98}, 16000);
    }
  }

  Global.onInitialized = function() {
    threedView = new ThreeDView($("#threedview"));
    threedView.load().done(function() {
      threedView.loadProject(PROJECTS.GROUND_FLOOR[0]);
      threedView.loadProject(PROJECTS.GROUND_FLOOR[1]);
      threedView.loadProject(PROJECTS.FIRST_FLOOR[0]);
      threedView.loadProject(PROJECTS.ROOF[0]);
      threedView.loadProject(PROJECTS.ROOF[1]);
      update();
      window.setTimeout(function() {
        setCamera();
      }, 1000);
    });
  }
})();
