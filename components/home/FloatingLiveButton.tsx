import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

type FloatingLiveButtonPosition = 'top-right' | 'bottom-right'

type FloatingLiveButtonProps = {
	position?: FloatingLiveButtonPosition
}

export function FloatingLiveButton({
	position = 'bottom-right',
}: FloatingLiveButtonProps) {
	const insets = useSafeAreaInsets()
	const { width } = useWindowDimensions()

	const handlePress = () => {
		router.push('/live/live-start')
	}

	const TAB_BAR_HEIGHT = 60

	
	const horizontalPadding = width * 0.04 
	const bottomPadding =
		insets.bottom > 0
			? insets.bottom + TAB_BAR_HEIGHT + 6
			: TAB_BAR_HEIGHT + 6 

	const positionStyle =
		position === 'top-right'
			? { top: insets.top + 8, right: Math.max(horizontalPadding, 16) }
			: { right: Math.max(horizontalPadding, 16), bottom: bottomPadding }

	return (
		<Pressable style={[styles.container, positionStyle]} onPress={handlePress}>
			<Svg width='24' height='17' viewBox='0 0 24 17' fill='none'>
				<Path
					d='M16.3636 0C16.653 0 16.9304 0.111942 17.135 0.311199C17.3396 0.510457 17.4545 0.780707 17.4545 1.0625V5.525L23.1415 1.64688C23.2232 1.59105 23.3192 1.55815 23.4188 1.55178C23.5185 1.54541 23.618 1.56581 23.7066 1.61074C23.7951 1.65568 23.8693 1.72344 23.9211 1.80662C23.9728 1.88981 24.0001 1.98524 24 2.0825V14.9175C24.0001 15.0148 23.9728 15.1102 23.9211 15.1934C23.8693 15.2766 23.7951 15.3443 23.7066 15.3893C23.618 15.4342 23.5185 15.4546 23.4188 15.4482C23.3192 15.4418 23.2232 15.409 23.1415 15.3531L17.4545 11.475V15.9375C17.4545 16.2193 17.3396 16.4895 17.135 16.6888C16.9304 16.8881 16.653 17 16.3636 17H1.09091C0.801582 17 0.524105 16.8881 0.31952 16.6888C0.114935 16.4895 0 16.2193 0 15.9375V1.0625C0 0.780707 0.114935 0.510457 0.31952 0.311199C0.524105 0.111942 0.801582 0 1.09091 0H16.3636Z'
					fill='#F9467D'
				/>
				<Path
					d='M6.98182 5.13081C6.88122 5.13079 6.78371 5.16462 6.70578 5.22658C6.62786 5.28854 6.5743 5.37482 6.55418 5.47081L6.54545 5.55475V11.4431C6.54545 11.512 6.5626 11.5797 6.59544 11.6407C6.62828 11.7016 6.67582 11.7539 6.73399 11.793C6.79215 11.8321 6.85919 11.8568 6.92934 11.8651C6.9995 11.8734 7.07066 11.8649 7.13673 11.8405L7.21636 11.8022L11.9673 8.85806C12.0229 8.82354 12.0698 8.77719 12.1043 8.7225C12.1389 8.6678 12.1603 8.60617 12.167 8.54226C12.1736 8.47835 12.1652 8.4138 12.1425 8.35348C12.1199 8.29316 12.0834 8.23864 12.036 8.194L11.9673 8.14087L7.21636 5.19563C7.14598 5.15313 7.06463 5.12996 6.98182 5.13081Z'
					fill='#E4A1B6'
				/>
			</Svg>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#E4A1B6',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 6,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
})
