import React, { Component } from "react";
import styles from "./modal.module.css";
class Modal extends Component {
  render() {
    return (
      <div
        className={this.props.show ? styles.displayBlock : styles.displayNone}
      >
        <section className={styles.modal}>
          <div onClick={this.props.handleClose} className={styles.closeButton}>
            X
          </div>
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default Modal;
