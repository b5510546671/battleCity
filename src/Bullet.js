var Bullet = cc.Sprite.extend( {
	ctor: function( x, y, dir, maze ){

		this._super( );
		
		this.x = x;
		this.y = y + 40;
		this.pointingDirection = dir;
		this.maze = maze;
		this.createBullet( this.pointingDirection );
		this.update();
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
		if( this.isAtCenter( ) ){
			this.checkShootHeart( );
			this.checkShootBreakableWall( );
		}
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

	checkShootBreakableWall: function(){
		var xPosit = ( this.x - 20 ) / 40;
		var yPosit = ( this.y - 20 ) / 40;

		var breakableWall = this.maze.getBreakableWall( xPosit, yPosit );

		if( breakableWall ){
			console.log( '#######################shoot at wall#########################' );
		}
	},

	checkShootHeart: function( ){

		var xPosit = ( this.x - 20 ) / 40;
		var yPosit = ( this.y - 20 ) / 40;

		//console.log( 'xPosit is ' + xPosit + ' yPosit is ' + yPosit );

		var heart = this.maze.getHeart( xPosit, yPosit );
		//console.log( heart );
		if( heart ){
			console.log( '==============================GAME OVER!==================================' );
		}
		
	}




} );

Bullet.MOVE_STEP = 10;