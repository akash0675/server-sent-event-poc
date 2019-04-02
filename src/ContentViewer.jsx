import React, { Component } from 'react';

class ContentViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null
    }

    this.eventSource = new EventSource('/stream');
  }

  componentDidMount() {
    this.eventSource.onmessage = e => {
      let eventData = JSON.parse(e.data);
      if (eventData.event === "change" && eventData.filename === this.props.fileInfo.filepath) {
        let currentComponent = this;
        fetch(`/get-file?filepath=${this.props.fileInfo.filepath}`)
        .then(res => {
          if(res.ok) {
            return res.text()
          }
        })
        .then(text => {
          currentComponent.setState({
            content: text
          });
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let currentComponent = this;
    fetch(`/get-file?filepath=${this.props.fileInfo.filepath}`)
    .then(res => {
      if(res.ok) {
        return res.text()
      }
    })
    .then(text => {
      if(prevState.content !== text) {
        currentComponent.setState({
          content: text
        });
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="content-viewer">{this.state.content}</div>
    );
  }
}

export default ContentViewer;
