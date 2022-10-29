import { prismatic } from './primsa';

interface challengeMon {
	name: string;
	art: string;
	sprite: string;
	stats: string[];
}

export async function getTwoRandoms() {
	let status = 500;
	try {
		const twoRandoms: challengeMon[] = await prismatic.display.findMany({
			select: {
				name: true,
				art: true,
				sprite: true,
				stats: true
			}
		});
		let twoRandArr: challengeMon[] = [];
		while (twoRandArr.length < 2) {
			const rand = Math.floor(Math.random() * (twoRandoms.length - 0) + 0);
			while (!twoRandArr.includes(twoRandoms[rand])) {
				twoRandArr = [...twoRandArr, twoRandoms[rand]];
			}
		}
		status = 200;
		return {
			status,
			twoRandArr
		};
	} catch (err: any) {
		console.log(err.message);
		status = 404;
		return {
			status
		};
	}
}
