import './App.css';

import React, { useState } from 'react';
import { Layout, theme } from 'antd';

import { InboxOutlined  } from '@ant-design/icons';

import { message, Upload ,Tabs } from 'antd';
import xlsx from 'node-xlsx';

import TabMerge from './tabs/merge'
const { Header, Content, Footer } = Layout;
const { Dragger } = Upload;




const uploadProps = {
  name: 'file',
  multiple: true,
  maxCount: 2,
  listType:"picture",
  className:"upload-list-inline",
  customRequest (options){
    options.onSuccess()
  },
  onChange(info) {
    const { status } = info.file;


    if (status === 'removed') {
      
    }
    if (status === 'done') {
      console.log(info.file, info.fileList);
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(info.file.originFileObj)
      fileReader.onload = function() {
        console.log(1, fileReader.result)
              const workSheetsFromFile = xlsx.parse(fileReader.result);
      console.log(workSheetsFromFile)
      }



      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};




const tabsItems = [

  {
    key: '2',
    label: '表格查重',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: '表格对比',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '1',
    label: '表格合并',
    children: <TabMerge />,
  },
];


const onTabsChange = (key) => {
  // console.log(key);
};





function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="title-logo">表格处理</div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <div
          style={{
            margin: '16px 0 16px',
          }}
        >
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传，最多只能上传2个文件</p>
            {/* <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p> */}
          </Dragger>
        </div>

        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
         <Tabs defaultActiveKey="1" items={tabsItems} onChange={onTabsChange} />



          
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        ©2023 Created by ZWJ
      </Footer>
    </Layout>
  );
}

export default App;
