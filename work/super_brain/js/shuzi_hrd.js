$(function() {
	FastClick.attach(document.body);
	
	/*
	 *@params   m             分钟
	 *@params   s             秒钟
	 *@params   timer         定时器
	 *@params   data_success  成功的数组
	 *@params   data          填充的内容
	 *@params   result        结果
	 * */
	let m = '00';
	let s = '00';
	let timer;
	const data_success = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ''];
	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	let result = [];
	
	/*fn  打乱数组 */
	function shuffleArray(a, b) {
		return Math.random() > .5 ? -1 : 1;
	};
	
	/*fn  填充内容*/
	function addItem() {
		for(let value of data) {
			$('.item').each(function(index, elem) {
				$(this).text(data[index]);
			})
		}
	};
    
    /*第一次渲染*/
	addItem();
	
	/*fn 点击按钮*/
	$('#shuffle').click(function() {
		data.sort(shuffleArray);   /*打乱数组*/
		addItem();                 /*再次渲染*/
		startGame();               /*开始比赛*/

		// 开始计时
		timer = setInterval(function() {
			s = parseInt(s) + 1;
			if(s < 10) {
				s = '0' + s;
			} else if(s === 59) {
				s = '00';
				m = parseInt(m) + 1;
				if (m < 10) {
					m = '0' + m;
				}
			}
			$('#time').text(m + ':' + s);
		}, 1000)
	});
	
	/*显示时间*/
	$('#time').text(m + ':' + s);
	
	
	/*fn  游戏逻辑*/
	function startGame() {
		$('.item').each(function(index, elem) {
			$(this).click(function() {
				if($(this).next().text() && $(this).prev().text()) {
					if($(this).next().next().next().next().attr('id') || $(this).prev().prev().prev().prev().attr('id')) {
						let a = $('#DivLast').prev();
						if(!a.text()) {
							a = $('#DivLast').next();
							$('#DivLast').insertBefore($(this).next());
							$(this).insertBefore(a);
						} else {
							$('#DivLast').insertBefore($(this).next());
							$(this).insertAfter(a);
						}
					}
				} else if($(this).prev().attr('id') && ($(this).offset().top === $('#DivLast').offset().top)) {
					$('#DivLast').insertAfter($(this));
				} else if($(this).next().attr('id') && ($(this).offset().top === $('#DivLast').offset().top)) {
					$('#DivLast').insertBefore($(this));
				} else if($(this).prev().text() && $(this).prev().prev().prev().prev().attr('id')) {
					let b = $('#DivLast').prev();
					$('#DivLast').insertAfter($(this).prev());
					$(this).insertAfter(b);
				} else if($(this).next().text() && $(this).next().next().next().next().attr('id')) {
					let c = $('#DivLast').next();
					$('#DivLast').insertBefore($(this).next());
					$(this).insertBefore(c);
				} else {
					return false;
				}
				
				/*每次移动完更新result数组*/
				result = [];
				$('.item').each(function(index, elem) {
					result.push($(elem).text());
				});

				/*判断是否成功
				 * 成功：清除定时器,跳转六维脑力图页面
				 * */
				if(JSON.stringify(result) === JSON.stringify(data_success)) {
					clearInterval(timer);
					setTimeout(function(){
						layer.open({
							content: '<p class="congratulation">恭喜你完成挑战<p><p>点击确定要去查看你的六维脑力雷达图</p>',
							btn: ['确定', '取消'],
							yes: function(index){
								window.location.href = 'result.html'
							}
						})
					}, 1000)
				}
			})
		})
	}
});