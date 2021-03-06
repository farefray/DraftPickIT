import React, { Component } from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import { userActions } from "../../../actions";
import Project from "./experience/Project";
import ButtonAdd from "./components/ButtonAdd";
import ButtonSave from "@/pages/components/ButtonSave";
import _ from "lodash";

class Experience extends Component {
  constructor(props) {
    super(props);

    let { projects } = this.props.profileContext.profile;
    if (projects) {
      projects = _.cloneDeep(projects); // avoiding mutating of profile which is in context. Todo better way - P3
    }
    
    this.state = {
      projectsBlocks: projects || [],
      unsaved: false // todo probably warn about unsaved page on route and also move this to HOC
    };
  }

  static propTypes = {
    profileContext: PropTypes.object.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  updateUserProjects = () => {
    this.setState(
      {
        unsaved: false
      },
      () => {
        let { projectsBlocks } = this.state;

        // removing null values from array, in order to save into db, TODO beter way
        projectsBlocks = projectsBlocks.filter(project => {
          return project !== null;
        });

        this.props.profileContext.updateProfileValue(
          "projects",
          projectsBlocks
        );
      }
    );
  };

  removeProject = key => {
    let { projectsBlocks } = this.state;
    delete projectsBlocks[key]; // such deleting creates 'null' record instead, but thats required for animation. Tho, we need to care about that null later.
    // projectsBlocks.splice(key, 1);
    this.setState({ projectsBlocks, unsaved: true });
  };

  addProject = () => {
    const { projectsBlocks } = this.state;
    // We can move this to fabric, TODO P3
    projectsBlocks.push({
      period: "Project time",
      name: "Project name",
      stack: "Tech stack",
      description: "Project description, specialities."
    });

    this.setState({
      projectsBlocks,
      unsaved: true
    });
  };

  editProject = newBlock => {
    const { projectsBlocks } = this.state;

    projectsBlocks[newBlock.props.index][newBlock.props.name] =
      newBlock.newValue;
    this.setState({
      projectsBlocks,
      unsaved: true
    });
  };

  render() {
    let addProjectButton =
      this.props.canEdit && this.state.projectsBlocks.length <= 15 ? (
        <ButtonAdd onClick={this.addProject} />
      ) : (
        <div key="add_button" />
      );

    const { projectsBlocks } = this.state;
    return (
      <div>
        <section id="experience">
          <div className="container animated fadeIn">
            <FlipMove>
              {projectsBlocks.map((blockData, index) => (
                <Project
                  key={index}
                  index={index}
                  canEdit={this.props.canEdit}
                  data={blockData}
                  removeAction={this.removeProject}
                  editAction={this.editProject}
                />
              ))}
              <div className="col-md-4" key="project_buttons">
                {addProjectButton}
              </div>
            </FlipMove>
          </div>
          {!this.state.unsaved || (
            <ButtonSave onClick={this.updateUserProjects} />
          )}
        </section>
      </div>
    );
  }
}

export { Experience };
