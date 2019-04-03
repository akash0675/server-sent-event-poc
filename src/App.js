import React, { Component } from 'react';
import ContentViewer from './ContentViewer';
import FileExplorer from './FileExplorer';
import classnames from 'classnames';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: {},
    }

    this.selectFile = this.selectFile.bind(this);
  }

  selectFile(fileInfo) {
    this.setState({ selectedFile: fileInfo });
  }

  render() {
    return (
      <div className="App">
          <FileExplorer
            selectFile={this.selectFile}
          />
          <ContentViewer
            fileInfo={this.state.selectedFile}
          />
      </div>
    );
  }
}

export default App;
