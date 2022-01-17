import React, { Component } from 'react'
import axios from "axios"

//Connecting to API
const api = axios.create(
    {
        headers: { 'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979' },
        baseURL: 'https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12',
        contentType: 'application/vnd.api+json'
    })

class HtmlForm extends Component 
{
    constructor()
    {
        super();

        this.state = {
            ApiHasConnected: false,
            InputFields: [],
            ModelName: "None",
            QueryStatus: '',
            INPUTVAR1: '',
            INPUTVAR2: '',
            INPUTVAR3: '',
            INPUTVAR4: '',
            INPUTVAR5: '',
            INPUTVAR6: '',
            INPUTVAR7: '',
            INPUTVAR8: '',
            INPUTVAR9: '',
        } 

    }

    //Querying the data
    componentDidMount()
    {
        api.get('/').then(res =>
        {
            console.log(res.data.data.attributes.metadata.attributes)
            console.log(res.data.data.attributes.name)

            if(res)
            {
                this.setState({
                    ApiHasConnected: true,
                    InputFields: res.data.data.attributes.metadata.attributes,
                    ModelName: res.data.data.attributes.name,
                })
            }
            else
            {
                throw(res);
            }
        }).catch(res => {
            //If unsuccessful print error
            console.log("hello: " + res)

            this.setState({
                QueryStatus: res.message
            })
        })
        
    }

    //OnChange function to get latest input value
    getValues = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value});
    }

    //Function to get the final input values
    HandleSubmit = (event) =>{
        event.preventDefault();
        const INPUTVAR1 = this.state.INPUTVAR1;
        const INPUTVAR2 = this.state.INPUTVAR2;
        const INPUTVAR3 = this.state.INPUTVAR3;
        const INPUTVAR4 = this.state.INPUTVAR4;
        const INPUTVAR5 = this.state.INPUTVAR5;
        const INPUTVAR6 = this.state.INPUTVAR6;
        const INPUTVAR7 = this.state.INPUTVAR7;
        const INPUTVAR8 = this.state.INPUTVAR8;
        const INPUTVAR9 = this.state.INPUTVAR9;

        // console.log(INPUTVAR1);
        // console.log(INPUTVAR2);
        // console.log(INPUTVAR3);
        // console.log(INPUTVAR4);
        // console.log(INPUTVAR5);
        // console.log(INPUTVAR6);
        // console.log(INPUTVAR7);
        // console.log(INPUTVAR8);
        // console.log(INPUTVAR9);

        if(INPUTVAR1 != '' && INPUTVAR2 != '' && INPUTVAR3 != '' && INPUTVAR4 != '' && INPUTVAR5 != '' && INPUTVAR6 != '' && INPUTVAR7 != '' && INPUTVAR8 != '' && INPUTVAR9 != '')
        {
            alert("Thank you for your response.");
        }
        else
        {
            alert("Please make sure all input fields are filled in.");
        }
    }

    render()
    {
        var {ApiHasConnected, InputFields, ModelName, QueryStatus} = this.state;

        if(!ApiHasConnected)
        {
            return(
                <div> {QueryStatus} </div>
            );
        }
        else
        {
            return (
                <div  className="mt-4 p-5 max-w-lg mx-auto bg-green-50 rounded-xl shadow-lg shadow-slate-400">
                    <div>Connection successful</div>
                    <h1 className="text-3xl">Model name: {ModelName}</h1><br/>
                    <form action="HtmlForm.js" method="post">
                        {InputFields.map(item => (
                            <div key={item.name}>
                                <label htmlFor={item.name}>
                                    <i>{item.question}</i>
                                </label>
                                <br/>
                                <input onChange={this.getValues} className="hover:shadow-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline" type="text" id={item.name} name={item.name} htmlvalue="Doe"/>
                                <br/>
                                <br/>
                            </div>
                        ))}
                        <div className="grid place-items-center">
                            <button onClick={this.HandleSubmit} type="submit" className="shadow shadow-slate-400 appearance-none border bg-gray-200 hover:shadow-none hover:bg-gray-400 text-2xl py-1 px-3 rounded text-gray-600">Submit</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default HtmlForm