import React from "react";
import { connect } from "react-redux";
import { todoActions } from "../../../store/actions";
import { TextField, Button } from '@material-ui/core'


const { addTodo } = todoActions
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    this.state.input && this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <div>
        <TextField
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <Button variant="contained" color="primary" className="add-todo" style={{'marginLeft': '20px'}} onClick={this.handleAddTodo}>
          Add Todo
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(AddTodo);
// export default AddTodo;
