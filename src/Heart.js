var Heart = cc.Sprite.extend( {
	
	ctor: function( ){
		this._super( );
		this.movingAction = this.heartBlinking();
		this.runAction( this.movingAction );
	},

	heartBlinking: function( ){
		console.log('this is done');
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/heart.png' );
		animation.addSpriteFrameWithFile( 'res/images/heart_01.png' );
		animation.setDelayPerUnit( 0.8 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	/*getShot: function( shot ){
		if( shot ){
			this.stopAction( this.movingAction );
		}
	}*/

} );