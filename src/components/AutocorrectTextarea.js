import React from 'react';

class AutocorrectTextarea extends React.Component {
	constructor(props) {
		super(props);
		this.state = { content: '' };
		this.ref = React.createRef();
	}

	getWord = (pos) => {
		const { content } = this.state;
		const before = content.substring(0, pos).match(/[!@#$%^&*()a-zA-Z0-9-_]+$/);
		if (!before) return '';
		return before[0];
	};

	handleChange = (e) => {
		this.setState({ content: e.target.value });
	};

	handleKeyDown = (e) => {
		if (e.keyCode === 32) {
			e.preventDefault();
			const currentWord = this.getWord(this.ref.current.selectionStart);

			let newContent = this.ref.current.value;
			let newCursorPos = this.ref.current.selectionStart;

			newContent = newContent.substring(0, newCursorPos) + ' ' + newContent.substring(newCursorPos);
			newCursorPos++;

			if (newCursorPos === newContent.length || !newContent[newCursorPos].match(/[a-z]/i)) {
				for (let key in this.props.corrections) {
					if (key === currentWord) {
						newContent =
							newContent.substring(0, newCursorPos - currentWord.length - 1) +
							this.props.corrections[key] +
							newContent.substring(newCursorPos - 1);
						newCursorPos += this.props.corrections[key].length - key.length;
						break;
					}
				}
			}

			this.setState(
				{
					content: newContent,
				},
				() => {
					this.ref.current.selectionEnd = newCursorPos;
				}
			);
		}
	};

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
