import logo from './logo.svg';
import './App.css';
import { Routes } from './route'
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={Routes} />
    </ConfigProvider>
  );
}

export default App;
