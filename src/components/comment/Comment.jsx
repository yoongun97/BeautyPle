import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios/api";
import {
  StComment,
  StCommentAuthor,
  StCommentBox,
  StCommentCard,
  StCommentDeleteBtn,
  StCommentInput,
  StDeleteImg,
  StInputBox,
  StInputBtn,
} from "./StyledComment";
import { useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

function Comment({ id }) {
  const { data, isLoading, isError, error } = useQuery(
    ["comments", id],
    async () => {
      const response = await api.get(`/comments?postId=${id}`);
      return response.data;
    }
  );
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.User);
  const changeHandler = (event) => setComment(event.target.value);
  const queryClient = useQueryClient();

  const addMutation = useMutation(
    async (newComment) => {
      await api.post("comments", newComment);
    },
    {
      onSuccess: () => {
        setComment("");
        queryClient.invalidateQueries(["comments", id]);
        // refetchComments(); // 새로운 댓글을 불러와 화면에 반영
      },
    }
  );

  const deleteMutation = useMutation(
    async (id) => {
      if (window.confirm("삭제하시겠습니까??")) {
        await api.delete(`/comments/${id}`);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", id]);
        // refetchComments();
      },
    }
  );

  // const refetchComments = async () => {
  //   const response = await api.get(`/comments?postId=${id}`);
  //   queryClient.setQueryData(["comments", id], response.data);
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <StInputBox>
        <StCommentInput
          type="text"
          value={comment}
          onChange={changeHandler}
        ></StCommentInput>
        <StInputBtn
          onClick={() => {
            if (!user.email) {
              alert("로그인 후에 댓글을 작성할 수 있습니다.");
              navigate("/login");
              return;
            }
            if (!comment.trim()) {
              alert("댓글을 쓴 뒤에 댓글입력을 누를 수 있습니다.");
              return;
            }
            const newComment = {
              author: user.email,
              uid: user.id,
              id: uuid(),
              postId: id,
              content: comment,
            };
            addMutation.mutate(newComment);
          }}
        >
          댓글입력
        </StInputBtn>
      </StInputBox>
      <StCommentBox>
        {data.map((comment) => (
          <StCommentCard key={comment.id}>
            <StComment>{comment.content}</StComment>
            <StCommentAuthor>{comment.author}</StCommentAuthor>
            {comment.author === user.email ? (
              <StCommentDeleteBtn
                onClick={() => {
                  if (!user) {
                    alert("로그인 후에 댓글을 삭제할 수 있습니다.");
                    return;
                  }
                  deleteMutation.mutate(comment.id);
                }}
              >
                <StDeleteImg
                  src="https://cdn-icons-png.flaticon.com/128/1617/1617543.png"
                  alt="댓글 삭제"
                />
              </StCommentDeleteBtn>
            ) : (
              <></>
            )}
          </StCommentCard>
        ))}
      </StCommentBox>
    </>
  );
}
export default Comment;
