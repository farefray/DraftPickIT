import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import Skill from "./skills/Skill";
import ButtonAdd from "../components/ButtonAdd";

export default class Skills extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      data: data
    };
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  removeSkill = key => {
    let { data } = this.state;
    delete data[key];
    this.update(data);
  };

  update(data) {
    this.setState({
      data
    });

    this.props.onChange(
      this.props.name,
      data.filter(block => {
        return block !== null;
      })
    );
  }

  editSkill = (index, name, newValue) => {
    const { data } = this.state;
    data[index][name] = newValue;
    this.update(data);
  };

  addSkill = () => {
    const { data } = this.state;
    data.push({
      value: "Skill name",
      percent: "Optional description",
      power: 3
    });

    this.update(data);
  };

  render() {
    const { data } = this.state;

    let noResults = !data || !data.length ? true : false;
    return (
      <div>
        <div className="skills">
        <h2>
            {noResults ? <div/> : <div className="animated fadeInDown"><i className="fa fa-trophy" key="mainSkillsHeader"/> Main Skills</div>}
        </h2>
        <FlipMove>
            {data.map((data, index) => (
            <Skill
                key={index}
                index={index}
                canEdit={this.props.canEdit}
                data={data}
                removeAction={this.removeSkill}
                editAction={this.editSkill}
            />
            ))}
            <div key="buttonAddContainer"><ButtonAdd onClick={this.addSkill} entityName="skill" key="addSkills"/></div>
        </FlipMove>
        </div>
      </div>
    );
  }
}