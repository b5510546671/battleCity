var Maze = cc.Node.extend( {
	ctor: function( ){
		this._super( );
		this.WIDTH = 20;
		this.HEIGHT = 13;
		this.MAP = [
			'#........++........#',
			'#######......#######',
		    '#.###.###..###.###.#',
	        '#.#...#......#...#.#',
	        '#.#.###.#++#.###.#.#',
		    '#.#.#..........#.#.#',
		    '......###. ###......',
		    '#.#.#..........#.#.#',
		    '#.#.###.#..#.###.#.#',
		    '#.#...#..+...#...#.#',
		    '#.###.##..+.##.###.#',
		    '....###..++#..#.....',
			'#.+.....#*.#.......#'
			
		];
		
		for ( var r = 0; r < this.HEIGHT; r++ ){
			for ( var c = 0; c < this.WIDTH; c++ ){
				if ( this.MAP[ r ][ c ] == '#' ){
					var s = cc.Sprite.create( 'res/images/wall.png' );
					s.setAnchorPoint( new cc.Point( 0, 0 ) );
					s.setPosition(  new cc.Point( c * 40, ( this.HEIGHT - r - 1 ) * 40 ) );
					this.addChild( s );
					
				}
				else if ( this.MAP[ r ][ c ] == '+' ){
					var s = cc.Sprite.create( 'res/images/static_wall.png' );
					s.setAnchorPoint( new cc.Point( 0, 0 ) );
					s.setPosition( new cc.Point( c * 40, ( this.HEIGHT - r - 1 ) * 40 ) );
					this.addChild( s );
				}
				else if ( this.MAP[ r ][ c ] == '*' ){
					//var s = cc.Sprite.create( 'res/images/heart.png' );
					var s = new Heart();
					s.setAnchorPoint( new cc.Point( 0, 0 ) );
					s.setPosition( new cc.Point( c * 40, ( this.HEIGHT -r - 1 ) * 40 ) );
					this.addChild( s );
				}
				
			}
		}
	},

	isWall: function( blockX, blockY ){
		var r = this.HEIGHT - blockY - 1;
		var c = blockX;
		//console.log('r = ' + r + ' c = ' + c);
		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			return ( ( this.MAP[ r ][ c ] == '#' ) || ( this.MAP[ r ][ c ] == '+' ) || ( this.MAP[ r ][ c ] == '*' ) );
		}
		else{
			return true;
		}
	},

	getHeart: function( xPosit, yPosit ){

		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
		//console.log( 'r in getHeart is ' + r + ' c in getHeart is ' + c );
		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			return ( this.MAP[ r ][ c ] == '*' );
		}
	},

	getBreakableWall: function( xPosit, yPosit ){
		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;

		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			return ( this.MAP[ r ][ c ] == '#' );
		}
	}

} );