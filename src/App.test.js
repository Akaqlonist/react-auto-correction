import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, within, fireEvent, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

const testIds = {
	textarea: 'textarea',
};

const CORRECTIONS = {
	xy: 'x',
	y: 'z',
	abc: 'bc',
};

const renderApp = (corrections) => render(<App corrections={corrections} />);

beforeEach(() => {});

afterEach(() => {
	cleanup();
});

test('Test without removing characters', () => {
	const { getByTestId } = renderApp(CORRECTIONS);

	const textarea = getByTestId(testIds.textarea);

	fireEvent.change(textarea, { target: { value: 'ax' } });
	expect(textarea).toHaveValue('ax');

	fireEvent.change(textarea, { target: { value: 'ax' } });
	fireEvent.focus(textarea);
	textarea.setSelectionRange(2, 2);
	fireEvent.keyDown(textarea, { key: ' ', keyCode: 32, which: 32 });
	expect(textarea).toHaveValue('ax ');

	fireEvent.change(textarea, { target: { value: 'ax xy' } });
	expect(textarea).toHaveValue('ax xy');

	fireEvent.change(textarea, { target: { value: 'ax xy' } });
	fireEvent.focus(textarea);
	textarea.setSelectionRange(5, 5);
	fireEvent.keyDown(textarea, { key: ' ', keyCode: 32, which: 32 });
	expect(textarea).toHaveValue('ax x ');

	fireEvent.change(textarea, { target: { value: 'ax x y' } });
	expect(textarea).toHaveValue('ax x y');

	fireEvent.change(textarea, { target: { value: 'ax x y' } });
	fireEvent.focus(textarea);
	textarea.setSelectionRange(6, 6);
	fireEvent.keyDown(textarea, { key: ' ', keyCode: 32, which: 32 });
	expect(textarea).toHaveValue('ax x z ');
});

test('Test with removing characters', () => {
	const { getByTestId } = renderApp(CORRECTIONS);

	const textarea = getByTestId(testIds.textarea);

	fireEvent.change(textarea, { target: { value: 'abcd' } });
	expect(textarea).toHaveValue('abcd');

	fireEvent.change(textarea, { target: { value: 'abcd' } });
	fireEvent.focus(textarea);
	textarea.setSelectionRange(4, 4);
	fireEvent.keyDown(textarea, { key: ' ', keyCode: 32, which: 32 });
	expect(textarea).toHaveValue('abcd ');

	fireEvent.change(textarea, { target: { value: 'abcd' } });
	expect(textarea).toHaveValue('abcd');

	fireEvent.change(textarea, { target: { value: 'abc' } });
	expect(textarea).toHaveValue('abc');

	fireEvent.change(textarea, { target: { value: 'abc' } });
	fireEvent.focus(textarea);
	textarea.setSelectionRange(3, 3);
	fireEvent.keyDown(textarea, { key: ' ', keyCode: 32, which: 32 });
	expect(textarea).toHaveValue('bc ');
});
