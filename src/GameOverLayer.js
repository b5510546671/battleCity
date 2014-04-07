var GameOverLayer = cc.LayerColor.extend({

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super( new cc.Color4B( 0, 0, 0, 0 ) );
        this.setOpacity( 100 );
        this.setPosition( new cc.Point( 0, 0 ) );
    },
    
});