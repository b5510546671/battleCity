var GameLayer = cc.LayerColor.extend({
    init: function( ) {
        this._super( new cc.Color4B( 0, 0, 0, 0 ) );
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
        
        this.createBotTank( 9, 9 );
        this.createBotTank( 1, 10 );
        this.createBotTank( 18, 10 );
        
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
        
        this.lastFire = new Date( ).getTime( );
        
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
            if( this.count % 5 == 0 || this.botTanks.length == 0 ){
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
    
    isBulletHitBotTank: function( i, j ){
        var bulletBlockX = ( this.bullets[i].x - 20 ) / 40;
        var bulletBlockY = ( this.bullets[i].y - 20 - 40 ) / 40;
        var botTankBlockX = ( this.botTanks[j].x - 20 ) / 40;
        var botTankBlockY = ( this.botTanks[j].y - 20 ) / 40;
        return ( Math.abs( bulletBlockX - botTankBlockX ) < 1 && Math.abs( bulletBlockY - botTankBlockY ) < 1 );
    },
    
    checkShootBotTank: function( ){
        for( var i = 0; i < this.bullets.length; i++ ){
            for( var j = 0; j < this.botTanks.length; j++ ){
                try{
                    if( this.bullets[i].isAtCenter( ) && this.bullets.length > 0 ){
                        
                        if( this.isBulletHitBotTank( i, j ) ){
                            this.maze.removeChild( this.botTanks[j] );
                            this.removeChild( this.bullets[i] );
                            this.editPoints( 100 );
                            this.removeElement( this.bullets, this.bullets[i] );
                            this.removeElement( this.botTanks, this.botTanks[j] );
                            i = 0;
                        }
                        else {
                            if( this.bullets[i].isAtCenter( ) ){
                                if( !this.bullets[i].isPossibleToMove( this.bullets[i].pointingDirection ) ){
                                    this.removeChild( this.bullets[i] );
                                }
                            }
                        }
                    }
                }
                catch( err ){
                    console.log(i + ' & ' + this.bullets.length  );
                    alert( err.message );
                }
            }
        }
    },
    
    update: function( ) {
        this.checkShootBotTank( );        
    },
    
    removeElement: function(list, data) {
        var index = list.indexOf(data);
        if ( index > -1 ){
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
                if( new Date( ).getTime( ) - this.lastFire >= 300 ){
                    this.tank.shoot( );
                }
                break;
        }
    },
    
    onKeyUp: function( e ){
        this.tank.setNextDirection( Tank.DIR.STILL );
    },
    
    shoot: function( x, y, pointingDirection ){
        this.lastFire = new Date( ).getTime( );
        var bullet = new Bullet( x, y, pointingDirection, this.maze, this );
        this.scheduleOnce( function( ){
            this.removeChild( bullet );
            this.bullets.shift( );
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

