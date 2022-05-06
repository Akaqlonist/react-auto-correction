import React from 'react';

class CorrectionList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="text-center">
				<ul style={{ listStyle: 'none' }}>
					{Object.keys(this.props.corrections).map((key, index) => (
						<li key={`correction-item-${index}`}>
							{key}: {this.props.corrections[key]}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default CorrectionList;
