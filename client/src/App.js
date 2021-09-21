import React, { Component } from "react";

import Report from "./components/report/report.js"
import './App.css';


class App extends Component {

  constructor() {
    super()
    this.state = {
      openReports : [],
      closedReports: []
    }
  }


  /* 
  after component is mounted into the tree, an get-request is sent to the server to get the data
  which is then splitted into the open and closed reports so that it can be shown accordingly
  */
  componentDidMount() {
    fetch('/api/reports')
      .then(res => res.json())
      .then(reports => {
        let openReports = []
        let closedReports = []

        reports.map(report => {
          return report.state === "OPEN" ? openReports.push(report) : closedReports.push(report)
        })

        this.setState({
          openReports,
          closedReports
        })
     })
     .catch(err => console.log(err))
  }

  /*
  if one of the report-buttons gets clicked, the report state gets changed to "CLOSED" and
  a put-request is sent to the server to these changes in the file as well
  */
  takeAction = (id, index) => {
    let {openReports, closedReports} = this.state

    const removedItem = openReports.splice(index, 1)
    removedItem[0].state = "CLOSED"
    closedReports = [...closedReports, removedItem[0]]

    this.setState({
        openReports,
        closedReports
    })

    fetch("/api/reports/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  } 

  render() {
    const {openReports, closedReports} = this.state
    return (

      //only show the reports when the server is running, else show a copy with "empty list"
      <div className="App">
        <p id="title">Classification reports</p>
        <p id="openReportsList">Open reports</p>
        {
          openReports.length === 0 ?
          <p id="reportsSign">No open reports.</p> :

          openReports.map((report, index) => 
            <Report key={report.id} data={report} index={index} takeAction={this.takeAction}/>
        )}

        <p id="closedReportsList">Closed reports</p>
        {
          closedReports.length === 0 ?
          <p id="reportsSign">No resolved reports yet.</p> :

          closedReports.map((report, index) => 
              <Report 
                key={report.id} 
                data={report} 
                index={index}
                closingFlag = {true}
                takeAction={this.takeAction}/>
          )}
        
      </div>
    );
  }
}

export default App;
