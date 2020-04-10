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
    };
  }
  componentDidMount(){
    if(this.props.location.state===undefined){
      this.props.history.push("/");
    }
  }
  handleClick=()=>{
    const reqBody = {
      name:this.state.name,
      companyName:this.state.cname,
      phone: this.state.phone,
      email: this.state.email,
      description:this.state.desc,
      typeRequest: this.props.location.state.type
    };
    if (this.props.postForm) {
      this.props.postForm(reqBody);
      this.setState({
        name: "",
        cname: "",
        phone: "",
        email: "",
        desc: ""
      })
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <HeaderContainer></HeaderContainer>
        <div className={styles.formContainer}>
    <div className={styles.formHeader}>{this.props.location.state && this.props.location.state.type==="Demo"? "Request a Demo" : "Support" }</div>
          <div className={styles.fieldContainer}>
            <label>Name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={(val) => {
                this.setState({ name: val.target.value });
              }}
            ></input>
            <label>Company Name:</label>
            <input
              type="text"
              value={this.state.cname}
              onChange={(val) => {
                this.setState({ cname: val.target.value });
              }}
            ></input>
            <label>Phone:</label>
            <input
              type="text"
              value={this.state.phone}
              onChange={(val) => {
                this.setState({ phone: val.target.value });
              }}
            ></input>
            <label>Email:</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(val) => {
                this.setState({ email: val.target.value });
              }}
            ></input>
               { this.props.location.state && this.props.location.state.type==="Demo" && <><label>Requirement Description:</label>
            <textarea
              value={this.state.desc}
              onChange={(val) => {
                this.setState({ desc: val.target.value });
              }}
            ></textarea></>}
            
          { this.props.location.state && this.props.location.state.type==="Support" && <><label>Issue Description:</label>
            <textarea
              value={this.state.desc}
              onChange={(val) => {
                this.setState({ desc: val.target.value });
              }}
            ></textarea></>}

            <button onClick={this.handleClick}> Submit </button>
            <button onClick={()=>{this.props.history.push("/")}}> Back to login </button>
            {/* {this.state.loginError && (
            <div className={styles.error}>{this.state.loginError}</div>
          )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
