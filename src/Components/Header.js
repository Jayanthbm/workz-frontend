import React, { Component } from 'react';
import styles from "./Header.module.css"
import image from "../images/sample.jpg"
import * as Cookie from "../utils/Cookie";
import {USER_DETAILS, ACCESS_TOKEN} from "../utils/constant"
const links = [
    {
      text:"Virtual Office"
    },
    {
        text:"My Team"
    }
]
class Header extends Component {
    logoutHandler=()=>{
        Cookie.deleteCookie(USER_DETAILS)
        Cookie.deleteCookie(ACCESS_TOKEN)
        window.location.reload()
    }
    render() {
        return (
            <div className={styles.headerBase}>
                <div className={styles.container}>
                    <div className={styles.logoHolder}>WorkforceZ</div>
                   {this.props.pic && <div className={styles.linkHolder}>
                    {links && links.map(val=> {return(
                        <div className={styles.links}>
                            {val.text}
                        </div>
                    )})}
                    <div className={styles.profileHolder}>
                        <img src={this.props.pic?this.props.pic:image} height="40px" width="40px" style={{borderRadius:"100%"}}/>
                    </div>
                    <div className={styles.links} onClick={this.logoutHandler}>
                            {"Logout"}
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default Header;