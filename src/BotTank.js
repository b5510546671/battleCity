var BotTank = cc.Sprite.extend( {

	ctor: function( x, y, gameLayer ){
		this._super( );
		this.initWithFile( 'res/images/plane.png' );

		this.direction = BotTank.DIR.STILL;
		this.nextDirection = BotTank.DIR.STILL;

		this.pointingDirection = BotTank.DIR.UP;

        this.lastShoot = new Date().getTime();
        
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
        if (this.gameLayer.tank.getPositionX() == this.getPositionX()) {
            console.log("x == x");
            var blockY = ( this.y + 20 ) / 40;
            var tankBlockY = ( this.gameLayer.tank.getPositionY() + 20 ) / 40;
            var start = blockY <= tankBlockY ? blockY : tankBlockY;
            var end = start == blockY ? tankBlockY : blockY;
            for (start; start < end; start++) {
                if (this.gameLayer.maze.isWall(Math.round((this.getPositionX() + 20) / 40), Math.round(start))) {
                    return false;   
                }   
            }
            return true;
        }
        else {
            console.log("y == y");
            var blockX = ( this.x + 20 ) / 40;
            var tankBlockX = ( this.gameLayer.tank.getPositionX() + 20 ) / 40;
            var start = blockX <= tankBlockX ? blockX : tankBlockX;
            var end = start == blockX ? tankBlockX : blockX;
            for (start; start < end; start++) {
                if (this.gameLayer.maze.isWall(Math.round(start), Math.round((this.getPositionY() + 20) / 40))) {
                    return false;   
                } 
            }
            return true;
        }
    },

	update: function( dt ){
        
        //if (!this.isPossibleToMove() || this.nextDirection == BotTank.DIR.STILL) {
        //    this.nextDirection = Math.round(Math.random() * 4) + 1;
        //}
        
        // shoot
        if (this.gameLayer.tank.getPositionX() == this.getPositionX()) {
            console.log(this.okToShoot( ));
            if (this.okToShoot( )) {
                 if (this.gameLayer.tank.getPositionY() - this.getPositionY() > 0) {
                    this.setDirection( BotTank.DIR.UP );
                    this.setPicture( BotTank.DIR.UP );
                }
                else if (this.gameLayer.tank.getPositionY() - this.getPositionY() < 0) {
                    this.setDirection( BotTank.DIR.DOWN );
                    this.setPicture( BotTank.DIR.DOWN ); 
                }
                this.shoot();
            }
        }
        
        if (this.gameLayer.tank.getPositionY() == this.getPositionY()) {
            console.log(this.okToShoot( ));
            if (this.okToShoot( )) {
                if (this.gameLayer.tank.getPositionX() - this.getPositionX() > 0) {
                    this.setDirection( BotTank.DIR.RIGHT );
                    this.setPicture( BotTank.DIR.RIGHT );
                }
                else if (this.gameLayer.tank.getPositionX() - this.getPositionX() < 0) {
                    this.setDirection( BotTank.DIR.LEFT );
                    this.setPicture( BotTank.DIR.LEFT ); 
                }
                this.shoot();
            }
        }
        
		if( this.isAtCenter( ) ){
			if( !this.isPossibleToMove( this.nextDirection ) ){
				this.nextDirection = BotTank.DIR.STILL;
			}

			this.direction = this.nextDirection;
			
			if( this.nextDirection != BotTank.DIR.STILL ){
				//this.pointingDirection = this.nextDirection;
			}
		}

		this.checkOverBounds( );

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
		this.updatePosition( );
	},


	isAtCenter: function( ){
		return ( ( this.x + 20 ) % 40 == 0 ) && ( ( this.y + 20 ) % 40 == 0 );
	},

	isPossibleToMove: function( dir ){
		if( dir == BotTank.DIR.STILL ){
			return true;
		}
		var nextBlockX = ( this.x - 20 ) / 40;
		var nextBlockY = ( this.y - 20 ) / 40;

		if( dir == BotTank.DIR.UP ){
			nextBlockY += 1;
		}
		else if( dir == BotTank.DIR.DOWN ){
			nextBlockY -= 1;
		}
		else if( dir == BotTank.DIR.LEFT ){
			nextBlockX -= 1;
		}
		else if( dir == BotTank.DIR.RIGHT ){
			nextBlockX += 1;
		}
		return !this.maze.isWall( nextBlockX, nextBlockY );
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