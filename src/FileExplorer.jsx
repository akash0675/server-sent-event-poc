import React, { Component } from 'react';
import { Classes, Tree } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';

class FileExplorer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dirTree: null
    }

    this.onNodeClick = this.onNodeClick.bind(this);
    this.onNodeCollapse = this.onNodeCollapse.bind(this);
    this.onNodeExpand = this.onNodeExpand.bind(this);
    this.forEachNode = this.forEachNode.bind(this);
  }

  componentDidMount() {
    let currentComponent = this;
    fetch('/get-dir-tree')
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      currentComponent.setState({ dirTree: json.childNodes });
    });
  }

  onNodeClick(nodeData, _nodePath, event) {
    const originallySelected = nodeData.isSelected;
    if (!event.shiftKey) {
      this.forEachNode(this.state.dirTree, n => (n.isSelected = false));
    }
    if (nodeData.type === 'file') {
      this.props.selectFile(nodeData);
    }
    nodeData.isSelected = originallySelected == null ? true : !originallySelected;
    this.setState({ ...this.state });
    if (nodeData.type === 'file') {
      this.props.selectFile(nodeData);
    }
  }

  onNodeExpand(nodeData) {
    nodeData.isExpanded = true;
    this.setState(this.state);
  }

  onNodeCollapse(nodeData) {
    nodeData.isExpanded = false;
    this.setState(this.state);
  }

  forEachNode(nodes, callback) {
    if(nodes == null) {
      return;
    }
    for(const node of nodes) {
      callback(node);

      this.forEachNode(node.childNodes, callback);
    }
  }

  render() {
    return (
      <div className="file-explorer">
        <div className=""> </div>
      {
        this.state.dirTree &&
        <Tree
          contents={this.state.dirTree}
          onNodeCollapse={this.onNodeCollapse}
          onNodeExpand={this.onNodeExpand}
          onNodeClick={this.onNodeClick}
          className={Classes.ELEVATION_0}
        />
      }
      </div>
    );
  }
}

export default FileExplorer;
