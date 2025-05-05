(function($) {
	
var handleChart = function(){
	
	var screenWidth = $(window).width();

	var handleSalesChart = function(){
		var options = {
			series: [
				{
					name: 'Net Profit',
					data: [200, 190, 200, 190, 205, 185, 200, 190],
				},
			],
			chart: {
				height: 365,
				type: 'area',
				group: 'social',
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				},
			},
			colors:["#1D3573","#EAC947"],
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			stroke: {
				show: true,
				width: 2,
				curve:'smooth',
				colors:['var(--primary)'],
			},
			grid: {
				show:true,
				borderColor: '#eee',
				padding: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
			},
			states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
			yaxis: {
				labels: {
					minWidth: 20,
					offsetX: -10,
					style: {
						fontSize: '13px',
						colors:'#888888', 
					},
					formatter: function (value) {
						return "$" + value;
					}
				},
			},
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August'],
				axisBorder: {
					show: true,
				},
				axisTicks: {
					show: true
				},
				labels: {
					show: true,
					style: {
						fontSize: '13px',
						colors:'#888888', 
					}
				},
				crosshairs: {
					show: true,
					position: 'front',
					stroke: {
						width: 0,
						dashArray: 3
					}
				},
				tooltip: {
					enabled: false,
				}
			},
			fill: {
				opacity: 0.9,
				colors:'var(--secondary)',
				type: 'gradient', 
				gradient: {
					colorStops:[
						{
							offset: 0,
							color: 'var(--secondary)',
							opacity: .30,
						},
						{
							offset: 0.6,
							color: 'var(--secondary)',
							opacity: .15,
						},
						{
							offset: 100,
							color: 'white',
							opacity: 0,
						}
					],
				}
			},
			responsive: [{
				breakpoint: 591,
				options: {
					series: [
						{
							data: [200, 190, 200, 190, 205],
						},
					],
					chart: {
						height: 250,
					},
					xaxis: {
						categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
					},
				},
			}],
		};

		var chartBar1 = new ApexCharts(document.querySelector("#handleSalesChart"), options);
		chartBar1.render();
	}
	
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				handleSalesChart();
			},
			
			resize:function(){
			}
		}
	
	}();

	
	jQuery(window).on('load',function(){
		setTimeout(function(){
			handleChart.load();
		}, 1000); 
		
	});

})(jQuery);