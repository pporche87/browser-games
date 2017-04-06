var game = {
  level: 1,
  turn: 0,
  difficulty: 1,
  score: 0,
  active: false,
  handler: false,
  shape: ".shape",
  generatedSequence: [],
  playSequence: [],

  init: function(){
    if(this.handler === false){
      this.initPadHandler();
      this.handler = true;
    }
    this.newGame();
  },

  initPadHandler: function(){
    that = this;
    $(".pad").on("mouseup", function(){
      if(that.active === true){
        var pad = parseInt($(this).data("pad"), 10);
        that.flash($(this), 1, 300, pad);
      }
    });
    this.handler = true;
  },

  newGame: function(){
    this.level = 1;
    this.score = 0;
    this.newLevel();
    this.displayLevel();
    this.displayScore();
  },

  newLevel: function(){
    this.generatedSequence.length = 0;
    this.playSequence.length = 0;
    this.pos = 0;
    this.turn = 0;
    this.active = true;
    this.randomizePad(this.level);
    this.displaySequence();
  },

  flash: function(element, times, speed, pad){
    console.log("this is in the flash function",element[0]);
    var that = this;
    if(times > 0){
      that.playSound(pad);
      element.stop().animate({opacity: "1"}, {
        duration: 50,
        complete: function(){
        element.stop().animate({opacity: 0.6}, 200);
        }
      });
    }
    if(times > 0){
      setTimout(function(){
        that.flash(element, times, speed, pad);
      }, speed);
      times -= 1;
    }
  },

  playSound: function(clip){
    var sound = $(".sound" + clip)[0]
    sound.currentTime = 0;
    sound.play();
  },

  randomizePad: function(passes){
    for(var i = 0; i < passes; i++){
      this.generatedSequence.push(Math.floor(Math.random() * 4) + 1);
    }
  },

  logPlayerSequence: function(pad){
    this.playSequence.push(pad);
    this.checkSquence(pad);
  },

  checkSquence: function(pad){
    that = this;
    if(pad !== this.generatedSequence[thisturn]){
      this.incorrectSequence();
    } else {
      this.keepScore();
      this.turn++;
    }
    if(this.turn === this.generatedSequence.length){
      this.level++;
      this.displayLevel();
      this.active = false;
      setTimeout(function(){
        that.newLevel();
      }, 1000);
    }
  },

  displaySequence: function(){
    var that = this;
    $.each(this.generatedSequence, function(index, val){
      setTimeout(function(){
        that.flash($(that.shape + val), 1, 300, val);
      }, 500 * index * that.difficulty);
    });
  },

  displayLevel: function(){
    $(".level h2").text("Level: " + this.level);
  },

  displayScore: function(){
    $(".score h2").text("Score: " + this.score);
  },

  keepScore: function(){
    var multiplier = 0;
    switch (this.difficulty)
    {
      case "1":
        multiplier = 1
        break;
      case "2":
        multiplier = 2
        break;
      case "3":
        multiplier = 3
        break;
      case "4":
        multiplier = 4
        break;
    }
    this.score += (1 * multiplier);
    this.displayScore();
  },

  incorrectSequence: function(){
    var corPad = this.generatedSequence[this.turn];
    that = this;
    this.active = false;
    this.displayLevel();
    this.displayScore();
    setTimeout(function(){
      that.flash($(that.shape + corPad), 4, 300, corPad)
    }, 500);
    $(".start").show();
    $(".difficulty").show();
  }
}

$(document).ready(function(){
  $(".start").on("mouseup", function(){
    $(this).hide();
    game.difficulty = $("input[name=difficulty]:checked").val();
    $(".difficulty").hide();
    game.init();
  });
});
