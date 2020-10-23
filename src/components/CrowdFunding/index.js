import React, { Component } from "react";
import Utils from "../../utils";
import "./CrowdFunding.scss";


/// La direccion de su contrato acá ///////////////////////////////////
const contractAddress = "TQdVp5TijWLXZc5mGNiM1Sc9qGu5QcnFB4";
///////////////////////////////////////////////////////////////////////

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.deposit = this.deposit.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
  };


  async deposit() {

    var loc = document.location.href;
    if(loc.indexOf('?')>0){
        var getString = loc.split('?')[1];
        var GET = getString.split('&');
        var get = {};
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        if (get['ref'].length === 34) {
          document.getElementById('sponsor').value = get['ref'];
          if (get['owner']) {
            document.getElementById('tarifa').value = 1;
          }
        }else{
           document.getElementById('sponsor').value = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
        }
    }else{
        document.getElementById('sponsor').value = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'; 
    }

    let amount = document.getElementById("amount").value;
    let sponsor = document.getElementById("sponsor").value;
    let tarifa = document.getElementById("tarifa").value;

    document.getElementById("amount").value = "";
  
    return Utils.contract.deposit(tarifa, sponsor).send({
      shouldPollResponse: true,
      callValue: amount * 1000000 // converted to SUN
    });
    
  };

  render() {
    
    return (
      
      <div className="card wow bounceInUp">
          <i className="fa fa-diamond"></i>
        <div className="card-body">
          <h5 className="card-title">Gold Premium</h5>
          <h6 className="card-text">
            Return: <strong>200%</strong><br></br>
            <strong>2%</strong> per day<br></br>
          </h6>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="amount" placeholder="Min. 200 TRX"></input>
                <p className="card-text">Deberías tener ~3 TRX para hacer la transacción</p>
              </div>
            </form>
          <button type="button" class="btn btn-light" onClick={() => this.deposit()}>Invest</button>
          
        </div>
      </div>
        



    );
  }
}