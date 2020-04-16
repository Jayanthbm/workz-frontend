import React, { Component } from "react";
import styles from "../Components/form.module.css";
import HeaderContainer from "../Container/HeaderContainer";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cname: "",
      phone: "",
      email: "",
      desc: "",
      error: "",
    };
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/");
    }
  }
  handleClick = () => {
    let name = this.state.name.trim();
    let cname = this.state.cname.trim();
    let phone = this.state.phone.trim();
    let email = this.state.email.trim();
    let desc = this.state.desc.trim();
    const reqBody = {
      name: name,
      companyName: cname,
      phone: phone,
      email: email,
      description: desc,
      typeRequest: this.props.location.state.type,
    };
    if (this.props.postForm) {
      if (
        name.length === 0 &&
        cname.length === 0 &&
        phone.length === 0 &&
        email.length === 0 &&
        desc.length === 0
      ) {
        this.setState({ error: "Form Fields cannot be empty" });
      } else if (name.length === 0) {
        this.setState({ error: "Name cannot be empty" });
      } else if (cname.length === 0) {
        this.setState({ error: "Company Name cannot be empty" });
      } else if (phone.length === 0) {
        this.setState({ error: "Phone cannot be empty" });
      } else if (email.length === 0) {
        this.setState({ error: "Email cannot be empty" });
      } else if (desc.length === 0) {
        this.setState({ error: "Description cannot be empty" });
      } else {
        this.props.postForm(reqBody);
        this.setState({
          name: "",
          cname: "",
          phone: "",
          email: "",
          desc: "",
          error: "",
        });
      }
    }
  };
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <HeaderContainer></HeaderContainer>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            {this.props.location.state &&
            this.props.location.state.type === "Demo"
              ? "Request a Demo"
              : "Support"}
          </div>
          <div className={styles.fieldContainer}>
            {/* <label>Name:</label> */}
            <input
              className={styles.formInput}
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={(val) => {
                this.setState({ name: val.target.value });
              }}
            ></input>
            {/* <label>Company Name:</label> */}
            <input
              type="text"
              placeholder="Company Name"
              className={styles.formInput}
              value={this.state.cname}
              onChange={(val) => {
                this.setState({ cname: val.target.value });
              }}
            ></input>
            {/* <label>Phone:</label> */}
            <input
              type="text"
              placeholder="Phone"
              className={styles.formInput}
              value={this.state.phone}
              onChange={(val) => {
                this.setState({ phone: val.target.value });
              }}
            ></input>
            {/* <label>Email:</label> */}
            <input
              type="email"
              placeholder="Email"
              className={styles.formInput}
              value={this.state.email}
              onChange={(val) => {
                this.setState({ email: val.target.value });
              }}
            ></input>
            {this.props.location.state &&
              this.props.location.state.type === "Demo" && (
                <>
                  {/* <label>Requirement Description:</label> */}
                  <textarea
                    className={styles.formInput}
                    placeholder="Requirement Description"
                    value={this.state.desc}
                    onChange={(val) => {
                      this.setState({ desc: val.target.value });
                    }}
                  ></textarea>
                </>
              )}

            {this.props.location.state &&
              this.props.location.state.type === "Support" && (
                <>
                  {/* <label>Issue Description:</label> */}
                  <textarea
                    className={styles.formInput}
                    placeholder="Issue Description"
                    value={this.state.desc}
                    onChange={(val) => {
                      this.setState({ desc: val.target.value });
                    }}
                  ></textarea>
                </>
              )}
            <button onClick={this.handleClick} className={styles.formButton}>
              {" "}
              Submit{" "}
            </button>
            <button
              className={styles.formButton}
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              {" "}
              Back to login{" "}
            </button>
            {this.state.error && (
              <div className={styles.error}>{this.state.error}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
