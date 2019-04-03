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
    let currentComponent = this;
    this.eventSource.onmessage = e => {
      let eventData = JSON.parse(e.data);
      console.log(eventData);
      if (eventData.type === 'tail' && eventData.filepath === this.props.fileInfo.filepath) {
        let newContent = this.state.content.concat(eventData.diff)
        currentComponent.setState({ content: newContent });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.fileInfo.filepath !== prevProps.fileInfo.filepath) {
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
  }

  render() {
    return (
      <div className="content-viewer">{this.state.content}</div>
    );
  }
}

export default ContentViewer;
