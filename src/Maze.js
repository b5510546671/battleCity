var Maze = cc.Node.extend( {
	ctor: function( ){
		this._super( );
		this.WIDTH = 20;
		this.HEIGHT = 13;
		this.MAP = [
			'#..................#',
			'#######......#######',
		    '#.###.###..###.###.#',
	        '#.#...#...#..#...#.#',
	        '#.#.###.####.###.#.#',
		    '#.#.#.....#....#.#.#',
		    '.....###.#.##.......',
		    '#.#.#.....#....#.#.#',
		    '#.#.###.#..#.###.#.#',
		    '#.#..##..#...#...#.#',
		    '#.###*##..#.##.###.#',
		    '....###..#.#..#.....',
			'#..................#'
		];
        
        this.BREAKABLE_WALLS = [
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
        
        this.HEART = [
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
/*		this.MAP = [
			'#........++........#',
			'....................',
		    '....................',
	        '#.#...#......#...#.#',
	        '....................',
		    '#.#.#..........#.#.#',
		    '......*.............',
		    '#.#.#..........#.#.#',
		    '....................',
		    '#.#...#..+...#...#.#',
		    '....................',
		    '....###....#..#.....',
			'#.+.....#..#.......#'
			
		];
*/		
		for ( var r = 0; r < this.HEIGHT; r++ ){
			for ( var c = 0; c < this.WIDTH; c++ ){
				if ( this.MAP[ r ][ c ] == '#' ){
                    var w = new BreakableWall( );
					w.setPosition(  new cc.Point( c * 40, ( this.HEIGHT - r - 1 ) * 40 ) );
                    w.setAnchorPoint( new cc.Point( 0, 0 ) );
                    this.BREAKABLE_WALLS[ r ][ c ] = w;
					this.addChild( w );
				}
				else if ( this.MAP[ r ][ c ] == '+' ){
					var s = cc.Sprite.create( 'res/images/static_wall.png' );
					s.setAnchorPoint( new cc.Point( 0, 0 ) );
					s.setPosition( new cc.Point( c * 40, ( this.HEIGHT - r - 1 ) * 40 ) );
					this.addChild( s );
				}
				else if ( this.MAP[ r ][ c ] == '*' ){
					var heart = new Heart( );
					heart.setAnchorPoint( new cc.Point( 0, 0 ) );
					heart.setPosition( new cc.Point( c * 40, ( this.HEIGHT - r - 1 ) * 40 ) );
                    this.HEART[ r ][ c ] = heart;
					this.addChild( heart );
				}
			}
		}
	},

	isObstacles: function( nextBlockArr ){
        var xPosit = nextBlockArr[0];
        var yPosit = nextBlockArr[1];
        var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
	   
        if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
            return ( ( this.isBreakableWall( xPosit, yPosit ) ) || ( this.MAP[ r ][ c ] == '+' ) || ( this.isHeart( xPosit, yPosit ) ) );
		}
		else{
			return true;
		}
	},
    
    getHeart: function( xPosit, yPosit ){
        var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
        
        if( this.isHeart( xPosit, yPosit ) ){
            return this.HEART[ r ][ c ];
        }
    },
    
    removeHeart: function( xPosit, yPosit, heart ){
        var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
        this.HEART[ r ][ c ] = null;
        this.removeChild( heart );
    },

	isHeart: function( xPosit, yPosit ){
		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
        
        if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
            return this.HEART[ r ][ c ] != null;
        }
	},
    
    getBreakableWall: function( xPosit, yPosit ){
        var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
        
        if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
		  return this.BREAKABLE_WALLS[ r ][ c ];
        }
    },
    
    removeBreakableWall: function( xPosit, yPosit, wall ){
        var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
        this.MAP[ r ][ c ] = '.';
        this.BREAKABLE_WALLS[ r ][ c ] = null;
        this.removeChild( wall );
    },

	isBreakableWall: function( xPosit, yPosit ){
		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;

		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			return this.BREAKABLE_WALLS[r][c] != null;
		}
	},

	isStaticWall: function( xPosit, yPosit ){
		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;

		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			return ( this.MAP[ r ][ c ] == '+' );
		}
	}

} );