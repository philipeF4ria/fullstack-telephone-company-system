import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	display: flex;
	flex: 1;

	flex-direction: column;
`;

export const Title = styled.h1`
	color: #464646;
	opacity: 90%;
	font-size: 36px;
`;

export const FormArea = styled.div`
	display: flex;

	justify-content: center;
`;

export const Form = styled.form`
	display: flex;

	select {
		height: 50px;
		width: 220px;
		padding: 4px;
		color: #464646;
		font-family: 'Roboto Slab', serif;
		border: 1px solid #e6e6e6;
		margin-right: 6px;

		option {
			padding: 8px;
		}
	}

	input {
		height: 50px;
		border: 1px solid #e6e6e6;
		padding: 4px;
		margin-right: 6px;
	}
`;

export const Button = styled.button`
	background: #464646;
	border: 0;
	height: 50px;
	width: 120px;
	transition: background-color 0.2s;

	color: #fff;
	font-weight: 500;

	&:hover {
		background: ${shade(0.2, '#464646')};
	}
`;

export const ResultsArea = styled.div`
	display: flex;
	justify-content: center;

	width: 100%;
`;

export const ResultCard = styled.div`
	display: flex;
	flex-direction: column;

	width: 360px;
	height: 120px;
	margin: 60px 16px 0 0;
	padding: 8px;
	color: #fafafa;
	background: ${props => props.cardBackgroundColor || '#464646'};
	font-size: 18px;

	div {
		display: flex;
		justify-content: space-between;

		width: 100%;

		> strong {
			font-weight: 400;
		}

		svg {
			margin-right: 12px;
		}
	}

	> strong {
		font-size: 32px;
		font-weight: 500;

		margin-top: 16px;
		align-self: center;
	}
`;

export const Error = styled.span`
	display: block;
	margin-top: 16px;
	color: #c53030;
	font-size: 18px;
	font-family: 'Roboto Slab', serif;
	align-self: center;
`;
