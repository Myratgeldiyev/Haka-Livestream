import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { AUTHENTICATION } from './constants'

const DEFAULT_SIZE = 80

interface GreenShieldIconProps {
	size?: number
}

export function GreenShieldIcon({ size = DEFAULT_SIZE }: GreenShieldIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 50 51" fill="none">
			<Path
				d="M25 13c.985 0 3.06 2.538 3.97 2.915.91.377 4.172.05 4.869.746.696.697.37 3.958.746 4.869.377.91 2.915 2.985 2.915 3.97 0 .985-2.538 3.06-2.915 3.97-.377.91-.05 4.172-.746 4.869-.697.696-3.958.37-4.869.746C28.06 35.462 25.985 38 25 38c-.985 0-3.06-2.538-3.97-2.915-.91-.377-4.172-.05-4.869-.746-.696-.697-.37-3.958-.746-4.869-.377-.91-2.915-2.985-2.915-3.97 0-.985 2.538-3.06 2.915-3.97.377-.91.05-4.172.746-4.869.697-.696 3.958-.37 4.869-.746C21.94 15.538 24.015 13 25 13z"
				fill={AUTHENTICATION.shieldGreen}
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M30.85 22.115a1.49 1.49 0 01.4 1.064 1.5 1.5 0 01-.462 1.038l-6.723 6.402a1.462 1.462 0 01-2.063-.045l-2.835-2.944a1.495 1.495 0 01.028-2.102 1.463 1.463 0 012.08.029l1.826 1.895 5.67-5.399a1.463 1.463 0 012.079.062"
				fill="#fff"
			/>
		</Svg>
	)
}
