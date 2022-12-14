import React from 'react';
import {EmployeesCollection} from "../api/EmployeesCollection";

export class EmployeesForm extends React.Component {
    constructor(props) {
        super(props);
        this.saveCurrent = this.saveCurrent.bind(this);
        this.state = {
            obj: props.obj,
            first_name: props.obj.first_name,
            last_name: props.obj.last_name,
            patronymic: props.obj.patronymic,
            address: props.obj.address,
            birthDate: props.obj.birthDate,
            salary: props.obj.salary,
            post: props.obj.post,
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                first_name: props.obj.first_name ? props.obj.first_name : "",
                last_name: props.obj.last_name ? props.obj.last_name : "",
                patronymic: props.obj.patronymic ? props.obj.patronymic : "",
                address: props.obj.address ? props.obj.address : "",
                birthDate: props.obj.birthDate ? props.obj.birthDate : "",
                salary: props.obj.salary ? props.obj.salary : "",
                post: props.obj.post ? props.obj.post : "",
                error: null
            }
        }else{
            return state;
        }
    }

    saveCurrent(event){
        event.preventDefault();

        if(!this.state.first_name || this.state.first_name.length === 0){
            this.setState(old_state => {
                old_state.error = <p>имя не указано</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.last_name || this.state.last_name.length === 0){
            this.setState(old_state => {
                old_state.error = <p>фамилия не указано</p>;
                return old_state;
            })
            return;
        }

        if(!this.state.address || this.state.address.length === 0){
            this.setState(old_state => {
                old_state.error = <p>адресс не указано</p>;
                return old_state;
            })
            return;
        }

        if(!this.state.birthDate || this.state.birthDate.length === 0){
            this.setState(old_state => {
                old_state.error = <p>дата рождения не указано</p>;
                return old_state;
            })
            return;
        }

        const date = new Date(this.state.birthDate);
        if(!(date instanceof Date && !isNaN(date.valueOf()))){
            this.setState(old_state => {
                old_state.error = <p>некоректная дата</p>;
                return old_state;
            })
            return;
        }

        if(!this.state.salary || this.state.salary.length === 0){
            this.setState(old_state => {
                old_state.error = <p>зарплата не указано</p>;
                return old_state;
            })
            return;
        }

        if(!this.state.post || this.state.post.length === 0){
            this.setState(old_state => {
                old_state.error = <p>должность не указано</p>;
                return old_state;
            })
            return;
        }

        EmployeesCollection.update(this.state.obj._id, {
            $set:{
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                patronymic: this.state.patronymic,
                address: this.state.address,
                birthDate: this.state.birthDate,
                salary: this.state.salary,
                post: this.state.post
            }
        }, {upsert: true})
        // TestCollection.update(this.state.obj._id, {
        //     $set: {
        //         text: this.state.text
        //     },
        //
        // },{upsert: true})
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>имя</label>
                <input value={this.state.first_name} onChange={e => {this.setState({first_name: e.target.value})}}/><br/>
                <label>фамилия</label>
                <input value={this.state.last_name} onChange={e => {this.setState({last_name: e.target.value})}}/><br/>
                <label>отчество</label>
                <input value={this.state.patronymic} onChange={e => {this.setState({patronymic: e.target.value})}}/><br/>
                <label>адресс</label>
                <input value={this.state.address} onChange={e => {this.setState({address: e.target.value})}}/><br/>
                <label>дата рождения</label>
                <input value={this.state.birthDate} onChange={e => {this.setState({birthDate: e.target.value})}}/><br/>
                <label>зарплата</label>
                <input value={this.state.salary} onChange={e => {this.setState({salary: e.target.value})}}/><br/>
                <label>должность    </label>
                <input value={this.state.post} onChange={e => {this.setState({post: e.target.value})}}/><br/>
                <input type={"submit"}/>
                {this.state.error}
            </form>
        </div>
    }
}