import React from 'react'
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
 
class Task extends React.Component {

  render() {
    return <>
      <div>Task组件</div>
      <Button type="primary" icon={<SearchOutlined />}>Search</Button>
    </>
  }
}

export default Task;