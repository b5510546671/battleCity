var Tank = cc.Sprite.extend( {
	ctor: function( x, y ){
		this._super( );
		this.initWithFile( 'res/images/plane.png' );

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