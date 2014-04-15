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
					var s = new Heart( );
					s.setAnchorPoint( new cc.Point( 0, 0 ) );
					s.setPosition( new cc.Point( c * 40, ( this.HEIGHT - r - 1 ) * 40 ) );
					this.addChild( s );
				}
				
			}
		}
        
	},

	isWall: function( nextBlockArr ){
        var blockX = nextBlockArr[0];
        var blockY = nextBlockArr[1];
       // console.log("blockX, blockY " + blockX, blockY);
		var r = this.HEIGHT - blockY - 1;
		var c = blockX;
	//	console.log(blockX + " : " + blockY);
		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			return ( ( this.MAP[ r ][ c ] == '#' ) || ( this.MAP[ r ][ c ] == '+' ) || ( this.MAP[ r ][ c ] == '*' ) );
		}
		else{
			return true;
		}
	},

	isHeart: function( xPosit, yPosit ){

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
		return this.BREAKABLE_WALLS[ r ][ c ];
    },
    
    removeBreakableWall: function( xPosit, yPosit, wall ){
        var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
        console.log( 'remove breakable wall is called ');
        this.MAP[ r ][ c ] = ' ';
        this.removeChild( wall );
    },

	isBreakableWall: function( xPosit, yPosit ){
		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;

		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			return ( this.MAP[ r ][ c ] == '#' );
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