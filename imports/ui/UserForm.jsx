import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";

export class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.saveCurrent = this.saveCurrent.bind(this);
        this.createUserCallback = this.createUserCallback.bind(this);

        this.state = {
            obj: props.obj,
            username: props.obj.username,
            password: "",
            password2: "",
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                username: props.obj.username ? props.obj.username : "",
                password: "",
                password2: "",
                error: null
            }
        }else{
            return state;
        }
    }

    createUserCallback(error){
        if(error !== ""){
            this.setState(state => {
                state.error = <p>{error}</p>
                return state;
            })
        }
    }

    saveCurrent(event){
        event.preventDefault();
        if(!this.state.username || this.state.username.length === 0){
            this.setState(state => {
                state.error = <p>не указан логин</p>
                return state;
            })
            return;
        }
        if(!this.state.password || !this.state.password2 || this.state.password.length === 0){
            this.setState(state => {
                state.error = <p>не указан пароль</p>
                return state;
            })
            return;
        }

        if(this.state.password !== this.state.password2){
            this.setState(state => {
                state.error = <p>пароли не совпадают</p>
                return state;
            })
            return;
        }
        if(Object.keys(this.state.obj).length === 0){
            Meteor.call("CreateUser", this.state.username,this.state.password, this.createUserCallback);
        }else{
            Meteor.call("ChangePassword", this.state.username,this.state.password);
        }
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>логин</label>
                <input value={this.state.username} onChange={e => this.setState({username: e.target.value})}/><br/>
                <label>пароль</label>
                <input type={"password"} value={this.state.password} onChange={e => this.setState({password: e.target.value})}/><br/>
                <label>повторение пароля</label>
                <input type={"password"} value={this.state.password2} onChange={e => this.setState({password2: e.target.value})}/><br/>
                <input type={"submit"}/>
            </form>
            {this.state.error}
        </div>
    }
}