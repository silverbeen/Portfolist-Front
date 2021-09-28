import React, { useState } from "react";
import {
  BeforeTouching,
  Flower,
  Profile,
  Touching,
} from "../../../util/assets";
import * as S from "./style";
import { PortListType } from "../../../util/interface/main/portListType";
import { Link } from "react-router-dom";

interface Prop {}

const Tag = ({ field }: any) => {
  return <S.Tag>{field}</S.Tag>;
};

const ListItem = ({
  url,
  field,
  title,
  user,
  introduce,
  touching,
  touched,
  id,
}: PortListType) => {
  const [touchingBoolean, setTouchingBoolean] = useState<boolean>(touched);
  const [count, setCount] = useState<number>(touching);

  function CountChangeHandler(count: number) {
    touchingBoolean ? setCount(count - 1) : setCount(count + 1);
  }

  function TextSliceHandler(txt: string, len: number) {
    if (txt.length > len) {
      txt = txt.substr(0, len) + " ...";
    }

    return txt;
  }

  return (
    <S.ListItemWrapper>

      
      <div className="portfoilo-img">
        <img src={Flower} alt="포트폴리오 배너" />
      </div>
      <S.Content touchingBoolean={touchingBoolean}>
        <div className="tag-wrapper">
          <div className="tag">
            {field.map((field, index) => (
              <Tag key={index} field={field} />
            ))}
          </div>
          <div className="touching">
            <img
              src={touchingBoolean ? Touching : BeforeTouching}
              alt="터칭 아이콘"
              onClick={() => {
                console.log(touchingBoolean);
                setTouchingBoolean(!touchingBoolean);
                CountChangeHandler(count);
              }}
            />
            <span>{count === 0 ? "" : count}</span>
          </div>
        </div>
        <div className="title">
          <Link to={`/portfolio/${id}`}>{title}</Link>
          <span>{TextSliceHandler(introduce, 32)}</span>
        </div>
        <div className="user-profile">
          <img src={Profile} alt="사용자의 프로필 사진" />
          <span>
            <strong>{user.name}</strong>님이 포트폴리오
          </span>
        </div>
      </S.Content>
    </S.ListItemWrapper>
  );
};

export default ListItem;
