var Tank = cc.Sprite.extend( {

	ctor: function( x, y, gameLayer ){
		this._super( );
		this.initWithFile( 'res/images/plane.png' );

		this.direction = Tank.DIR.STILL;
		this.nextDirection = Tank.DIR.STILL;

		this.pointingDirection = Tank.DIR.UP;

		this.x = x;
		this.y = y;
		this.gameLayer = gameLayer;
		this.updatePosition( );
	},

	setPicture: function( dir ){
		switch( dir ){
			case Tank.DIR.UP:
				this.initWithFile( 'res/images/plane.png' );
				this.pointingDirection = Tank.DIR.UP;
				break;
			case Tank.DIR.DOWN:
				this.initWithFile( 'res/images/plane_down.png' );
				this.pointingDirection = Tank.DIR.DOWN;
				break;
			case Tank.DIR.LEFT:
				this.initWithFile( 'res/images/plane_left.png' );
				this.pointingDirection = Tank.DIR.LEFT;
				break;
			case Tank.DIR.RIGHT:
				this.initWithFile( 'res/images/plane_right.png' );
				this.pointingDirection = Tank.DIR.RIGHT;
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
    
    prepareToMove: function( ){
        if( this.isAtCenter( ) ){
			if( !this.isPossibleToMove( this.nextDirection ) ){
				this.nextDirection = Tank.DIR.STILL;
			}

			this.direction = this.nextDirection;
		}  
    },
    
    move: function( ){
        switch( this.direction ){
			case Tank.DIR.UP:
				this.y += Tank.MOVE_STEP;
				break;
			case Tank.DIR.DOWN:
				this.y -= Tank.MOVE_STEP;
				break;
			case Tank.DIR.RIGHT:
				this.x += Tank.MOVE_STEP;
				break;
			case Tank.DIR.LEFT:
				this.x -= Tank.MOVE_STEP;
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

	isPossibleToMove: function( dir ){
		if( dir == Tank.DIR.STILL ){
			return true;
		}
		var nextBlockX = ( this.x - 20 ) / 40;
		var nextBlockY = ( this.y - 20 ) / 40;

		if( dir == Tank.DIR.UP ){
			nextBlockY += 1;
		}
		else if( dir == Tank.DIR.DOWN ){
			nextBlockY -= 1;
		}
		else if( dir == Tank.DIR.LEFT ){
			nextBlockX -= 1;
		}
		else if( dir == Tank.DIR.RIGHT ){
			nextBlockX += 1;
		}
		return !this.maze.isWall( nextBlockX, nextBlockY );
	},

	shoot: function(){
		//console.log( "FOR TANK " + this.x + " , " + this.y );
        if ( this.isAtCenter( ) ){
		  this.gameLayer.shoot( this.x, this.y, this.pointingDirection );
        }
	}


} );

Tank.MOVE_STEP = 5;
Tank.DIR = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4,
	STILL: 0
};