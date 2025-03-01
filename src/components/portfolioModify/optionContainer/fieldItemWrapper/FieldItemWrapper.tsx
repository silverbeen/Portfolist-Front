/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getFieldSelector } from "../../../../modules/atom/portfolio";
import { CloseIcon } from "../../../../util/assets";
import { ToastError } from "../../../../hook/toastHook";
import "react-toastify/dist/ReactToastify.css";
import * as S from "./style";
import { portfolioModifyList } from "../../../../modules/atom/portfolioModify";

const FieldItemWrapper = () => {
  const fieldList = useRecoilValue(getFieldSelector);
  const [portfolioModifyArr, setPortfolioModifyArr] =
    useRecoilState(portfolioModifyList);
  const [selectIdList, setSelectIdList] = useState<number[]>([]);

  useEffect(() => {
    setSelectIdList(portfolioModifyArr.field);
  }, []);

  useEffect(() => {
    setPortfolioModifyArr({
      ...portfolioModifyArr,
      field: selectIdList,
    });
  }, [selectIdList]);

  const handleSelect = (e: any) => {
    const { value } = e.target;
    if (selectIdList.length !== 3) {
      if (!selectIdList.includes(value)) {
        setSelectIdList([...selectIdList, value]);
      } else {
        ToastError("같은 분야를 2개 이상 등록할 수 없습니다.");
      }
    } else {
      ToastError("분야를 3개 이상 등록할 수 없습니다.");
    }
  };

  const deleteFieldItem = (index: number) => {
    setSelectIdList(
      selectIdList.filter((item: any, i: number) => {
        return index !== i;
      })
    );
  };

  return (
    <S.MainContainer>
      <S.FieldItemWrapper>
        <select
          defaultValue={100}
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <option value={100} disabled hidden>
            분야를 선택해주세요.
          </option>
          {fieldList.map((item: any, index: number) => {
            return (
              <option key={index} value={item.id}>
                {item.content}
              </option>
            );
          })}
        </select>
        {selectIdList.map((item: any, index: number) => {
          return (
            <S.FieldItemContainer key={index}>
              <span>{fieldList[item - 1].content}</span>
              <img
                src={CloseIcon}
                alt="닫기 아이콘"
                onClick={() => {
                  deleteFieldItem(index);
                }}
              />
            </S.FieldItemContainer>
          );
        })}
      </S.FieldItemWrapper>
    </S.MainContainer>
  );
};

export default FieldItemWrapper;
