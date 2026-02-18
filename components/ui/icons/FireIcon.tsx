import React from 'react'
import Svg, { Path, Defs, RadialGradient, Stop } from 'react-native-svg'

interface FireIconProps {
	size?: number
}

export const FireIcon: React.FC<FireIconProps> = ({ size = 12 }) => {
	const height = (size / 12) * 15

	return (
		<Svg width={size} height={height} viewBox="0 0 12 15" fill="none">
			<Path
				d="M2.32761 4.59148C2.25636 5.35148 2.20636 6.69648 2.65511 7.26898C2.65511 7.26898 2.44386 5.79148 4.33761 3.93773C5.10011 3.19148 5.27636 2.17648 5.01011 1.41523C4.85886 0.983982 4.58261 0.627732 4.34261 0.378982C4.20261 0.232732 4.31011 -0.00851843 4.51386 0.000231571C5.74636 0.0552316 7.74386 0.397731 8.59261 2.52773C8.96511 3.46273 8.99261 4.42898 8.81511 5.41148C8.70261 6.03898 8.30261 7.43398 9.21511 7.60523C9.86636 7.72773 10.1814 7.21023 10.3226 6.83773C10.3814 6.68273 10.5851 6.64398 10.6951 6.76773C11.7951 8.01898 11.8889 9.49273 11.6614 10.7615C11.2214 13.214 8.73761 14.999 6.27011 14.999C3.18761 14.999 0.733864 13.2352 0.0976145 10.0427C-0.158636 8.75398 -0.0286353 6.20398 1.95886 4.40398C2.10636 4.26898 2.34761 4.38898 2.32761 4.59148Z"
				fill="url(#paint0_radial_4954_1121)"
			/>
			<Path
				d="M7.39616 9.17764C6.25991 7.71514 6.76866 6.04639 7.04741 5.38139C7.08491 5.29389 6.98491 5.21139 6.90616 5.26514C6.41741 5.59764 5.41616 6.38014 4.94991 7.48139C4.31866 8.97014 4.36366 9.69889 4.73741 10.5889C4.96241 11.1251 4.70116 11.2389 4.56991 11.2589C4.44241 11.2789 4.32491 11.1939 4.23116 11.1051C3.96151 10.8462 3.76933 10.5172 3.67616 10.1551C3.65616 10.0776 3.55491 10.0564 3.50866 10.1201C3.15866 10.6039 2.97741 11.3801 2.96866 11.9289C2.94116 13.6251 4.34241 15.0001 6.03741 15.0001C8.17366 15.0001 9.72991 12.6376 8.50241 10.6626C8.14616 10.0876 7.81116 9.71139 7.39616 9.17764Z"
				fill="url(#paint1_radial_4954_1121)"
			/>
			<Defs>
				<RadialGradient
					id="paint0_radial_4954_1121"
					cx="0"
					cy="0"
					r="1"
					gradientTransform="matrix(-8.82338 -0.0382934 -0.0629107 14.4774 5.65959 15.0378)"
					gradientUnits="userSpaceOnUse"
				>
					<Stop offset="0.314" stopColor="#FF9800" />
					<Stop offset="0.662" stopColor="#FF6D00" />
					<Stop offset="0.972" stopColor="#F44336" />
				</RadialGradient>
				<RadialGradient
					id="paint1_radial_4954_1121"
					cx="0"
					cy="0"
					r="1"
					gradientTransform="matrix(-0.0932482 9.23158 6.94746 0.070167 6.1549 6.25743)"
					gradientUnits="userSpaceOnUse"
				>
					<Stop offset="0.214" stopColor="#FFF176" />
					<Stop offset="0.328" stopColor="#FFF27D" />
					<Stop offset="0.487" stopColor="#FFF48F" />
					<Stop offset="0.672" stopColor="#FFF7AD" />
					<Stop offset="0.793" stopColor="#FFF9C4" />
					<Stop offset="0.822" stopColor="#FFF8BD" stopOpacity={0.804} />
					<Stop offset="0.863" stopColor="#FFF6AB" stopOpacity={0.529} />
					<Stop offset="0.91" stopColor="#FFF38D" stopOpacity={0.209} />
					<Stop offset="0.941" stopColor="#FFF176" stopOpacity={0} />
				</RadialGradient>
			</Defs>
		</Svg>
	)
}
