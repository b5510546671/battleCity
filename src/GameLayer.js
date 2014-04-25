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
        
        this.botTanks = [];
        this.bullets = [];
        
        ////BOT TANK
        this.createBotTank( 9, 9 );
        this.createBotTank( 1, 10 );
        this.createBotTank( 18, 10 );
        
//        ///Initializes three bot tank when game starts
//        this.btank1 = new BotTank( 9*40 + 20, 9*40 + 20, this );
//        this.btank1.setMaze( this.maze );
//        //this.btank1.setNextDirection(BotTank.DIR.UP);
//        this.btank1.scheduleUpdate( );
//        this.maze.addChild( this.btank1 );
//        
//        this.btank2 = new BotTank( 1*40 + 20, 10*40 + 20, this );
//        this.btank2.setMaze( this.maze );
//        //this.btank2.setNextDirection(BotTank.DIR.UP);
//        this.btank2.scheduleUpdate( );
//        this.maze.addChild( this.btank2 );
//        
//        this.btank3 = new BotTank( 18*40 + 20, 10*40 + 20, this );
//        this.btank3.setMaze( this.maze );
//        //this.btank3.setNextDirection(BotTank.DIR.UP);
//        this.btank3.scheduleUpdate( );
//        this.maze.addChild( this.btank3 );
//        ////
        
        this.setKeyboardEnabled( true );
        this.scheduleUpdate();
        
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( '000', 'Arial', 32 );
        this.scoreLabel.setPosition( new cc.Point( 750, 14 * 40 + 15 ) );
        this.addChild( this.scoreLabel );
        
        this.scoreWordLabel = cc.LabelTTF.create( 'Score: ', 'Arial', 32 );
        this.scoreWordLabel.setPosition( new cc.Point( 650, 14 * 40 + 15 ) );
        this.addChild( this.scoreWordLabel );

        this.count = 100;
        this.timeLabel = cc.LabelTTF.create( '100', 'Arial', 32 );
        this.timeLabel.setPosition( new cc.Point( 100, 14 * 40 + 15 ) );
        this.addChild( this.timeLabel );
        
        this.schedule( function( ){
            if( this.count == 1 ){
                this.gameOver( );
            }
            this.count -= 1;
            this.timeLabel.setString( this.count );
        }, 1 );
        
        this.decideToCreateBotTank( );

        return true;
    },
    
    updateScoreLabel: function( ){
        this.scoreLabel.setString( this.score );  
    },    
    
    createBotTank: function( xPosit, yPosit  ) {
        var btank = new BotTank( xPosit*40 + 20, yPosit*40 + 20, this );
        btank.setMaze( this.maze );
        this.maze.addChild( btank );
        btank.scheduleUpdate( );
        this.botTanks.push( btank );
    },
    
    decideToCreateBotTank: function( ){
        this.schedule( function( ){
            if( this.count % 5 == 0 ){
                var randomNum = new Date( ).getMilliseconds( );
                var botTankLocationArr = this.decideBotTankBirthLocation( randomNum % 7 );
                var xPosit = botTankLocationArr[0];
                var yPosit = botTankLocationArr[1];
                this.createBotTank(xPosit, yPosit);   
            }
        }, 1 );
    },
    
    decideBotTankBirthLocation: function( randomNumModSeven ){
        var xPosit = 0;
        var yPosit = 0;
        switch( randomNumModSeven ){
            case 0:
                xPosit = 1;
                yPosit = 12;
                break;
            case 1:
                xPosit = 10;
                yPosit = 11;
                break;
            case 2:
                xPosit = 18;
                yPosit = 12;
                break;
            case 3:
                xPosit = 1;
                yPosit = 6;
                break;
            case 4:
                xPosit = 18;
                yPosit = 6;
                break;
            case 5:
                xPosit = 1;
                yPosit = 0;
                break;
            case 6:
                xPosit = 18;
                yPosit = 0;
                break;
        }
        return [xPosit, yPosit];
    },
    
//    checkTanksCollision: function( ){
//        var playerTankX = this.tank.getPositionX( );
//        var playerTankY = this.tank.getPositionY( );
//        
//        
//    },
    
    update: function() {
        
        for (var i = 0; i < this.bullets.length; i++) {
            for (var j = 0; j < this.botTanks.length; j++) {
                if (this.bullets[i].isAtCenter( )) {
//                    var bullBlockX = Math.round((this.bullets[i].x - 20 ) / 40);
//                    var bullBlockY = Math.round((this.bullets[i].y - 20 + 40 ) / 40);
//                    var tankBlockX = Math.round((this.botTanks[j].x - 20 ) / 40);
//                    var tankBlockY = Math.round((this.botTanks[j].y - 20 + 40 ) / 40);
//                    
//                    
//                    if (bullBlockX == tankBlockX && bullBlockY == tankBlockY) {
//                    console.log(bullBlockX + " " + bullBlockY + " " + tankBlockX + " " + tankBlockY);
//                        this.removeChild(this.bullets[i]);
//                        this.removeChild(this.botTanks[i]);
//                        this.removeElement(this.bullets, this.bullets[i]);
//                        this.removeElement(this.botTanks, this.botTanks[j]);
//                    }
//                    else {
                        if( this.bullets[i].isAtCenter( ) ){
                            if( !this.bullets[i].isPossibleToMove( this.bullets[i].pointingDirection ) ){
                                //REMOVE THAT BULLET FROM SCREEN
                                this.removeChild( this.bullets[i] );
                                //console.log( 'bullet will be removed from this screen ' );
                            }
                        }
//                    }
                }
            }
        }
    },
    
    removeElement: function(list, data) {
        var index = list.indexOf(data);
        if (index > -1) {
            list.splice(index, 1);
        }
    },

    countdown: function( ){
        this.timeLabel -= 1;
        this.timeLabel.setString( this.timeLabel );
    },
    
    editPoints: function( points ){
        this.score += points;
        this.updateScoreLabel( );
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
        var bullet = new Bullet( x, y, pointingDirection, this.maze, this );
        this.scheduleOnce( function( ){
            this.removeChild( bullet );
        }, 2 );
        this.bullets.push(bullet);
        this.addChild( bullet );
        bullet.scheduleUpdate( );
    },
    
    pauseBotTanks: function( seconds ){
        var endTime = this.count - seconds;
        
        for( var i = 0; i < this.botTanks.length; i++ ){
            this.botTanks[i].unscheduleUpdate( );   
        }
        
        this.schedule( function( ){
            if( this.count == endTime ){
                for( var i = 0; i < this.botTanks.length; i++ ){
                    this.botTanks[i].scheduleUpdate( );   
                }
            }
        }, 1);
    },

    gameOver: function( ){
        var gameOver = new GameOverLayer( this.score );
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

