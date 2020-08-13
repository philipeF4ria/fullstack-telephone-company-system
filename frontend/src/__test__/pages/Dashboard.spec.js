import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

describe('Dashboard Page', () => {
	it('should be able to dashboard', () => {
		const { debug } = render(<Dashboard />);

		debug();
	});
});
