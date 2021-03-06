import { Checkbox } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./Company.module.css";
import CompanyTable from "./CompanyTable";
import CreateCompany from "./CreateCompany";
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
    };
  }

  render() {

    return (
      <div>
        <div
          onClick={() => {
            this.setState({ add: !this.state.add });
            this.props.postNewCompany();
          }}
          className={styles.addButton}
        >
          {this.state.add ? "List" : "Add"}
        </div>
        {this.state.add == false && <CompanyTable {...this.props} />}
        {this.state.add && <CreateCompany {...this.props} />}
      </div>
    );
  }
}

export default Company;
