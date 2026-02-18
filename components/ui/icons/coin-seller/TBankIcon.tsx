import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
interface P {
	size: string
	props: any
}
function TBankIcon({ props, size = '24' }: P) {
	return (
		<Svg
			width={size}
			height={size}
			viewBox='0 0 24 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M12 19L0 7.283 4.577 0h14.846L24 7.283 12 19zm1.2-10.688V6.864c2.16.105 4.176.522 4.8 1.062-.725.63-3.324 1.087-6 1.087s-5.275-.458-6-1.087c.617-.541 2.64-.95 4.8-1.069v1.455h2.4zM6 7.921v.872c.617.54 2.633.95 4.8 1.069v3.2h2.4V9.857c2.16-.107 4.181-.522 4.8-1.063v-1.74c-.619-.54-2.64-.956-4.8-1.068V4.75h3.6V2.969H7.2V4.75h3.6v1.235c-2.167.112-4.183.528-4.8 1.069v.867z'
				fill='#009393'
			/>
		</Svg>
	)
}

export default TBankIcon
