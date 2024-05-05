import React, { useEffect, useState, useRef } from 'react'
import { Button, Tag, Table, Popconfirm, Modal, Form, Input, DatePicker, message } from 'antd';
import '../assets/css/task.scss'
import { getTaskList, addTask, removeTask, completeTask } from '../api';
import { connect } from 'react-redux';
import action from '../store/actions';


const zero = function zero(text) {
  text = String(text);
  return text.length < 2 ? '0' + text : text;
}
const formatTime = function formatTime(time) {
  let arr = time.match(/\d+/g);
  let [, month, day = '00', hours, minutes = '00'] = arr;
  return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`;
}

const Task = function Task(props) {
  let { taskList,total, queryAllList, deleteTaskById, updateTaskById } = props;
  /* 表格列的数据 */
  const columns = [
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
            onConfirm={deleteTask.bind(this, id)}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
          
          {
            +state !== 2 ? <Popconfirm title="您确定要完成此任务吗" onConfirm={updateTaskState.bind(null, id)}>
              <Button type="link">完成</Button>
            </Popconfirm> : null
          }
        </>
      }
    }
  ]

   // 分页配置信息
   const pageProps = {
    current: 1, // 当前页数
    pageSize: 2, // 每页条数
    showSizeChanger: true, // 显示分页切换器
    showQuickJumper: true, // 显示快速跳转至某页
    pageSizeOptions: [1,2,5,10],
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
    onChange: (page, pageSize) => pageChange(page, pageSize),
    onShowSizeChange: (current, size) => pageChange(current, size),
  }

  let [tableData, setTableData] = useState([]); // 表格数据
  let [pageInfo, setPageInfo] = useState(pageProps); // 分页信息
  let [modalVisible, setModalVisible] = useState(false); // 弹窗是否显示
  let [tableLoading, setTableLoading] = useState(false); // 表格loading
  let [saveTaskconfirmLoading, setSaveTaskconfirmLoading] = useState(false); // 提交任务loading
  let [selectIndex, setSelectIndex] = useState(0); // 选中项的索引


  // let formRef = useRef(null); // 表单ref
  // 这种方式ref = {formRef} 获取实例： formRef.current
 
  // ant-design提供的
   let [formRef] = Form.useForm(); // 表单ref

     // 页面第一次加载，发送请求获取数据
  useEffect(() => {
    queryData();
  }, [])


  // 页码切换事件
  const pageChange = (page, pageSize) => {
    console.log('页码切换或者页面大小发生变化', page, pageSize)
    console.log('页面整体信息', pageInfo)
    setPageInfo({
      ...pageInfo,
      current: page,
      pageSize,
      total: +total
    })
  }

  useEffect(() => {
    queryData()
  }, [pageInfo.current, pageInfo.pageSize, selectIndex])


  // 完整状态切换
  const changeIndex = (index) => {
    setSelectIndex(index);
    setPageInfo((prev) => {
      return {
        ...prev,
        current: 1
      }
    })
  }

  // 获取任务列表
  const queryData = async () => {
    setTableLoading(true)
    try {
      await queryAllList(selectIndex, pageInfo.current, pageInfo.pageSize)
    } catch (error) {
      message.error('获取任务列表失败')
    }
    setTableLoading(false)
  }

  // 依赖于redux中的全部任务 & 选中的状态信息，从全部任务中，筛选出表格需要的数据
  useEffect(() => {
    if(!taskList) {
      setTableData([])
    }
    if(selectIndex !== 0) {
      taskList = taskList.filter(item => +item.state === +selectIndex)
    }
    setTableData(taskList)
    setPageInfo({
      ...pageInfo,
      total: +total
    })
  }, [taskList, selectIndex])



  // 删除任务
  const deleteTask = async (id) => {
    let { code } = await removeTask(id);
    if(+code !== 0) {
      message.error('删除任务失败')
      return
    } else {
      deleteTaskById(id);
      message.success('删除任务成功')
    } 
  }

  // 修改任务状态
  const updateTaskState = async (id) => {
    let {code} = await completeTask(id);
    if(+code !== 0) {
      message.error('修改任务状态失败')
      return
    } else {
      updateTaskById(id);
      message.success('修改任务状态成功')
    } 
  }

  // 提交任务
  const saveTask = async () => {
    try {
      // 表单校验
      await formRef.validateFields()
      let {task , time} = formRef.getFieldsValue();
      time = time.format('YYYY-MM-DD HH:mm:ss');
      setSaveTaskconfirmLoading(true)
      // 向服务器端发送请求
      let { code } = await addTask(task, time);
      if(+code !== 0) {
        message.error('添加任务失败');
      } else {
        // 关闭弹框
        closeMode();
        // 获取最新的数据
        queryData();
        message.success('添加任务成功');
      }
    }catch (_) {
      message.error('请填写完整信息');
    }
    setSaveTaskconfirmLoading(false)
  }

  // 关闭弹框事件
  const closeMode = () => {
    setModalVisible(false)
    setSaveTaskconfirmLoading(false)
    formRef.resetFields();
  }



  return <div className='task_box'>
    <div className="task_header">
      <h1>TASK OA任务管理系统</h1>
      <Button type="primary" onClick={() => {
        setModalVisible(true)
      }}>新增任务</Button>
      </div>
      <div className='task_content'>
        <div className='task_content_header'>
          {['全部', '未完成', '已完成'].map( (item, index) => {
            return <Tag color={selectIndex === index ? '#1677ff' : ''} key={index} onClick={changeIndex.bind(null, index)}>{item}</Tag>
          })}
        </div>
        <div className='task_content_table'>
          <Table dataSource={tableData} loading={tableLoading} columns={columns}  rowKey="id" pagination={pageInfo}/>
        </div>
      </div>
      {/* 新增任务弹出框 */}
      <Modal title="新增任务窗口" open={modalVisible} maskClosable={false} okText="提交信息" onCancel={closeMode} onOk={saveTask} confirmLoading={saveTaskconfirmLoading}>
        <Form form={formRef} layout="vertical" initialValues={{ task: '', time: '' }} validateTrigger="onBlur">
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

export default connect(state => state.task, action.task)(Task);