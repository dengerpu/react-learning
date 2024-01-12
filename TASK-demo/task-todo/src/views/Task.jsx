import React from 'react'
import { flushSync } from 'react-dom'
import { Button, Tag, Table, Popconfirm, Modal, Form, Input, DatePicker, message } from 'antd';
import '../assets/css/task.scss'
const zero = function zero(text) {
  text = String(text);
  return text.length < 2 ? '0' + text : text;
}
const formatTime = function formatTime(time) {
  let arr = time.match(/\d+/g);
  let [, month, day = '00', hours, minutes = '00'] = arr;
  return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`;
}

class Task extends React.Component {
  /* 表格列的数据 */
  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      align: 'center',
      width: '8%'
    },
    {
      title: '任务描述',
      dataIndex: 'task',
      ellipsis: true,
      width: '50%'
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      width: '10%',
      render: text => +text === 1 ? '未完成' : '已完成'
    },
    {
      title: '完成时间',
      dataIndex: 'time',
      align: 'center',
      width: '15%',
      render: (_, record) => {
        let { state, time, complete } = record;
        if (+state === 2) time = complete;
        return formatTime(time)
      }
    }, 
    {
      title: '操作',
      render: (_, record) => {
        let { id, state } = record;
        return <>
          <Popconfirm
            title="您确定要删除此任务吗"
            onConfirm={this.removeTask.bind(this, id)}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
          
          {
            +state !== 2 ? <Popconfirm title="您确定要完成此任务吗" onConfirm={this.updateTaskState.bind(null, id)}>
              <Button type="link">完成</Button>
            </Popconfirm> : null
          }
        </>
      }
    }
  ]
  state = {
    tableData: [
      {
        "id":1,
        "task":"测试11111111",
        "state":1,
        "time":"2022-12-01 23:59:59",
        "complete":"2022-11-30 18:02:38"
      },
      {
        "id":4,
        "task":"我们一定要好好的把这个案例练习一下！！",
        "state":2,
        "time":"2022-12-01 23:59:59",
        "complete":"2022-11-30 18:02:38"
      }
    ],
    modalVisible: false,  // 弹窗是否显示
    saveTaskconfirmLoading: false, // 提交任务loading
    selectIndex: 0
  }

  // 完整状态切换
  changeIndex = (index) => {
    if(this.state.selectIndex === index) return
    
    // this.setState({selectIndex: index}) 
    // 直接这样 this.state.selectIndex还是原来的值，并未及时改变
    // 如果在这个时候发送请求，获取到的selectIndex还是上一次的值

    // 解决方法1
    // this.setState({selectIndex: index}, () => {
    //   // 发送请求获取数据
    //   console.log(this.state.selectIndex)
    // })

    // 解决方法2
    flushSync(() => {
      this.setState({selectIndex: index})
    });
    console.log(this.state.selectIndex)
  }

  // 删除任务
  removeTask = (id) => {
    console.log(id)
  }

  // 修改任务状态
  updateTaskState = (id) => {
    console.log(id)
  }

  // 提交任务
  saveTask = async () => {
    try {
      // 表单校验
      await this.formRef.validateFields()
      let {task , time} = this.formRef.getFieldsValue();
      time = time.format('YYYY-MM-DD HH:mm:ss');
      this.setState({saveTaskconfirmLoading: true})
      // 向服务器端发送请求
      console.log(task, time)
    }catch (_) {
      message.error('请填写完整信息');
    }
  }

  render() {
    console.log('视图更新')
    let {tableData, modalVisible, saveTaskconfirmLoading, selectIndex} = this.state
    return <div className='task_box'>
      <div className="task_header">
        <h1>TASK OA任务管理系统</h1>
        <Button type="primary" onClick={() => {
          this.setState({
            modalVisible: true
          })
        }}>新增任务</Button>
      </div>
      <div className='task_content'>
        <div className='task_content_header'>
          {['全部', '未完成', '已完成'].map( (item, index) => {
            return <Tag color={selectIndex === index ? '#1677ff' : ''} key={index} onClick={this.changeIndex.bind(null, index)}>{item}</Tag>
          })}
        </div>
        <div className='task_content_table'>
          <Table dataSource={tableData} columns={this.columns}  rowKey="id"/>
        </div>
      </div>
      {/* 新增任务弹出框 */}
      <Modal title="新增任务窗口" open={modalVisible} maskClosable={false} okText="提交信息" onCancel={() => {
        this.setState({
          modalVisible: false
        })
      }} onOk={this.saveTask} confirmLoading={saveTaskconfirmLoading}>
        <Form ref={x => this.formRef = x} layout="vertical" initialValues={{ task: '', time: '' }} validateTrigger="onBlur">
          <Form.Item label="任务描述" name="task" rules={[
            { required: true, message: '任务描述是必填项' }, 
            { min: 6, message: '输入的内容至少6位及以上' }
          ]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="任务预期完成时间" name="time" rules={[
            { required: true, message: '预期完成时间是必填项' }
          ]}>
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  }
}

export default Task;