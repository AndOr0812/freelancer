import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Calculator extends Component {

    static propTypes = {
        handleAdd: PropTypes.func.isRequired,
        handleSub: PropTypes.func.isRequired,
        handleMul: PropTypes.func.isRequired,
        handleDiv: PropTypes.func.isRequired
    };

    state = {
        number1: '',
        number2: '',
        operate:''
    };

    componentWillMount(){
        this.setState({
            number1: '',
            number2: '',
            operate:''
        });
    }

    /*handleOnClick(op){
        this.setState({operate:op},()=>{this.props.handleSubmit(this.state)})};
*/
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>Calculator</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="number"
                                label="number1"
                                placeholder="Enter Number 1"
                                value={this.state.number1}
                                onChange={(event) => {
                                    this.setState({
                                        number1: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="number"
                                label="number2"
                                placeholder="Enter Number 2"
                                value={this.state.number2}
                                onChange={(event) => {
                                    this.setState({
                                        number2: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleAdd(this.state)}>
                                Add
                            </button>
                            &nbsp;
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSub(this.state)}>
                                Subtract
                            </button>
                            &nbsp;
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleMul(this.state)}>
                                Multiply
                            </button>
                            &nbsp;
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleDiv(this.state)}>
                                Divide
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        );
    }
}

export default Calculator;