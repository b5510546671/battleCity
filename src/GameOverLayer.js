var GameOverLayer = cc.LayerColor.extend({

    ctor:function ( ) {
        this._super( );
        this.init( );
    },

    init:function ( ) {
        this._super( new cc.Color4B( 0, 0, 0, 0 ) );
        this.setOpacity( 100 );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.gameOverLabel = cc.LabelTTF.create( 'GAME OVER!', 'Arial', 60 );
        this.gameOverLabel.setPosition( new cc.Point( 10*40 + 20, 6*40 + 120 ) );
        
        this.scoreLabel = cc.LabelTTF.create( 'SCORES : ', 'Arial', 60 );
        this.scoreLabel.setPosition( new cc.Point( 10*40 , 6*40 + 20 ) );
        
        
        this.addChild( this.gameOverLabel );
        this.addChild( this.scoreLabel );

    },
    
});