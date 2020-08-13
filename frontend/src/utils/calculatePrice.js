import api from '../services/api';

async function calculatePrice(datas) {
	const { originCode, destinyCode, planName, callTime } = datas;

	const possibleCallsApiResponse = await api.get('/possibleCalls');
	const plansApiResponse = await api.get('/plans');

	const chosenCall = possibleCallsApiResponse.data.find(
		index => index.origin === originCode && index.destiny === destinyCode,
	);

	const findChosenPlan = plansApiResponse.data.find(
		index => index.namePlan === planName,
	);

	const priceWithCallTime = chosenCall.price * Number(callTime);

	const excessTime = Number(callTime) - findChosenPlan.limitTimePlan;

	const priceWithAddition = chosenCall.price * (excessTime * 0.1).toFixed(2);

	const pricePerMinute = excessTime * chosenCall.price;

	const priceWithPlan = priceWithAddition + pricePerMinute;

	return {
		priceWithPlan: excessTime > 0 ? priceWithPlan : 0,
		priceWithCallTime,
	};
}

export default calculatePrice;
