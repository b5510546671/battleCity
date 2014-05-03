var GameOverLayer = cc.LayerColor.extend({

    ctor:function ( score ) {
        this._super( );
        
        this.score = score;
        this.init( );
    },

    init:function ( ) {
        this._super( new cc.Color4B( 0, 0, 0, 0 ) );
        this.setOpacity( 100 );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.gameOverLabel = cc.LabelTTF.create( 'GAME OVER!', 'Arial', 60 );
        this.gameOverLabel.setPosition( new cc.Point( 10*40 + 20, 6*40 + 120 ) );
        
        this.scoreWordLabel = cc.LabelTTF.create( 'SCORES : ', 'Arial', 60 );
        this.scoreWordLabel.setPosition( new cc.Point( 7*40 , 6*40 + 20 ) );
        
        this.scoreLabel = cc.LabelTTF.create( this.score.toString(), 'Arial', 60 );
        this.scoreLabel.setPosition( new cc.Point( 14*40, 6*40 + 20 ) );
        this.addChild( this.scoreLabel );
        
        this.addChild( this.gameOverLabel );
        this.addChild( this.scoreWordLabel );

    },
    
});