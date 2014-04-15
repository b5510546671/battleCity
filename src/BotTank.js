var BotTank = cc.Sprite.extend( {

	ctor: function( x, y, gameLayer ){
		this._super( );
		this.initWithFile( 'res/images/plane.png' );

		this.direction = BotTank.DIR.UP;
        this.setPicture( this.direction );
		this.nextDirection = Math.floor( ( ( Math.random() * 100 ) % 4 ) + 1 );
        this.setPicture( this.nextDirection );
        console.log( this.direction );
        console.log( this.nextDirection );

		this.pointingDirection = BotTank.DIR.UP;

                
		this.x = x;
		this.y = y;
		this.gameLayer = gameLayer;
		this.updatePosition( );
	},

	setPicture: function( dir ){
		switch( dir ){
			case BotTank.DIR.UP:
				this.initWithFile( 'res/images/plane.png' );
				this.pointingDirection = BotTank.DIR.UP;
				break;
			case BotTank.DIR.DOWN:
				this.initWithFile( 'res/images/plane_down.png' );
				this.pointingDirection = BotTank.DIR.DOWN;
				break;
			case BotTank.DIR.LEFT:
				this.initWithFile( 'res/images/plane_left.png' );
				this.pointingDirection = BotTank.DIR.LEFT;
				break;
			case BotTank.DIR.RIGHT:
				this.initWithFile( 'res/images/plane_right.png' );
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
				this.nextDirection = Math.floor( ( ( Math.random() * 100 ) % 4 ) + 1 );
                
                while( true ){
                    if( this.isPossibleToMove( this.nextDirection ) ){
                        break;   
                    }
                    
                    this.nextDirection = Math.floor( ( ( Math.random() * 100 ) % 4 ) + 1 );
                    
                }
                
                
                
			}
            
            else{
                
                if( this.gameLayer.count % 2 == 0 ){
                    this.nextDirection = Math.floor( ( ( Math.random() * 100 ) % 4 ) + 1 );
                
                    while( true ){
                        if( this.isPossibleToMove( this.nextDirection ) ){
                            break;   
                        }
                    
                        this.nextDirection = Math.floor( ( ( Math.random() * 100 ) % 4 ) + 1 );
                    
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
        
		return !this.maze.isWall( this.getNextBlock( dir ) );
	},

	shoot: function(){
        if (new Date().getTime() - this.lastShoot >= 600) {
            this.lastShoot = new Date().getTime();
            
            //console.log( "FOR TANK " + this.x + " , " + this.y );
            if ( this.isAtCenter( ) ){
              this.gameLayer.shoot( this.x, this.y, this.pointingDirection );
            }
        }
	}


} );

BotTank.MOVE_STEP = 5;
BotTank.DIR = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4,
	STILL: 0
};