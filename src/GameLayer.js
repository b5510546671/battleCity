var GameLayer = cc.LayerColor.extend({
    init: function( ) {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.maze = new Maze( );
        this.maze.setPosition( new cc.Point (0, 40) );
        this.addChild( this.maze );

        this.tank = new Tank( 10*40 + 20, 6*40 + 20, this );
        this.tank.setMaze( this.maze );
        this.tank.scheduleUpdate( );
        this.maze.addChild( this.tank );
        
        ////
        this.btank = new BotTank( 9*40 + 20, 9*40 + 20, this );
        this.btank.setMaze( this.maze );
        //this.btank.setNextDirection(BotTank.DIR.UP);
        this.btank.scheduleUpdate( );
        this.maze.addChild( this.btank );
        ////
        
        this.setKeyboardEnabled( true );

        this.count = 60;
        this.timeLabel = cc.LabelTTF.create( '60', 'Arial', 32 );
        this.timeLabel.setPosition( new cc.Point( 100, 14 * 40 + 15 ) );
        this.addChild( this.timeLabel );
        
        this.schedule( function( ){
            if( this.count == 1 ){
                this.gameOver( );
            }
            this.count -= 1;
            this.timeLabel.setString( this.count );
        }, 1 );

        return true;
    },

    countdown: function( ){
        this.timeLabel -= 1;
        this.timeLabel.setString( this.timeLabel );
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
    
    onKeyUp: function( e ){
        this.tank.setNextDirection( Tank.DIR.STILL );
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

    gameOver: function( ){
        var gameOver = new GameOverLayer( );
        this.setKeyboardEnabled( false );
        this.getScheduler( ).unscheduleAllCallbacks( );
        this.addChild( gameOver );
    },
});

var StartScene = cc.Scene.extend({
    onEnter: function( ) {
        this._super( );
        var layer = new GameLayer( );
        layer.init( );
        this.addChild( layer );
    }
});

