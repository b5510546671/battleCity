var Tank = cc.Sprite.extend( {

	ctor: function( x, y ){
		this._super( );
		this.initWithFile( 'res/images/plane.png' );

		this.direction = Tank.DIR.STILL;

		this.x = x;
		this.y = y;
		this.updatePosition( );
	},

	updatePosition: function( ){
		this.setPosition( new cc.Point( this.x, this.y ) );
	},

	setDirection: function( dir ){
		this.direction = dir;
	},

	setMaze: function( maze ){
		this.maze = maze;
	},

	update: function( dt ){
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
		this.updatePosition();
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