import Head from 'next/head';
import { Checkbox, Form, Input, Button } from 'antd';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, []);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, term);
  }, [password, passwordCheck, term]);

  return (
    <>
      <AppLayout>
        <Head>
          <title>회원가입 | NodeBird</title>
        </Head>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor='user-id'>아이디</label>
            <br />
            <Input name='user-id' value={id} required onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor='user-nick'>닉네임</label>
            <br />
            <Input
              name='user-nick'
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor='user-password'>비밀번호</label>
            <br />
            <Input
              name='user-password'
              type='password'
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor='user-password-check'>비밀번호 체크</label>
            <br />
            <Input
              name='user-password-check'
              type='password'
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
              동의하세요~
            </Checkbox>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type='primary' htmlType='submit'>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;
