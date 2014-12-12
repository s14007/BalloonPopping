// forked from tousei1125's "風船割り" http://jsdo.it/tousei1125/lrXM
// forked from tousei1125's "2014-10-02 4th" http://jsdo.it/tousei1125/lmGK
//初期化
enchant();

rand=function(n){
    return Math.floor(Math.random()*n);
}

//穴クラスの定義=Pit
Pit = Class.create(Sprite,{ //Spriteクラスを継承する
    initialize:function(x,y){
        enchant.Sprite.call(this,32,32); //Spriteクラスのコンストラクタ呼び出し
        this.image = game.assets['http://jsrun.it/assets/d/I/P/h/dIPh3.png'];
        this.x = x;
        this.y = y;
        this.addEventListener('enterframe',this.tick);
        this.addEventListener('touchstart',this.hit);
        this.mode=0;
    },

    tick:function(){
        this.frame++;
        if(this.frame>=0)this.frame=0;
        this.y -= 1;
    },

    hit:function(){
        this.parentNode.removeChild(this);
        scoreLabel.add(1);
    }


});//Pit_end


ScoreLabel = Class.create(Label,{ //Labelクラスを継承する
    initialize:function(x,y){
        enchant.Label.call(this,"SCORE:0"); //Labelクラスのコンストラクタ呼び出し
        this.x=x;
        this.y=24;
        this.score = 0;
        this.height = this.size = 20;
        this.font = this.size + "px Bold serif";
    },
           add:function(pts){ //スコアを加算
               this.score+=pts;
               this.text="SCORE:"+this.score; //表示を修正
           }
});

TimerLabel = Class.create(Label,{
    initialize:function(timelimit) {
        Label.call(this);
        this.x = 6;
        this.text = "TIME";
        this.height = this.size = 20
        this.font = this.size + "px Bold serif";
        this.color = "red";
        this.timer = 10;
        this.timelimit = timelimit +1;
        this.foreground;
        game.currentScene.addChild(this); 
    },
           countDown:function() {
               if(this.age % game.fps === 0) {
                   this.timer--;
               }
           },
           display:function() {
               this.text = "TIME:" + this.timer;
           },
           update:function() {
               this.countDown();
               this.display();
           },
           isLimitTime:function() {
               return (this.timer < this.timelimit);  
           },
           onenterframe:function() {
               this.update();
               if(this.isLimitTime()) {
                   game.end();
               }
           }
})

//初期化
window.onload = function(){
    game = new Game(320, 320);
    game.preload('http://jsrun.it/assets/d/I/P/h/dIPh3.png');//ドロイド君画像を読み込み
        game.preload('http://jsrun.it/assets/2/h/6/R/2h6RM.jpg');


    game.onload = function(){

        var bg = new Sprite(320, 320);
        bg.image = game.assets['http://jsrun.it/assets/2/h/6/R/2h6RM.jpg'];
        game.rootScene.addChild(bg);



        //スコアラベルを表示
        scoreLabel=new ScoreLabel(5,5);
        game.rootScene.addChild(scoreLabel);

        new TimerLabel(0);

        for(i=0;i<100;i++){
            var pit = new Pit(rand(300),rand(600));
            game.rootScene.addChild(pit);
        }
    }

    game.start();
}
