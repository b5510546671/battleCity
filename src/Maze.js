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
        
        this.HEART = [];
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
                    this.HEART[ 0 ] = heart;
					this.addChild( heart );
				}
				
			}
		}
        
	},

	isObstacles: function( nextBlockArr ){
        var xPosit = nextBlockArr[0];
        var yPosit = nextBlockArr[1];
       // console.log("blockX, blockY " + blockX, blockY);
		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
	//	console.log(blockX + " : " + blockY);
		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
            //return ( ( this.MAP[ r ][ c ] == '#' ) || ( this.MAP[ r ][ c ] == '+' ) || ( this.MAP[ r ][ c ] == '*' ) );

			return ( ( this.isBreakableWall( xPosit, yPosit ) ) || ( this.MAP[ r ][ c ] == '+' ) || ( this.isHeart( xPosit, yPosit ) ) );
		}
		else{
			return true;
		}
	},
    
    getHeart: function( xPosit, yPosit ){
        if( this.isHeart( xPosit, yPosit ) ){
            return this.HEART[ 0 ];
        }
    },
    
    removeHeart: function( heart ){
        this.HEART[ 0 ] = null;
        this.removeChild( heart );
    },

	isHeart: function( xPosit, yPosit ){

		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;
		//console.log( 'r in getHeart is ' + r + ' c in getHeart is ' + c );
		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
            this.MAP[ r ][ c ] = '.';
//TODO fix bug here. it happens the same as breakable wall breaks.
            return this.MAP[ r ][ c ] == '*';
			//return ( this.HEART[ 0 ] != null );
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
        //console.log( 'remove breakable wall is called ');
        this.MAP[ r ][ c ] = '.';
        //console.log("print this.MAP[R][C] " +this.MAP[r][c] );
        //console.log("r is " + r + " c is " + c );
        this.BREAKABLE_WALLS[ r ][ c ] = null;
        this.removeChild( wall );
    },

	isBreakableWall: function( xPosit, yPosit ){
		var r = this.HEIGHT - yPosit - 1;
		var c = xPosit;

		if( 0 <= r && r <= 12 && 0 <= c && c <= 19){
			//return ( this.MAP[ r ][ c ] == '#' ); older version of checking
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