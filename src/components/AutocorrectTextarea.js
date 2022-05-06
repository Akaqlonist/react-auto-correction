import React from 'react';

class AutocorrectTextarea extends React.Component {
	constructor(props) {
		super(props);
		this.state = { content: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.ref = React.createRef();
	}

	handleChange(e) {
		this.setState({ content: e.target.value }, () => {});
	}

	getWord(pos) {
		const n = this.state.content.substring(pos).match(/^[a-zA-Z0-9-_]+/);
		const p = this.state.content.substring(0, pos).match(/[a-zA-Z0-9-_]+$/);
		if (!p && !n) return '';
		return (p || '') + (n || '');
	}

	handleKeyDown(e) {
		if (e.keyCode === 32) {
			const currentCursor = this.ref.current.selectionStart;
			const currentWord = this.getWord(this.ref.current.selectionStart);

			if (
				currentCursor !== this.state.content.length &&
				this.state.content[currentCursor].match(/[a-z]/i)
			)
				return;

			let newStr = this.state.content;
			let newCursor = currentCursor;
			for (let key in this.props.corrections) {
				if (key === currentWord) {
					newStr =
						newStr.substring(0, currentCursor - currentWord.length) +
						this.props.corrections[key] +
						newStr.substring(currentCursor);
					newCursor =
						currentCursor + this.props.corrections[key].length - key.length;
					break;
				}
			}

			console.log(newStr + 'space');

			this.setState(
				{
					content: newStr,
				},
				() => {
					this.ref.current.selectionEnd = newCursor;
				}
			);
		}
	}

	render() {
		return (
			<div className="text-center">
				<textarea
					data-testid="textarea"
					ref={this.ref}
					rows={10}
					cols={80}
					className="card"
					value={this.state.content}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</div>
		);
	}
}

export default AutocorrectTextarea;
