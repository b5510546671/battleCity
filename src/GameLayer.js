var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.maze = new Maze( );
        this.maze.setPosition( new cc.Point (0, 40) );
        this.addChild( this.maze );

        this.tank = new Tank( 10*40 + 20, 6*40 + 20 );
        this.maze.addChild( this.tank );
        
        this.tank.setMaze( this.maze );

        this.tank.scheduleUpdate( );

        this.setKeyboardEnabled( true );

        return true;
    },

    onKeyDown: function( e ){
        switch( e ){
            case cc.KEY.left:
                this.tank.setDirection( Tank.DIR.LEFT );
                break;
            case cc.KEY.right:
                this.tank.setDirection( Tank.DIR.RIGHT );
                break;
            case cc.KEY.up:
                this.tank.setDirection( Tank.DIR.UP );
                break;
            case cc.KEY.down:
                this.tank.setDirection( Tank.DIR.DOWN );
                break;
        }
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

