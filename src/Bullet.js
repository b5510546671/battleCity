var Bullet = cc.Sprite.extend( {
	ctor: function( x, y, dir, maze, gameLayer ){
        this._super( );
        
		this.x = x;
		this.y = y + 40;
		this.pointingDirection = dir;
		this.maze = maze;
		this.createBullet( this.pointingDirection );
        this.gameLayer = gameLayer;
        
        this.update();
	},
    
    getXPosition: function( ){
        return this.x;   
    },
    
    getYPosition: function( ){
        return this.y;  
    },

	createBullet: function( dir ){
		switch( dir ){
			case Tank.DIR.UP:
				this.initWithFile( 'res/images/bullet_up.png' );
				break;
			case Tank.DIR.DOWN:
				this.initWithFile( 'res/images/bullet_down.png' );
				break;
			case Tank.DIR.LEFT:
				this.initWithFile( 'res/images/bullet_left.png' );
				break;
			case Tank.DIR.RIGHT:
				this.initWithFile( 'res/images/bullet_right.png' );
				break;
			default:
				break;
		}
	},

	updateBullet: function( ){
		this.setPosition( new cc.Point( this.x, this.y ) );
	},

	isAtCenter: function( ){
		return ( ( this.x + 20 ) % 40 == 0 ) && ( ( this.y + 20 ) % 40 == 0 );
	},

	update: function( dt ){
		switch( this.pointingDirection ){
			case Tank.DIR.UP:
				this.y += Bullet.MOVE_STEP;
				break;
			case Tank.DIR.DOWN:
				this.y -= Bullet.MOVE_STEP;
				break;
			case Tank.DIR.RIGHT:
				this.x += Bullet.MOVE_STEP;
				break;
			case Tank.DIR.LEFT:
				this.x -= Bullet.MOVE_STEP;
				break;
		}

		this.updateBullet( );
	},

	checkShootBreakableWall: function( xPosit, yPosit ){
		var breakableWall = this.maze.getBreakableWall( xPosit, yPosit );
		if( breakableWall ){
			this.gameLayer.editPoints( -20 );
            this.maze.removeBreakableWall( xPosit, yPosit, breakableWall );
			return true;
		}
	},

	checkShootHeart: function( xPosit, yPosit ){
        var heart = this.maze.getHeart( xPosit, yPosit );
		if( heart ){
			this.gameLayer.editPoints( -80 );
            this.maze.removeHeart( xPosit, yPosit, heart );
            this.gameLayer.pauseBotTanks( 10 );
            return true;
		}
	},

	checkShootStaticWall: function( xPosit, yPosit ){
		var staticWall = this.maze.isStaticWall( xPosit, yPosit );
		if( staticWall ){
			return true;
		}
	},
    
    isPossibleToMove: function( dir ){
		var nextBlockX = ( this.x - 20 ) / 40;
		var nextBlockY = ( this.y - 40 - 20 ) / 40;
		return !( this.checkShootBreakableWall( nextBlockX, nextBlockY ) || 
                    this.checkShootHeart( nextBlockX, nextBlockY ) || 
                    this.checkShootStaticWall( nextBlockX, nextBlockY ) );
	},
    
} );

Bullet.MOVE_STEP = 10;