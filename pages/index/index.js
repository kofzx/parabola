//index.js
//获取应用实例
const app = getApp()

const BALLS_LENGTH = 5,
	  BALL_HALF = 10;
function getBalls() {
	let balls = [];
	for (let i = 0; i < BALLS_LENGTH; i++) {
		balls.push({ inited: false });
	}
	return balls;
}

Page({
  data: {
  	cartBasketRect: {},		// 购物车篮的rect信息
	offsetX: 0,
	offsetY: 0,
	ballX: 0,
	ballY: 0,
	balls: getBalls(),
  },
  onLoad () {
  	this.getCartBasketRect();
  },
  getCartBasketRect () {
  	wx.createSelectorQuery()
		.selectAll('.cart-basket')
		.boundingClientRect(rects => {
	  		rects.map(rect => {
	  			this.setData({
	  				cartBasketRect: rect
	  			});
	  		});
		}).exec();
  },
  addToCart (e) {
  	let ballX = e.touches[0].clientX - BALL_HALF,
		ballY = e.touches[0].clientY - BALL_HALF;
	let offsetX = -Math.abs(this.data.cartBasketRect.left - ballX + BALL_HALF),
		offsetY = Math.abs(this.data.cartBasketRect.top - ballY - BALL_HALF);
	const balls = this.data.balls;

	this.setData({
		ballX,
		ballY,
		offsetX,
		offsetY
	});

	for (let i = 0; i < BALLS_LENGTH; i++) {
		const ball = balls[i];
		if (!ball.inited) {
            ball.inited = true;
            this.setData({ balls });

			setTimeout(() => {
				ball.inited = false;
				this.setData({ balls });
			}, 500);
            break;
        }
	}
  }
})
