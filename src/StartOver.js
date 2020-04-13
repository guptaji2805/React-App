import React from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import {getDocumentList} from "./ApiService";

import BGImage from "./775.jpeg";
import Logo from "./logo.gif";

const Container = styled.div`
  background: #e8e8e8;
  padding: 24px;

  .wrapper {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    background: white;
    border: 1px solid rgb(43, 45, 60, 0.1);
    padding: 8px;

    & > div:first-child {
      width: 65%;
    }

    & > div:last-child {
      width: 30%;
    }
  }

  button {
    box-shadow: none;
    border-radius: 4px;
    height: 28px;
    padding: 0 8px;
  }

  .download-btn {
    background-color: #15b4a3;
    color: white;
    border: none;
    margin-right: 8px;
    cursor: pointer;

    input {
      display: none;
    }
  }

  .form-title {
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 12px;
    margin: 24px 0 12px;
  }

  .report-section {
    border: 1px solid #15b4a3;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(21, 180, 163, 0.2);
    height: 355px;
    overflow: auto;
    padding: 8px;
  }

  .report-title {
    font-weight: 600;
    font-size: 16px;
  }

  .files-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .file-card {
    flex: 1 0 33%;
    flex-flow: column;
    max-width: 30%;
    background: white;
    border-radius: 4px;
    border: 1px solid rgb(112, 112, 112, 0.4);
    cursor: pointer;
    padding: 4px;
    margin: 8px;

    span {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .selected-file-card {
    border: 1px solid #15b4a3;
  }

  .success-icon {
    width: 10px;
    height: 10px;
    background: #15b4a3;
    border-radius: 50%;
  }

  .file-name {
    font-size: 12px;
    color: rgb(43, 45, 60, 0.6);
  }

  .blank-header {
    height: 34px;
    background: gainsboro;
    margin-bottom: 16px;
  }

  .analysis-title {
    color: rgb(43, 45, 60, 0.8);
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .analysis-container {
    height: 300px;
    overflow: auto;

    & > div:nth-child(odd) {
      border-bottom: 3px solid cadetblue;
    }

    & > div:nth-child(even) {
      border-bottom: 3px solid darkseagreen;
    }
  }

  .analysis-header {
    display: flex;
    justify-content: space-between;
    color: rgb(43, 45, 60, 0.5);
    font-size: 13px;
    padding: 8px 16px 8px 8px;

    span:first-child {
      width: 85%;
    }

    span:last-child {
      width: 15%;
      text-align: center;
    }
  }

  .analysis-card {
    background: rgb(232, 232, 232, 0.3);
    display: flex;
    justify-content: space-between;
    color: rgb(43, 45, 60, 0.9);
    padding: 8px;
    margin: 0 0 8px;

    span:first-child {
      width: 85%;
    }

    span:last-child {
      width: 15%;
      text-align: center;
    }
  }

  .startover-btn {
    background-color: #15b4a3;
    color: white;
    border: none;
    width: 100%;
    margin-top: 8px;
    cursor: pointer;
  }

  .disabled-cta {
    background-color: rgb(21, 180, 163, 0.3);
    color: white;
    border: none;
    cursor: not-allowed;
  }
`;

const Header = styled.div`
  background-image: url(${props => props.bgImage});
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 100% 200%;
  color: white;
  /* height: 175px; */
  /* line-height: 175px; */
  /* text-align: center; */
  /* font-size: 44px; */
  display: flex;
  padding: 40px;

  & > span {
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .container-title {
    text-align: center;
    margin-left: 56px;

    div:first-child {
      font-size: 44px;
    }

    div:last-child {
      font-size: 32px;
    }
  }
`;

class StartOver extends React.Component {
  state = {
    disableCTA: true,
    selectedFile: {}
  };

  componentDidMount() {

    fetch('')
    getDocumentList()
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }


  setSelectedFile = file => {
    this.setState({ selectedFile: file, disableCTA: false });
  };

  downloadLatestDocument = () => {
    const { selectedFile } = this.state;
    const documentToDownload = selectedFile.document.name;
    console.log(selectedFile);
    window.open(documentToDownload, "target_blank");
  };

  componentDidMount() {
    fetch('')
    getDocumentList()
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { disableCTA, selectedFile } = this.state;
    const { files, documentAnalysis, moveToPreviousStep } = this.props;

    return (
      <Container>
        <Header bgImage={BGImage}>
          <span>
            <img src={Logo} alt="" height ="200" width ="200"/>
            <span className="container-title">
              <div>DMI</div>
              <div>Driving Mobile Innovations</div>
            </span>
          </span>
        </Header>

        <div className="wrapper">
          <div>
            <div className="actions-wrapper">
              <button
                onClick={this.downloadLatestDocument}
                disabled={disableCTA}
                className={disableCTA ? "disabled-cta" : "download-btn"}
              >
                Download
              </button>
            </div>

            <div className="form-title">
              Press any of the above buttons to load a sample form
            </div>

            <div className="report-section">
              <div className="report-title">Report</div>
              <div className="files-wrapper">
                {files.map(file => {
                  const className = `file-card ${
                    selectedFile.id === file.id ? "selected-file-card" : "data"
                  }`;
                  const isSelected = selectedFile.id === file.id;

                  return (
                    <div
                      className={className}
                      onClick={() => this.setSelectedFile(file)}
                    >
                      <span>
                        <span className="file-name">{file.document.name}</span>
                        {isSelected ? <span className="success-icon" /> : null}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="blank-header" />
            <div className="analysis-title">Top Document Analysis</div>

            <div className="analysis-header">
              <span>Document</span>
              <span>Score</span>
            </div>
            <div className="analysis-container">
              {documentAnalysis.map(doc => {
                return (
                  <div className="analysis-card">
                    <span>{doc.document}</span>
                    <span>{doc.score}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => moveToPreviousStep()}
              className="startover-btn"
            >
              StartOver
            </button>
          </div>
        </div>
      </Container>
    );
  }
}

export default StartOver;

