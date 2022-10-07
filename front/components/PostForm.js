import { Button, Form, Input } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  });
  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  //imageInput.current를 통해서 ref={imageInput}인 태그에 접근할 수 있다.

  return (
    <>
      <Form
        style={{ margin: '10px 0 20px' }}
        encType='multipart/form-data'
        onFinish={onSubmit}
      >
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder='무슨 재밌는 일이 있나요?'
        />
        <div>
          <input type='file' multiple hidden ref={imageInput} />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit'>
            짹짹
          </Button>
        </div>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </>
  );
};

export default PostForm;
