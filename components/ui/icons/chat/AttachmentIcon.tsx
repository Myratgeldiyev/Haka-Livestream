import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	size?: number
	color?: string
}

export function AttachmentIcon({ size = 24, color = '#667085' }: Props) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 21.9983 8.005 21.9983C6.41277 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.33 3.18C13.0806 2.42975 14.0991 2.00892 15.16 2.00892C16.2209 2.00892 17.2394 2.42975 17.99 3.18C18.7403 3.93063 19.1611 4.94905 19.1611 6.01C19.1611 7.07095 18.7403 8.08938 17.99 8.84L9.41 17.41C9.03472 17.7853 8.52573 17.9961 7.995 17.9961C7.46427 17.9961 6.95528 17.7853 6.58 17.41C6.20472 17.0347 5.9939 16.5257 5.9939 15.995C5.9939 15.4643 6.20472 14.9553 6.58 14.58L15.07 6.1'
				stroke={color}
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}
