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
      isFileExplorerVisible: window.innerWidth > '480px' ? true : false,
      isAppHeaderVisible: window.innerwidth > '480px' ? false : true
    }

    this.selectFile = this.selectFile.bind(this);
    this.showFileExplorer = this.showFileExplorer.bind(this);
  }

  selectFile(fileInfo) {
    this.setState({ selectedFile: fileInfo });
  }

  toggleFileExplorer() {}

  render() {
    return (
      <div className="App">
        <div className="app-header">
          <button onClick={this.toggleFileExplorer}>press me</button>
        </div>
        <div className="app-container">
          <FileExplorer
            selectFile={this.selectFile}
            isVisible={this.state.isFileExplorerVisible}
          />
          <ContentViewer
            fileInfo={this.state.selectedFile}
          />
        </div>
      </div>
    );
  }
}

export default App;
