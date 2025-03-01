/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import * as S from "./style";
import { imageListType } from "../../../../util/interface/portfolio/portfolioMakeType";
import {
  container_list_modify_atom,
  portfolioModifyList,
} from "../../../../modules/atom/portfolioModify";
import { useRecoilState, useRecoilValue } from "recoil";
import { imgFile } from "../../../../util/api/portfolio/portfolioPost";
import { TrashCan } from "../../../../util/assets";
import { ToastError } from "../../../../hook/toastHook";

const ImageWrapper = ({ identity }: any) => {
  const [containerListModify, setContainerListModify] = useRecoilState(
    container_list_modify_atom
  );
  const portfolioModifyArr = useRecoilValue(portfolioModifyList);
  let jbRandom = Math.random();
  const [imageFile, setImageFile] = useState<any[]>([]);
  const [previewURL, setPreviewURL] = useState<string[]>([]);
  const [imageList, setImageList] = useState<imageListType[]>([
    { isInFile: true, index: 0 + jbRandom },
  ]);

  useEffect(() => {
    if (previewURL.length <= 1) {
      setPreviewURL([
        portfolioModifyArr.container_list[0].container_img_list[identity],
      ]);
    } else {
      return;
    }
  }, []);

  const addImageContainer = (res: string, isComponentMounted: boolean) => {
    //서버에게 post할때 보낼 이미지 리스트 추가
    if (isComponentMounted) {
      setContainerListModify(
        containerListModify.map((value: any, i: number) => {
          if (i === identity) {
            return {
              ...value,
              container_img_list: value.container_img_list.concat(String(res)),
            };
          } else {
            return value;
          }
        })
      );
    } else {
      return;
    }
  };

  useEffect(() => {
    let isComponentMounted = true; //useEffect 메모리 누수를 방지 하기 위한 boolean 값
    if (imageFile.length !== 0) {
      imgFile(imageFile)
        .then((res: any) => {
          addImageContainer(res.data.file, isComponentMounted);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return;
    }
  }, [imageFile]);

  const updateFieldChanged = (item: boolean, index: number) => {
    //isInFile boolean 함수 변경
    let newArr = imageList.map((value: any, i: number) => {
      if (index === value.index) {
        return { ...value, isInFile: item };
      } else {
        return value;
      }
    });
    setImageList(newArr);
  };

  const handleFileOnChange = (e: any, index: number) => {
    //이미지 파일 브리뷰
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImageFile(file);
      setPreviewURL((previewURL: any) => [...previewURL, reader.result]);
      updateFieldChanged(true, index);
    };
    reader.readAsDataURL(file);
  };

  const addImageList = () => {
    //이미지 추가 버튼 기능
    var jbRandom = Math.random();
    setImageList((imageLis: any) => [
      ...imageLis,
      { isInFile: false, index: imageList.length + jbRandom },
    ]);
  };

  const deleteImage = (index: number) => {
    //이미지 삭제 이벤트
    if (imageList.length <= 1) {
      ToastError("이미지는 최소한 1개는 있어야 합니다");
    } else {
      setPreviewURL(
        //프리뷰 url 삭제
        previewURL.filter((item: any, i: number) => {
          return i !== index;
        })
      );
      setImageList(
        //이미지 리스트 삭제
        imageList.filter((item: any, i: number) => {
          return i !== index;
        })
      );
      setContainerListModify(
        //제작에 올라갈 이미지 리스트 삭제
        containerListModify.map((item: any, i: number) => {
          if (i === identity) {
            let newList = item.container_img_list.filter(
              (value: any, filter_index: number) => {
                return filter_index !== index;
              }
            );
            return {
              ...item,
              container_img_list: newList,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

  return (
    <S.ImageWrapper>
      {imageList.map((v: any, index: number) => {
        return (
          <S.ImageContainer key={index}>
            {!v.isInFile ? (
              <>
                <input
                  type="file"
                  id={`input-file${identity}`}
                  style={{ display: "none" }}
                  accept=".jpg, .png, .jpeg, .gif"
                  onChange={(e: any) => {
                    handleFileOnChange(e, v.index);
                  }}
                />
                <label htmlFor={`input-file${identity}`}>이미지 넣기</label>
              </>
            ) : (
              <S.ImageItem key={index}>
                <img src={previewURL[index]} className="PreviewURL" alt="" />
                <img
                  src={TrashCan}
                  onClick={() => {
                    deleteImage(index);
                  }}
                  alt="쓰레기통"
                />
                {v.index + 1 < imageList.length ? (
                  ""
                ) : (
                  <span onClick={addImageList}>이미지 추가</span>
                )}
              </S.ImageItem>
            )}
          </S.ImageContainer>
        );
      })}
    </S.ImageWrapper>
  );
};

export default ImageWrapper;
