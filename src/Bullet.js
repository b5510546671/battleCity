var Bullet = cc.Sprite.extend( {
	ctor: function( x, y, dir, maze, gameLayer ){

		this._super( );
		
		this.x = x;
		this.y = y + 40;
		this.pointingDirection = dir;
		this.maze = maze;
		this.createBullet( this.pointingDirection );

		this.gameLayer = gameLayer;
        
//        this.hitCallback = null;
      
		this.update();
	},
    
//    setHitCallback: function( callback ){
//        this.hitCallback = callback;  
//    },
    
    getXPosition: function( ){
        return this.x;   
    },
    
    getYPosition: function( ){
        return this.y;  
    },

	createBullet: function( dir ){
		//console.log(this.pointingDirection);
		//console.log( this.x + " , " + this.y );
		switch( dir ){
			case Tank.DIR.UP:
				//console.log('shooting up');
				this.initWithFile( 'res/images/bullet_up.png' );
				break;
			case Tank.DIR.DOWN:
				//console.log('shooting down');
				this.initWithFile( 'res/images/bullet_down.png' );
				break;
			case Tank.DIR.LEFT:
				//console.log('shooting left');
				this.initWithFile( 'res/images/bullet_left.png' );
				break;
			case Tank.DIR.RIGHT:
				//console.log('shooting right');
				this.initWithFile( 'res/images/bullet_right.png' );
				break;
			default:
				//console.log('nothing is create');
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
//		if( this.isAtCenter( ) ){
//			if( !this.isPossibleToMove( this.pointingDirection ) ){
//				//REMOVE THAT BULLET FROM SCREEN
//				this.gameLayer.removeChild( this );
//				//console.log( 'bullet will be removed from this screen ' );
//			}

			//var xPosit = ( this.x - 20 ) / 40;
			//var yPosit = ( this.y - 20 ) / 40;

			//this.checkShootHeart( xPosit, yPosit );
			//this.checkShootBreakableWall( xPosit, yPosit );
//		}

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
			//this.gameLayer.removeChild( this );
			//console.log("xPosit " + xPosit + " , yPosit " + yPosit);
			//console.log( '#######################shoot at wall#########################' );
            
//            if( this.hitCallback ){
//                this.hitCallback( breakableWall );   
//            }
            
            this.gameLayer.editPoints( -20 );
            
            this.maze.removeBreakableWall( xPosit, yPosit, breakableWall );
            
			return true;
		}
	},

	checkShootHeart: function( xPosit, yPosit ){

		
		//console.log( 'xPosit is ' + xPosit + ' yPosit is ' + yPosit );

		var heart = this.maze.isHeart( xPosit, yPosit );
		//console.log( heart );
		if( heart ){
			//console.log("xPosit " + xPosit + " , yPosit " + yPosit);
			//console.log( '==============================GAME OVER!==================================' );

			this.gameLayer.gameOver( );
			return true;
		}
		
	},

	checkShootStaticWall: function( xPosit, yPosit ){
		var staticWall = this.maze.isStaticWall( xPosit, yPosit );

		if( staticWall ){
			//console.log("xPosit " + xPosit + " , yPosit " + yPosit);
			//console.log( '#######################shoot at static wall#########################' );
			//this.gameLayer.removeChild( this );
			return true;
		}
	},
    
    isPossibleToMove: function( dir ){
		
		var nextBlockX = ( this.x - 20 ) / 40;
		var nextBlockY = ( this.y - 40 - 20 ) / 40;

/*		if( dir == Tank.DIR.UP ){
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
*/		
		return !( this.checkShootBreakableWall( nextBlockX, nextBlockY ) || this.checkShootHeart( nextBlockX, nextBlockY ) || this.checkShootStaticWall( nextBlockX, nextBlockY ) );
		//return !this.maze.isObstacles( nextBlockX, nextBlockY );
	},




} );

Bullet.MOVE_STEP = 10;