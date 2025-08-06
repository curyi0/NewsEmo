import { Modal, Input } from "antd";


const Login = ( {open, onclose}) => {
  return (    
    <>
    <Modal
      title="로그인"
      open={open}
      onCancel={onclose}
      footer={null}
    >

      {/* <input type='text' placeholder='이메일'></input>  <br />
      <input type="text"  placeholder='비밀번호' security=''></input> */}
      <Input placeholder="아이디" style={{marginBottom:10}}/>
      <Input.Password placeholder="pwd" style={{marginBottom:10}}/>

      <button  onClick={onclose}>로그인하기</button>
    </Modal>
    </>  
  )
}

export default Login
