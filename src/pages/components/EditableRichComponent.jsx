import React from "react";
import PropTypes from "prop-types";
import Editable from "@/../react-x-editable/dist/editable";
import RichTextEditor from "./RichTextEditor.jsx";
import RichTextRenderer from "./RichTextRenderer";

// This can actually be moved to own repository :)
const EMPTY_RICH_VALUE = '{"blocks":[{"text":""}],"entityMap":{}}';
export default class EditableRichComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : EMPTY_RICH_VALUE,
      name: this.props.name
    };
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
  };  

  handleSubmit = () => {
    const { name, value } = this.state;
    this.props.handleSubmit(name, value);
  };

  onRichFieldEdited = newValue => {
    let { value } = this.state;
    value = newValue;
    this.setState({ value });
  };

  render() {
    const {value} = this.state;
    return (
      <Editable
        name={this.props.name}
        dataType="custom"
        disabled={this.props.disabled}
        value={value}
        handleSubmit={this.handleSubmit}
        onCancel
        display={value => {
          return (
            <RichTextRenderer
              raw={value}
              defaultValue={this.props.defaultValue}
            />
          );
        }}
        customComponent={(props, state) => {
          return (
            <RichTextEditor
              {...props}
              {...state}
              onChange={this.onRichFieldEdited}
              value={this.state.value}
            />
          );
        }}
      />
    );
  }
}
