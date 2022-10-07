import PropTypes from 'prop-types';
import { Button, Card, Popover, Avatar, Comment } from 'antd';
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PostImages from './PostImages';
import { useCallback, useState } from 'react';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const id = useSelector((state) => state.user.me?.id);
  //me && me.id => me?.id [옵셔널 체이닝 연산자]
  return (
    <>
      <div style={{ marginBottom: 20 }} key={post.id}>
        <Card
          cover={post.Images[0] && <PostImages images={post.Images} />}
          actions={[
            <RetweetOutlined key='retweet' />,
            liked ? (
              <HeartTwoTone
                twoToneColor='#eb2f96'
                key='heart'
                onClick={onToggleLike}
              />
            ) : (
              <HeartOutlined key='heart' onClick={onToggleLike} />
            ),
            <MessageOutlined key='comment' onClick={onToggleComment} />,
            <Popover
              key='more'
              content={
                <Button.Group>
                  {id && post.User.id === id ? (
                    <>
                      <Button>수정</Button>
                      <Button type='danger'>삭제</Button>
                    </>
                  ) : (
                    <Button>신고</Button>
                  )}
                </Button.Group>
              }
            >
              <EllipsisOutlined />
            </Popover>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={post.content}
          />
        </Card>
        {commentFormOpened && (
          <div>
            <CommentForm />
            <List
              header={`${post.Comments.length}개의 댓글`}
              itemLayout='horizontal'
              dataSource={post.Comments}
              rederItem={(item) => (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  />
                </li>
              )}
            />
          </div>
        )}
        {/* <CommentForm />
        <Comments /> */}
      </div>
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
