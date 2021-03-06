import React from "react";
import PropTypes from "prop-types";
import Editable from "@/../react-x-editable/dist/editable";
import EditableRichComponent from "@/pages/components/EditableRichComponent";
import SocialLinks from "./userprofile/SocialLinks";
import CVBlock from "./userprofile/CVBlock";
import Image from "./userprofile/Image";

export default class UserProfile extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      description: PropTypes.any,
      age: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
      country: PropTypes.string,
      email: PropTypes.string,
      cvFile: PropTypes.object
    }).isRequired,
    updateUserProfileValue: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  render() {
    const { profile, canEdit } = this.props;
    const disabledEditing = !canEdit;

    return (
      <div id="userprofile" className="row animated fadeInUp">
        <div className="profile-img">
          <Image
            className="img-responsive"
            alt="profile-images"
            src={profile.photo || "http://placehold.it/360x440"}
          />
          <CVBlock
            username={profile.username}
            canEdit={canEdit}
            cvFile={profile.cvFile}
          />
        </div>
        <div className="about-info">
          <h2>
            {profile.lastName} {profile.firstName}
          </h2>
          <div className="strong-p">
            <Editable
              name="title"
              dataType="text"
              disabled={disabledEditing}
              value={profile.title}
              placement="bottom"
              mode="popup"
              handleSubmit={newBlock =>
                this.props.updateUserProfileValue(
                  newBlock.props.name,
                  newBlock.newValue
                )
              }
            />
          </div>
          <hr />
          <div className="editable-rich-container">
            <EditableRichComponent
              name="description"
              disabled={disabledEditing}
              value={profile.description}
              defaultValue="Describe your profile more detailed."
              handleSubmit={(name, newValue) => {
                return this.props.updateUserProfileValue(name, newValue);
              }}
            />
          </div>
          <div className="info">
            <div className="col-md-6 no-padding-left">
              <ul>
                {(!profile.age && disabledEditing) || (
                  <li>
                    <p className="info-title">Age </p>
                    <span className="info-details">
                      <Editable
                        name="age"
                        dataType="text"
                        disabled={disabledEditing}
                        value={profile.age ? profile.age : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={newBlock =>
                          this.props.updateUserProfileValue(
                            newBlock.props.name,
                            newBlock.newValue
                          )
                        }
                      />
                    </span>
                  </li>
                )}
                {(!profile.country && disabledEditing) || (
                  <li>
                    <p className="info-title">Country </p>
                    <span className="info-details">
                      <Editable
                        name="country"
                        dataType="text"
                        disabled={disabledEditing}
                        value={profile.country ? profile.country : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={newBlock =>
                          this.props.updateUserProfileValue(
                            newBlock.props.name,
                            newBlock.newValue
                          )
                        }
                      />
                    </span>
                  </li>
                )}
                {(!profile.email && disabledEditing) || (
                  <li>
                    <p className="info-title">Email </p>
                    <span className="info-details">
                      <Editable
                        name="email"
                        dataType="text"
                        disabled={disabledEditing}
                        value={profile.email ? profile.email : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={newBlock =>
                          this.props.updateUserProfileValue(
                            newBlock.props.name,
                            newBlock.newValue
                          )
                        }
                      />
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-6 no-padding-left">
              <ul>
                <li>
                  <p className="info-title">Phone </p>
                  <span className="info-details">
                    <Editable
                      name="phone"
                      dataType="text"
                      disabled={disabledEditing}
                      value={profile.phone ? profile.phone : "-"}
                      placement="bottom"
                      mode="popup"
                      handleSubmit={newBlock =>
                        this.props.updateUserProfileValue(
                          newBlock.props.name,
                          newBlock.newValue
                        )
                      }
                    />
                  </span>
                </li>
                <li>
                  <p className="info-title">Website </p>
                  <span className="info-details">
                    <Editable
                      name="website"
                      dataType="text"
                      disabled={disabledEditing}
                      value={profile.website ? profile.website : "-"}
                      placement="bottom"
                      mode="popup"
                      handleSubmit={newBlock =>
                        this.props.updateUserProfileValue(
                          newBlock.props.name,
                          newBlock.newValue
                        )
                      }
                    />
                  </span>
                </li>
              </ul>
            </div>
            <SocialLinks
              github={profile.github}
              facebook={profile.facebook}
              linkedin={profile.linkedin}
            />
          </div>
        </div>
      </div>
    );
  }
}
