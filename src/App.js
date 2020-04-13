import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css";

import {
  addNewDocument,
  updateDocumentList,
} from "./ApiService";

import { allowedExtensions, documentAnalysis, files } from './constants'

import BGImage from "./775.jpeg";
import Logo from "./logo.png";

import StartOver from "./StartOver";

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

  .upload-btn {
    background-color: #15b4a3;
    color: white;
    border: none;
    margin-right: 8px;
    cursor: pointer;

    input {
      display: none;
    }
  }

  .reset-btn,
  .delete-btn {
    background: white;
    border: 1px solid #e8e8e8;
    margin-right: 8px;
    cursor: pointer;
  }

  .form-title {
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 12px;
    margin: 24px 0 12px;
  }

  .file-container {
    border: 1px solid #e8e8e8;
    padding: 8px;
    height: 355px;
    overflow: auto;
  }

  .uploaded-file-card {
    display: flex;
    align-items: center;
  }

  .failure-icon {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
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
    padding-left: 8px;
  }

  .error-msg {
    font-size: 12px;
    color: red;
    padding-left: 8px;
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

  .analysis-btn {
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
    width: 100%;
    margin-top: 8px;
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

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 32px 24px;
    text-align: center;
  }

  .next-cta {
    height: 32px;
    display: block;
    box-shadow: none;
    border: none;
    border-radius: 4px;
    background-color: #15b4a3;
    color: white;
    padding: 0 16px;
    margin: 8px auto 0;
  }
`;


class AnalysisPage extends React.Component {
  constructor(props) {
    super(props);
       
    this.fileInputRef = React.createRef();
    this.initialState = {
      file: {},
      errorMsg: "",
      disableAnalysisCTA: true,
      showModal: false,
      step: 1,
      selectedFile: null,
    };

    this.state = {
      ...this.initialState
    };
  }
  

  moveToNextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1, showModal: false });
  };

  moveToPreviousStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  openFileDialog = () => {
    this.fileInputRef.current.click();
  };

  onFilesAdded = e => {
    const selectedFile = e.target.files[0];
    this.setState({
      selectedFile,
      loaded: 0,
    })

    if (files) {
      const fileName = selectedFile.name;
      let errorMsg = "";
      if (fileName) {
        const arr = fileName.split(".");
        const docType = arr[arr.length - 1];


        const isSupportedExtention = allowedExtensions.find(
          ext => ext === docType
        );



        if (!!isSupportedExtention) {
          errorMsg = "";
          this.setState({
            file: files,
            disableAnalysisCTA: false,
            errorMsg: errorMsg
          });
        } else {
          errorMsg = "Only doc files allowed";
          this.setState({
            disableAnalysisCTA: true,
            errorMsg: errorMsg
          });
        }

      }
    }
  };

  submitFormData = () => {
    const { selectedFile } = this.state
    const data = new FormData()
    data.append('file', selectedFile)
    console.log(selectedFile)
    addNewDocument(data)
      .then(response => {
        console.log(response);
        this.setState({ showModal: true });
      })
      .catch(err => {
        console.log(err);
      });
    //API call to submit form data
  };

  closeModal = () => this.setState({ showModal: false });

  deleteFile = () => {
    this.setState({ file: {} });

    //API call to delete file
  };

  resetState = () => {
    this.setState({ ...this.initialState });
  };

  renderSuccessModal() {
    const { showModal } = this.state;

    return (
      <StyledModal
        centered
        closable
        maskClosable
        footer={null}
        destroyOnClose
        visible={showModal}
        onCancel={() => this.closeModal()}
      >
        Data uploaded successfully.
        <button onClick={this.moveToNextStep} className="next-cta">
          Next
        </button>
      </StyledModal>
    );
  }

  renderStepOneAnalysis() {
    const { selectedFile, disableAnalysisCTA, errorMsg } = this.state;

    return (
      <Container>
        <Header bgImage={BGImage}>
          <span>
            <img src={Logo} alt="" />
            <span className="container-title">
              <div>DMI</div>
              <div>Driving Mobile Innovations</div>
            </span>
          </span>
        </Header>
        <div className="wrapper">
          <div>
            <div className="actions-wrapper">
              <button onClick={this.openFileDialog} className="upload-btn">
                <input
                  type="file"
                  ref={this.fileInputRef}
                  className="file-input"
                  onChange={this.onFilesAdded}
                  accept="application/.doc,.docx"
                />
                Upload
              </button>
              <button className="delete-btn" onClick={this.deleteFile}>
                Delete
              </button>
              <button className="reset-btn" onClick={this.resetState}>
                Reset
              </button>
            </div>

            <div className="form-title">
              Press any of the above buttons to load a sample form
            </div>

            <div className="file-container">
              <div className="uploaded-file-card">
                {errorMsg ? (
                  <React.Fragment>
                    <div className="failure-icon" />
                    <div className="error-msg">{errorMsg}</div>
                  </React.Fragment>
                ) : selectedFile && selectedFile.name ? (
                  <React.Fragment>
                    <div className="success-icon" />
                    <div className="file-name">{selectedFile.name}</div>
                  </React.Fragment>
                ) : (
                  ""
                )}
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
              onClick={this.submitFormData}
              disabled={disableAnalysisCTA}
              className={disableAnalysisCTA ? "disabled-cta" : "analysis-btn"}
            >
              Analysis
            </button>
          </div>
          {this.renderSuccessModal()}
        </div>
      </Container>
    );
  }

  renderStepTwoStartOver() {
    return (
      <StartOver
        moveToPreviousStep={this.moveToPreviousStep}
        files={files}
        documentAnalysis={documentAnalysis}
      />
    );
  }

  render() {
    const { step } = this.state;

    if (step === 1) return this.renderStepOneAnalysis();
    else return this.renderStepTwoStartOver();
  }
}

export default AnalysisPage;
