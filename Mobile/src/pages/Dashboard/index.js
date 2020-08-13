import React, { useEffect, useState, useCallback } from 'react';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import calculatePrice from '../../utils/calculatePrice';

import {
	Container,
	Title,
	Display,
	Input,
	Button,
	TextButton,
	ResultsArea,
	ResultCard,
	ResultCardHeader,
	ResultCardHeaderText,
	ResultCardText,
	InputErrorArea,
	InputError,
} from './styles';

const Dashboard = () => {
	const [originCode, setOriginCode] = useState([]);
	const [destinyCode, setDestinyCode] = useState([]);
	const [planName, setPlanName] = useState([]);
	const [callTime, setCallTime] = useState('');
	const [resultWithPlan, setResultWithPlan] = useState(Number);
	const [resultWithoutPlan, setResultWithoutPlan] = useState(Number);
	const [showResultField, setShowResultField] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const [selectedOriginCode, setSelectedOrignCode] = useState('0');
	const [selectedDestinyCode, setSelectedDestinyCode] = useState('0');
	const [selectedPlan, setSelectedPlan] = useState('0');

	useEffect(() => {
		try {
			api.get('/locale').then(response => {
				const localeCode = response.data.map(locale => locale.codeLocale);

				setOriginCode(localeCode);
				setDestinyCode(localeCode);
			});
		} catch (err) {
			setErrorMessage('Erro ao buscar os dados');
		}
	}, []);

	useEffect(() => {
		try {
			api.get('/plans').then(response => {
				const plans = response.data.map(plan => plan.namePlan);

				setPlanName(plans);
			});
		} catch (err) {
			setErrorMessage('Erro ao buscar os dados');
		}
	}, []);

	const handleChangeOriginCodeSelected = useCallback(itemValue => {
		setSelectedOrignCode(itemValue);
	}, []);

	const handleChangeDestinyCodeSelected = useCallback(itemValue => {
		setSelectedDestinyCode(itemValue);
	}, []);

	const handleChangePlanSelected = useCallback(itemValue => {
		setSelectedPlan(itemValue);
	}, []);

	const handleChangeText = useCallback(text => {
		setCallTime(text);
	}, []);

	const handleSubmit = useCallback(async () => {
		try {
			const { priceWithPlan, priceWithCallTime } = await calculatePrice(
				selectedOriginCode,
				selectedDestinyCode,
				selectedPlan,
				callTime,
			);

			setErrorMessage(null);
			setShowResultField(true);
			setResultWithPlan(priceWithPlan);
			setResultWithoutPlan(priceWithCallTime);
		} catch (err) {
			setShowResultField(false);
			setErrorMessage('Informe os dados corretamente');
		}
	}, [selectedOriginCode, selectedDestinyCode, selectedPlan, callTime]);

	return (
		<Container>
			<Title>Telzir</Title>
			<Display>
				<Picker
					selectedValue={selectedOriginCode}
					style={{
						height: 50,
						width: 180,
						marginBottom: 12,
						color: '#464646',
						backgroundColor: '#fafafa',
					}}
					onValueChange={handleChangeOriginCodeSelected}
				>
					{originCode.map(code => (
						<Picker.Item key={code} label={code} value={code} />
					))}
				</Picker>

				<Picker
					selectedValue={selectedDestinyCode}
					style={{
						height: 50,
						width: 180,
						marginBottom: 12,
						color: '#464646',
						backgroundColor: '#fafafa',
					}}
					onValueChange={handleChangeDestinyCodeSelected}
				>
					{destinyCode.map(code => (
						<Picker.Item key={code} label={code} value={code} />
					))}
				</Picker>

				<Picker
					selectedValue={selectedPlan}
					style={{
						height: 50,
						width: 180,
						marginBottom: 12,
						color: '#464646',
						backgroundColor: '#fafafa',
					}}
					onValueChange={handleChangePlanSelected}
				>
					{planName.map(plan => (
						<Picker.Item key={plan} label={plan} value={plan} />
					))}
				</Picker>

				<Input
					placeholder="Tempo (em minutos)"
					keyboardType="numeric"
					onChangeText={handleChangeText}
				/>
				<Button onPress={handleSubmit}>
					<TextButton>Buscar</TextButton>
				</Button>
			</Display>

			{showResultField && (
				<ResultsArea>
					<ResultCard cardBackgroundColor="#3c10b9">
						<ResultCardHeader>
							<ResultCardHeaderText>Com o FaleMais</ResultCardHeaderText>
							<Icon name="phone-outgoing" size={21} color="#fff" />
						</ResultCardHeader>
						<ResultCardText>
							R$
							{resultWithPlan.toLocaleString('pt-BR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</ResultCardText>
					</ResultCard>

					<ResultCard cardBackgroundColor="#ff8e05">
						<ResultCardHeader>
							<ResultCardHeaderText>Sem o FaleMais</ResultCardHeaderText>
							<Icon name="phone-missed" size={21} color="#fff" />
						</ResultCardHeader>
						<ResultCardText>
							R$
							{resultWithoutPlan.toLocaleString('pt-BR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</ResultCardText>
					</ResultCard>
				</ResultsArea>
			)}

			{errorMessage && (
				<InputErrorArea>
					<InputError>{errorMessage}</InputError>
				</InputErrorArea>
			)}
		</Container>
	);
};
export default Dashboard;
