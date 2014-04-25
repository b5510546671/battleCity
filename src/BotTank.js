var BotTank = cc.Sprite.extend( {

	ctor: function( x, y, gameLayer ){
		this._super( );
		this.initWithFile( 'res/images/bot_tank_up.png' );

		this.direction = BotTank.DIR.UP;
        this.setPicture( this.direction );
		this.nextDirection = Math.floor( ( ( Math.random() * 100 ) % 4 ) + 1 );
        this.setPicture( this.nextDirection );
        
		this.pointingDirection = BotTank.DIR.UP;
        
        this.x = x;
		this.y = y;
		this.gameLayer = gameLayer;
		this.updatePosition( );
	},

	setPicture: function( dir ){
		switch( dir ){
			case BotTank.DIR.UP:
				this.initWithFile( 'res/images/bot_tank_up.png' );
				this.pointingDirection = BotTank.DIR.UP;
				break;
			case BotTank.DIR.DOWN:
				this.initWithFile( 'res/images/bot_tank_down.png' );
				this.pointingDirection = BotTank.DIR.DOWN;
				break;
			case BotTank.DIR.LEFT:
				this.initWithFile( 'res/images/bot_tank_left.png' );
				this.pointingDirection = BotTank.DIR.LEFT;
				break;
			case BotTank.DIR.RIGHT:
				this.initWithFile( 'res/images/bot_tank_right.png' );
				this.pointingDirection = BotTank.DIR.RIGHT;
				break;
		}
	},

	updatePosition: function( ){
		this.setPosition( new cc.Point( this.x, this.y ) );
	},

	setDirection: function( dir ){
		this.direction = dir;
		
	},

	setNextDirection: function( dir ){
		this.nextDirection = dir;
	},

	setMaze: function( maze ){
		this.maze = maze;
	},

	checkOverBounds: function( ){
		if( this.getPositionX( ) < 0 ){
			this.x = 800;
		}
		else if( this.getPositionX( ) > 800 ){
			this.x = 0;
		}
		else if( this.getPositionY( ) < 0 ){
			this.y = 600;
		}
		else if( this.getPositionY( ) > 600 ){
			this.y = 0;
		}
	},
    
    okToShoot: function() {
        
    },

    checkOverBounds: function( ){
		if( this.getPositionX( ) < 0 ){
			this.x = 800;
		}
		else if( this.getPositionX( ) > 800 ){
			this.x = 0;
		}
		else if( this.getPositionY( ) < 0 ){
			this.y = 600;
		}
		else if( this.getPositionY( ) > 600 ){
			this.y = 0;
		}
	},
    
    prepareToMove: function( ){
        
        if( this.isAtCenter( ) ){
            
			if( !this.isPossibleToMove( this.nextDirection ) ){
                this.nextDirection = ( new Date( ).getMilliseconds( ) % 4 ) + 1; 
				
                while( true ){
                    if( this.isPossibleToMove( this.nextDirection ) ){
                        break;   
                    }
                    this.nextDirection = ( new Date( ).getMilliseconds( ) % 4 ) + 1; 
                }            
			}
            
            else{
                
                if( this.gameLayer.count % 2 == 0 ){
                    this.nextDirection = ( new Date( ).getMilliseconds( ) % 4 ) + 1;
                    while( true ){
                        if( this.isPossibleToMove( this.nextDirection ) ){
                            break;   
                        }
                        this.nextDirection = ( new Date( ).getMilliseconds( ) % 4 ) + 1; 
                    }   
                }
            }
                
            this.setPicture( this.nextDirection );
            this.direction = this.nextDirection;
		}  
    },
    
    move: function( ){
        switch( this.direction ){
			case BotTank.DIR.UP:
				this.y += BotTank.MOVE_STEP;
				break;
			case BotTank.DIR.DOWN:
				this.y -= BotTank.MOVE_STEP;
				break;
			case BotTank.DIR.RIGHT:
				this.x += BotTank.MOVE_STEP;
				break;
			case BotTank.DIR.LEFT:
				this.x -= BotTank.MOVE_STEP;
				break;
		}
    },
    
	update: function( dt ){
        
        this.checkCollisionWithTank( );
        
        this.prepareToMove( );

		this.checkOverBounds( );

		this.move( );
        
		this.updatePosition( );
        
	},


	isAtCenter: function( ){
		return ( ( this.x + 20 ) % 40 == 0 ) && ( ( this.y + 20 ) % 40 == 0 );
	},

	getNextBlock: function( dir ){
        var nextBlockX = ( this.x - 20 ) / 40;
		var nextBlockY = ( this.y - 20 ) / 40;

        switch( dir ){
            case Tank.DIR.UP:
                nextBlockY += 1;
                break;
            case Tank.DIR.DOWN:
                nextBlockY -= 1;
                break;
            case Tank.DIR.LEFT:
                nextBlockX -= 1;
                break;
            case Tank.DIR.RIGHT:
                nextBlockX += 1;
                break;
        }
        return [nextBlockX, nextBlockY];
                
    },

	isPossibleToMove: function( dir ){
		if( dir == Tank.DIR.STILL ){
			return true;
		}
        
		return !this.maze.isObstacles( this.getNextBlock( dir ) );
	},

	shoot: function( ){
        if (new Date( ).getTime( ) - this.lastShoot >= 600) {
            this.lastShoot = new Date().getTime();
            
            if ( this.isAtCenter( ) ){
              this.gameLayer.shoot( this.x, this.y, this.pointingDirection );
            }
        }
	},
    
    isHurt: function( bullet ){
        var botBlockX = ( this.x - 20 ) / 40;
		var botBlockY = ( this.y - 20 ) / 40;
        
        var bulletBlockX = ( bullet.getXPosition( ) - 20 ) / 40;
		var bulletBlockY = ( bullet.getYPosition( ) - 20 ) / 40;
        
        return ( botBlockX == bulletBlockX  && botBlockY == bulletBlockY );
        
    },
    //TODO FIX BUGS when collide. In this case, we check whether the center of bot bot and player equal to each other. But we should check  object as a whole NOT just the center of the object. To do this, we should make the check point larger to be as a whole tank object. Thus, figure out how to do this.
    isBotAndPlayerInSamePosition: function( ){
        var playerTankBlockX = ( this.gameLayer.tank.getPositionX( ) - 20 ) / 40;
        var playerTankBlockY = ( this.gameLayer.tank.getPositionY( ) - 20 ) / 40;
        var botBlockX = ( this.x - 20 ) / 40;
		var botBlockY = ( this.y - 20 ) / 40;
        
        return ( botBlockX == playerTankBlockX  && botBlockY == playerTankBlockY );
    },
    
    checkCollisionWithTank: function( ){
        if( this.isBotAndPlayerInSamePosition( ) ){
            this.gameLayer.gameOver( );   
        }
    },

} );

BotTank.MOVE_STEP = 5;
BotTank.DIR = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4,
	STILL: 0
};