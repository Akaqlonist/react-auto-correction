import React from 'react';

class AutocorrectTextarea extends React.Component {

  render() {
    return (
      <div className="text-center">
        <textarea data-testid="textarea" rows={10} cols={80} className="card" />
      </div>
    );
  }
}

export default AutocorrectTextarea;
