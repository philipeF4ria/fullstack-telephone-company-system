import React, { useState, useEffect, useCallback } from 'react';
import { FiPhoneOutgoing, FiPhoneMissed } from 'react-icons/fi';

import api from '../../services/api';
import calculatePrice from '../../utils/calculatePrice';

import {
	Container,
	Title,
	FormArea,
	Form,
	Button,
	ResultsArea,
	ResultCard,
	Error,
} from './styles';

const Dashboard = () => {
	const [originCode, setOriginCode] = useState([]);
	const [destinyCode, setDestinyCode] = useState([]);
	const [planName, setPlanName] = useState([]);
	const [resultWithPlan, setResultWithPlan] = useState(Number);
	const [resultWithoutPlan, setResultWithoutPlan] = useState(Number);
	const [showResultField, setShowResultField] = useState(false);
	const [inputError, setInputError] = useState('');

	const [selectDatas, setSelectDatas] = useState({
		originCode: '',
		destinyCode: '',
		planName: '',
		callTime: '',
	});

	useEffect(() => {
		try {
			api.get('/locale').then(response => {
				const getLocaleCode = response.data.map(locale => locale.codeLocale);

				setOriginCode(getLocaleCode);
				setDestinyCode(getLocaleCode);
			});
		} catch (err) {
			setInputError('Ocorreu um erro ao buscar os dados');
		}
	}, []);

	useEffect(() => {
		try {
			api.get('/plans').then(response => {
				const selectedPlanName = response.data.map(plan => plan.namePlan);

				setPlanName(selectedPlanName);
			});
		} catch (err) {
			setInputError('Ocorreu um erro ao buscar os dados');
		}
	}, []);

	const handleSelectDatas = useCallback(
		event => {
			const { name, value } = event.target;

			setSelectDatas({ ...selectDatas, [name]: value });
		},
		[selectDatas],
	);

	const handleSubmit = useCallback(
		async event => {
			event.preventDefault();

			try {
				const { priceWithPlan, priceWithCallTime } = await calculatePrice(
					selectDatas,
				);

				setInputError('');
				setShowResultField(true);
				setResultWithPlan(priceWithPlan);
				setResultWithoutPlan(priceWithCallTime);
			} catch (err) {
				setShowResultField(false);
				setInputError('Informe os dados corretamente');
			}
		},
		[selectDatas],
	);

	return (
		<Container>
			<Title>Telzir</Title>
			<FormArea>
				<Form onSubmit={handleSubmit}>
					<select
						name="originCode"
						value={selectDatas.originCode}
						onChange={handleSelectDatas}
					>
						<option value="0">Selecione o código de origem</option>
						{originCode.map(code => (
							<option key={code} value={code}>
								{code}
							</option>
						))}
					</select>

					<select
						name="destinyCode"
						value={selectDatas.destinyCode}
						onChange={handleSelectDatas}
					>
						<option value="0">Selecione o código de destino</option>
						{destinyCode.map(code => (
							<option key={code} value={code}>
								{code}
							</option>
						))}
					</select>

					<select
						name="planName"
						value={selectDatas.planName}
						onChange={handleSelectDatas}
					>
						<option value="0">Selecione o plano</option>
						{planName.map(name => (
							<option key={name} value={name}>
								{name}
							</option>
						))}
					</select>

					<input
						name="callTime"
						value={selectDatas.callTime}
						type="string"
						placeholder="Tempo (em minutos)"
						onChange={handleSelectDatas}
					/>

					<Button type="input" onClick={handleSubmit}>
						Buscar
					</Button>
				</Form>
			</FormArea>

			{showResultField && (
				<ResultsArea>
					<ResultCard cardBackgroundColor="#3c10b9">
						<div>
							<strong>Com o FaleMais</strong>
							<FiPhoneOutgoing size={22} />
						</div>
						<strong>
							R$
							{resultWithPlan.toLocaleString('pt-BR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</strong>
					</ResultCard>

					<ResultCard cardBackgroundColor="#ff8e05">
						<div>
							<strong>Sem o FaleMais</strong>
							<FiPhoneMissed size={22} />
						</div>
						<strong>
							R$
							{resultWithoutPlan.toLocaleString('pt-BR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</strong>
					</ResultCard>
				</ResultsArea>
			)}

			{inputError && <Error>{inputError}</Error>}
		</Container>
	);
};

export default Dashboard;
