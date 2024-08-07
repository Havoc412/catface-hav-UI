import {
	ref
} from "vue";

//模拟测试数据
export const testpoi = ref([{
		id: 0,
		name: '111',
		latitude: 30.525858,
		longitude: 114.3567759,
		img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
		type: '酒店'
	},
	{
		id: 1,
		name: '222',
		latitude: 30.6,
		longitude: 114.36071,
		img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
		type: '景区'
	},
	{
		id: 2,
		name: '333',
		latitude: 30.611,
		longitude: 114.35071,
		img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
		type: '景区'
	}
]);

export const testpath = ref([
	[{
			id: 0,
			name: '1-1',
			latitude: 30.525858,
			longitude: 114.3567759,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		},
		{
			id: 1,
			name: '1-2',
			latitude: 30.6,
			longitude: 114.36071,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		},
		{
			id: 2,
			name: '1-3',
			latitude: 30.611,
			longitude: 114.35071,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		},
		{
			id: 3,
			name: '1-4',
			latitude: 30.11,
			longitude: 114.5071,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		}
	],
	[{
			id: 0,
			name: '2-1',
			latitude: 30.525858,
			longitude: 114.3567759,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		},
		{
			id: 1,
			name: '2-2',
			latitude: 30.6,
			longitude: 114.36071,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		},
		{
			id: 2,
			name: '2-3',
			latitude: 30.611,
			longitude: 114.35071,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		}
	],
	[{
			id: 0,
			name: '3-1',
			latitude: 30.525858,
			longitude: 114.3567759,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		},
		{
			id: 1,
			name: '3-2',
			latitude: 30.6,
			longitude: 114.36071,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		},
		{
			id: 2,
			name: '3-3',
			latitude: 30.611,
			longitude: 114.35071,
			img: 'https://img0.baidu.com/it/u=2426072799,1960439289&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
			type: '景区'
		}
	]
]);
export const accuraterouteinfo = ref([{
		duration: 100,
		cost: 10,
		mode: '地铁',
		path: [{
				latitude: 30.525812,
				longitude: 114.356758
			},
			{
				latitude: 30.525638,
				longitude: 114.357344
			},
			{
				latitude: 30.525634,
				longitude: 114.357344
			},
			{
				latitude: 30.525716,
				longitude: 114.357374
			},
			{
				latitude: 30.525716,
				longitude: 114.357374
			}
		]
	},
	{
		duration: 200,
		cost: 20,
		mode: '打车',
		path: [{
				latitude: 30.525768,
				longitude: 114.357227
			},
			{
				latitude: 30.525768,
				longitude: 114.357227
			},
			{
				latitude: 30.52553,
				longitude: 114.357127
			},
			{
				latitude: 30.52553,
				longitude: 114.357127
			},
			{
				latitude: 30.525269,
				longitude: 114.357005
			},
			{
				latitude: 30.525269,
				longitude: 114.357005
			}
		]
	}
]);
export const roughrouteinfo = ref([{
		duration: 100,
		cost: 10,
		mode: '地铁',
		path: [{
				latitude: 30.525858,
				longitude: 114.3567759,
			},
			{
				latitude: 30.6,
				longitude: 114.36071,
			}
		]
	},
	{
		duration: 20,
		cost: 20,
		mode: '打车',
		path: [{
				latitude: 30.6,
				longitude: 114.36071,
			},
			{
				latitude: 30.611,
				longitude: 114.35071,
			}
		]
	}
]);