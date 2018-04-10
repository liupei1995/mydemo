var myChart = echarts.init(document.getElementById('result'));

var option = {
	textStyle: {
		fontSize: 14
	},
	radar: {
		splitNumber: 4,
		splitArea: {
			areaStyle: {
				color: 'rgb(255, 255, 255)'
			}
		},
		indicator: [{
				name: '推理力',
				max: 10,
				color: 'red'
			},
			{
				name: '计算力',
				max: 10,
				color: 'green'
			},
			{
				name: '创造力',
				max: 10,
				color: 'blue'
			},
			{
				name: '空间力',
				max: 10,
				color: 'black'
			},
			{
				name: '记忆力',
				max: 10,
				color: 'purple'
			},
			{
				name: '观察力',
				max: 10,
				color: 'orange'
			}
		]
	},
	series: [{
		type: 'radar',
		data: [{
			value: [2, 3.5, 6, 7, 8, 5],
			label: {
				normal: {
					show: true,
					color: '#000'
				}
			},
			lineStyle: {
				normal: {
					color: 'rgba(255, 255, 255)'
				}
			},
			areaStyle: {
				normal: {
					color: 'rgba(0, 0, 0, 0.3)'
				}
			}
		}]
	}]
};

/*动态设置value*/
option.series[0].data[0].value = [3, 8, 4, 5, 2, 4];

myChart.setOption(option);