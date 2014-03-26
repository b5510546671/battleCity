var Bullet = cc.Sprite.extend( {
	ctor: function( x, y, dir ){
		
		this._super( );
		this.initWithFile( 'res/images/bullet_up.png' );
		this.x = x;
		this.y = y;
		this.pointingDirection = dir;
		
		this.planeBullet = this.createBullet( this.pointingDirection );



		this.update();
		//this.updateBullet( );
	},

	createBullet: function( dir ){
		console.log(this.pointingDirection);

		switch( dir ){
			case Tank.DIR.UP:
				console.log('shooting up');
				this.initWithFile( 'res/images/bullet_up.png' );
				break;
			case Tank.DIR.DOWN:
				console.log('shooting down');
				this.initWithFile( 'res/images/bullet_down.png' );
				break;
			case Tank.DIR.LEFT:
				console.log('shooting left');
				this.initWithFile( 'res/images/bullet_left.png' );
				break;
			case Tank.DIR.RIGHT:
				console.log('shooting right');
				this.initWithFile( 'res/images/bullet_right.png' );
				break;
			default:
				console.log('nothing is create');
				break;
		}


		/*
		if( this.pointingDirection == Tank.DIR.UP ){
			return cc.Sprite.create( 'res/images/bullet_up.png' );
		}
		else if( this.pointingDirection == Tank.DIR.DOWN ){
			return cc.Sprite.create( 'res/images/bullet_down.png' );
		}
		else if( this.pointingDirection == Tank.DIR.LEFT ){
			return cc.Sprite.create( 'res/images/bullet_left.png' );
		}
		else if( this.pointingDirection == Tank.DIR.RIGHT ){
			return cc.Sprite.create( 'res/images/bullet_right.png' );
		}
		else{
			console.log('nothing is create');
		}
		*/
	},

	updateBullet: function( ){
		//console.log('this.tank.shoot()');
		this.setPosition( new cc.Point( this.x, this.y ) );
	},

	update: function( dt ){
		//console.log('this.tank.shoot()');
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
		console.log('update is done' );
		this.updateBullet( );
	}


} );

Bullet.MOVE_STEP = 10;