import React, { Component } from 'react';
class App extends Component {
  state = {
    selectedFile: null,
  };

  onFileChange = event => {
    //* Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  //* On file upload (click the upload button)
  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div style={{ marginTop: '1rem' }}>
          <b>File Details:</b>

          {/* <p>File Name: {this.state.selectedFile.name}</p> */}
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{' '}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div>
        <div>
          <input type="file" onChange={this.onFileChange} />
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
