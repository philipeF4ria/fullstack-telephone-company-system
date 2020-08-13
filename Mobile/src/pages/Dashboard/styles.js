import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background: #615f5a;
	padding: 8px;
`;

export const Title = styled.Text`
	font-size: 38px;
	font-family: 'RobotoSlab-Regular';
	color: #fff;

	align-self: center;
`;

export const Display = styled.View`
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
`;

export const Input = styled.TextInput`
	width: 180px;
	height: 50px;
	background: #fafafa;
	color: #6b6b6b;
`;

export const Button = styled.TouchableOpacity`
	width: 140px;
	height: 50px;
	margin-top: 22px;
	background: #fafafa;
	align-items: center;
	justify-content: center;
`;

export const TextButton = styled.Text`
	color: #464646;
	font-size: 18px;
	font-family: 'RobotoSlab-Medium';
`;

export const ResultsArea = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	margin-top: 16px;
`;

export const ResultCard = styled.View`
	width: 180px;
	height: 120px;
	padding: 12px;
	background: ${props => props.cardBackgroundColor || '#464646'};
`;

export const ResultCardHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const ResultCardHeaderText = styled.Text`
	color: #fff;
`;

export const ResultCardText = styled.Text`
	color: #fff;
	font-size: 42px;
	font-family: 'RobotoSlab-Medium';
	align-self: center;
`;

export const InputErrorArea = styled.View`
	align-items: center;
	flex: 1;
`;

export const InputError = styled.Text`
	color: #c53030;
	font-size: 24px;
	font-family: 'RobotoSlab-Regular';
	align-self: center;
`;
