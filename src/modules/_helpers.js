
const getRandom = (min = 0, max = 1) => (Math.random() * (max - min)) + min;


const convertColor = (color) => {
	return {
		toDec: () => {
			if ( color.startsWith('#') ) color = color.slice(1);

			return [
				parseInt(color.slice(0, 2), 16),
				parseInt(color.slice(2, 4), 16),
				parseInt(color.slice(4), 16),
			];
		},
		toHex: () => {
			return (
				'#' +
				color[0].toString(16) + 
				color[1].toString(16) + 
				color[2].toString(16)
			);
		}
	};
};



export {
	getRandom,
	convertColor
};