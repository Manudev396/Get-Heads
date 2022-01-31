import React from 'react';

class Data extends React.Component{

    

    render(){
        return(
            <>
                <label id={this.props.labelId}>{this.props.labelData}</label>
                <input required={this.props.require} type={this.props.inputType} id={this.props.inputId} className="dataforminput" />
            </>
        )
    }
}

export default Data;