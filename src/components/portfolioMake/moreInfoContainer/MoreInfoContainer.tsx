import React, { useEffect, useState } from "react";
import * as S from "./style";
import { PlusButton, MinusButton } from "../../../util/assets";

const MoreInfoContainer = () => {
  const [dataArr, setDataArr] = useState<any>([
    { id: "10", name: "", content: "" },
  ]);

  useEffect(() => {
    console.log(dataArr);
  }, [dataArr]);

  let lastId = 0;

  const newId = (prefix: number, num: number) => {
    if (num === 1) {
      lastId++;
    }
    return `${prefix}${lastId}`;
  };

  const handlerOnChange = (event: any) => {
    //input value 넣을 배열 찾아서 넣기
    let parentClassNameId = event.target.parentElement.className.split(" ");
    let eventNodeId = event.target.id;
    let eventTargetValue = event.target.value;
    setDataArr(
      dataArr.map((dataArr: any) => {
        if (String(dataArr.id) === String(parentClassNameId[0])) {
          if (eventNodeId === "inputName") {
            return { ...dataArr, name: eventTargetValue };
          } else {
            return { ...dataArr, content: eventTargetValue };
          }
        } else {
          return dataArr;
        }
      })
    );
  };

  const AddData = () => {
    //빈 input 추가 하는 함수
    setDataArr((dataArr: any) => [
      ...dataArr,
      { id: newId(dataArr.length + 1, 0), name: "", content: "" },
    ]);
  };

  const DeleteData = (id: any) => {
    //특정 input 삭제
    setDataArr(
      dataArr?.filter((arrItem: any) => {
        return arrItem.id !== id.id;
      })
    );
  };

  return (
    <S.MainWrapper className="make-container">
      <div className="titleWrapper">
        <h1>본인의 추가 정보를 입력해 주세요. ex) 학력 / 연락처 / 이메일</h1>
        <img src={PlusButton} alt="" onClick={AddData} />
      </div>
      <div className="infoContainer">
        {dataArr.map((dataArr: any, index: number) => {
          return (
            <S.InputBox
              key={index}
              onChange={handlerOnChange}
              className={newId(index + 1, 0)}
            >
              <input
                type="text"
                id="inputName"
                placeholder="ex)email"
              />
              <div></div>
              <input
                type="text"
                id="inputContent"
                placeholder="ex)kub0803@gmail.com"
              />
              <img
                src={MinusButton}
                alt=""
                onClick={() => {
                  DeleteData(dataArr);
                }}
              />
            </S.InputBox>
          );
        })}
      </div>
    </S.MainWrapper>
  );
};

export default MoreInfoContainer;
