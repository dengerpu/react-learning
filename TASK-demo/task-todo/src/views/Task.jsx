import React from 'react'
import { flushSync } from 'react-dom'
import { Button, Tag, Table, Popconfirm, Modal, Form, Input, DatePicker, message } from 'antd';
import '../assets/css/task.scss'
import { getTaskList, addTask, removeTask, completeTask } from '../api';


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
      render: text => +text === 1 ? <span style={{color: 'red'}}>未完成</span> : <span style={{color: 'green'}}>已完成</span>
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
    tableData: [], // 表格数据
    modalVisible: false,  // 弹窗是否显示
    saveTaskconfirmLoading: false, // 提交任务loading
    tableLoading: false, // 表格loading
    selectIndex: 0,
    pageInfo: {
      current: 1, // 当前页数
      pageSize: 2, // 每页条数
      showSizeChanger: true, // 显示分页切换器
      showQuickJumper: true, // 显示快速跳转至某页
      pageSizeOptions: [1,2,5,10],
      total: 0,
      showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
      onChange: (page, pageSize) => this.pageChange(page, pageSize)
    }
  }

  // 页码切换事件
  pageChange = (page, pageSize) => {
    console.log('页码发生变化')
    flushSync(() => {
      this.setState({ pageInfo: { ...this.state.pageInfo, current: page, pageSize } });
    })
    // console.log('页码发生变化')
    this.queryData()
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
    // 重置当前页的参数
    flushSync(() => {
      this.setState({ pageInfo: { ...this.state.pageInfo, current: 1 } });
    })
    this.queryData();
  }

  // 获取任务列表
  queryData = async () => {
    let {selectIndex} = this.state;
    this.setState({tableLoading: true})
    try {
      let { code, list, page, total } = await getTaskList(selectIndex, this.state.pageInfo.current, this.state.pageInfo.pageSize);
      if(+code !== 0) { // 0代表获取成功
        list = []
      }
      console.log('请求获取到的数据', list)
      this.setState({
        tableData:list,
        pageInfo: {
          ...this.state.pageInfo,
          current: +page,
          total: +total
        }
      })
    } catch (error) {
      message.error('获取任务列表失败')
    }
    this.setState({tableLoading: false})
  }

  // 删除任务
  removeTask = async (id) => {
    let { code } = await removeTask(id);
    if(+code !== 0) {
      message.error('删除任务失败')
      return
    } else {
      this.queryData()
      message.success('删除任务成功')
    } 
  }

  // 修改任务状态
  updateTaskState = async (id) => {
    let {code} = await completeTask(id);
    if(+code !== 0) {
      message.error('修改任务状态失败')
      return
    } else {
      this.queryData()
      message.success('修改任务状态成功')
    } 
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
      let { code } = await addTask(task, time);
      if(+code !== 0) {
        message.error('添加任务失败');
      } else {
        // 关闭弹框
        this.closeMode();
        // 获取最新的数据
        this.queryData();
        message.success('添加任务成功');
      }
    }catch (_) {
      message.error('请填写完整信息');
    }
    this.setState({saveTaskconfirmLoading: false})
  }

  // 关闭弹框事件
  closeMode = () => {
    this.setState({
      modalVisible: false,
      saveTaskconfirmLoading: false
    })
    this.formRef.resetFields();
  }

  componentDidMount() {
    this.queryData();
    console.log('获取到的表格数据', this.state.tableData)
  }

  render() {
    console.log('视图更新')
    let {tableData, modalVisible, saveTaskconfirmLoading, selectIndex, tableLoading, pageInfo} = this.state
    console.log('分页器的配置', pageInfo)
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
          <Table dataSource={tableData} loading={tableLoading} columns={this.columns}  rowKey="id" pagination={pageInfo}/>
        </div>
      </div>
      {/* 新增任务弹出框 */}
      <Modal title="新增任务窗口" open={modalVisible} maskClosable={false} okText="提交信息" onCancel={this.closeMode} onOk={this.saveTask} confirmLoading={saveTaskconfirmLoading}>
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