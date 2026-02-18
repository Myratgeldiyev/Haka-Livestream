export type GameTabType = 'game' | 'moment' | 'video'

export interface GameCardProps {
	id: string
	title: string
	image: any
	gradient: [string, string]
	buttonLabel: string
	route: string
}

export const GAME_LIST: GameCardProps[] = [
	{
		id: 'roulette',
		title: 'Russian Roulette',
		image: require('@/assets/games-png/russian-rullet.png'),
		gradient: ['#F8BF5B', '#FDCD87'],
		buttonLabel: 'Gameplay',
		route: '/games/roulette',
	},
	{
		id: 'wheel',
		title: 'Lucky Wheel',
		image: require('@/assets/games-png/lucky-wheel.png'),
		gradient: ['#5CEDF8', '#26C2C8'],
		buttonLabel: 'Gameplay',
		route: '/games/wheel',
	},
	{
		id: 'tigerlion',
		title: 'Tiger vs Lion',
		image: require('@/assets/games-png/tiger-lion.png'),
		gradient: ['#F5A3F2', '#E38EDE'],
		buttonLabel: 'Gameplay',
		route: '/games/wheel',
	},
	{
		id: 'bounty',
		title: 'Bounty Racer',
		image: require('@/assets/games-png/bounty-racer.png'),
		gradient: ['#92D5E3', '#6DC6E4'],
		buttonLabel: 'Gameplay',
		route: '/games/wheel',
	},
	{
		id: 'royal',
		title: 'Royal Battle',
		image: require('@/assets/games-png/royal-battle.png'),
		gradient: ['#C0F254', '#6EB90D'],
		buttonLabel: 'Gameplay',
		route: '/games/wheel',
	},
	{
		id: 'ludo',
		title: 'Ludp',
		image: require('@/assets/games-png/ludo-king.png'),
		gradient: ['#71E9B9', '#15BD66'],
		buttonLabel: 'Gameplay',
		route: '/games/wheel',
	},
	{
		id: 'fishing',
		title: 'Fishing Star',
		image: require('@/assets/games-png/fishing-star.png'),
		gradient: ['#6ECAEC', '#2784A6'],
		buttonLabel: 'Gameplay',
		route: '/games/wheel',
	},
	{
		id: 'win',
		title: 'Win Go',
		image: require('@/assets/games-png/win-go.png'),
		gradient: ['#F8BF5B', '#FECF8E'],
		buttonLabel: 'Gameplay',
		route: '/games/wheel',
	},
]
