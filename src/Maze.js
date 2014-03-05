var Maze = cc.Node.extend( {
	ctor: function( ){
		this._super( );
		this.WIDTH = 20;
		this.HEIGHT = 13;
		this.MAP = [
			'####################',
			'#..................#',
		    '#.###.###..###.###.#',
	        '#.#...#......#...#.#',
	        '#.#.###.####.###.#.#',
		    '#.#.#..........#.#.#',
		    '......###. ###......',
		    '#.#.#..........#.#.#',
		    '#.#.###.####.###.#.#',
		    '#.#...#......#...#.#',
		    '#.###.###..###.###.#',
			'#..................#',
			'####################'
		];
		this.DOTS = [
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ],
			[ ]
		];
		
		for ( var r = 0; r < this.HEIGHT; r++ ){
			for ( var c = 0; c < this.WIDHT; c++ ){
				if ( this.MAP[ r ][ c ] == '#' ){
					var s = cc.Sprite.create( 'res/images/wall.png' );
					s.setAnchorPoint( new cc.Point( 0, 0 ) );
					s.setPosition( new cc.Point( new cc.Point( c * 40, ( this.HEIGHT - r - 1 ) * 40 ) ) );
					this.addChild( s );
				}
				else if ( this.MAP[ r ][ c ] == '.' ){
					
				}
			}
		}
		this.setAnchorPoint( new cc.Point( 0, 0) );
	},


} );