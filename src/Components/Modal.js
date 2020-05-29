import React, { Component } from "react";
import styles from "./modal.module.css";
class Modal extends Component {
  render() {
    return (
      <div
        className={this.props.show ? styles.displayBlock : styles.displayNone}
      >
        <section className={styles.modal}>
          {this.props.children}
          <button onClick={this.props.handleClose}>Close</button>
        </section>
      </div>
    );
  }
}

export default Modal;
