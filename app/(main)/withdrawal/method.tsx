import {
	MethodScreenHeader,
	PaymentMethodList,
} from '@/components/withdrawal/method'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MethodScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<MethodScreenHeader />
			<PaymentMethodList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
})
