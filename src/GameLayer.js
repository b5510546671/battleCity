var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.maze = new Maze( );
        this.maze.setPosition( new cc.Point (0, 40) );
        this.addChild( this.maze );

        this.tank = new Tank( 10*40 + 20, 6*40 + 20, this );
        this.maze.addChild( this.tank );
        
        this.tank.setMaze( this.maze );



        this.tank.scheduleUpdate( );

        this.setKeyboardEnabled( true );

        return true;
    },

    onKeyDown: function( e ){
        switch( e ){
            case cc.KEY.left:
                this.tank.setNextDirection( Tank.DIR.LEFT );
                this.tank.setPicture( Tank.DIR.LEFT );
                break;
            case cc.KEY.right:
                this.tank.setNextDirection( Tank.DIR.RIGHT );
                this.tank.setPicture( Tank.DIR.RIGHT );
                break;
            case cc.KEY.up:
                this.tank.setNextDirection( Tank.DIR.UP );
                this.tank.setPicture( Tank.DIR.UP );
                break;
            case cc.KEY.down:
                this.tank.setNextDirection( Tank.DIR.DOWN );
                this.tank.setPicture( Tank.DIR.DOWN );
                break;
            case cc.KEY.space:
                this.tank.shoot();
                break;
        }
    },

    shoot: function( x, y, pointingDirection ){
        //console.log('shoot in GameLayer is done');
        var bullet = new Bullet( x, y, pointingDirection, this.maze, this );
        this.scheduleOnce( function( ){
            //console.log( 'removeChild is called' );
            this.removeChild( bullet );
        }, 2 );
       
        this.addChild( bullet );
        bullet.scheduleUpdate( );
    },

    

    onKeyUp: function( e ){
        this.tank.setNextDirection( Tank.DIR.STILL );
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

