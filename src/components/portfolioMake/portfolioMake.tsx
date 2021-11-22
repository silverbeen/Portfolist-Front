import React from "react";
import { Header } from "..";
import * as S from "./style";
import TitleContainer from "./titleContainer/TitleContainer";
import MoreInfoContainer from "./moreInfoContainer/MoreInfoContainer";
import ImageContainerList from "./imageContainerList/ImageContainerList";
import LicenseContainer from "./licenseContainer/LicenseContainer";
import BannerContainer from "./bannerContainer/BannerContainer";

const portfolioMake = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <p className="caution">
          파일 혹은 링크 첨부로 포트폴리오를 업로드하실 경우 제목과 본인 소개를
          필수로 작성해 주세요.
        </p>
        <TitleContainer /> {/* 제목 컴포넌트 */}
        <MoreInfoContainer />
        {/*이메일이나 깃허브 넣는 컴포넌트*/}
        <ImageContainerList /> {/* 자신의 경험을 넣을 수 있는 이미지 리스트 */}
        <LicenseContainer /> {/* 자격증을 넣을 수 있는 리스트 */}
        <BannerContainer />
      </S.MainContainer>
    </>
  );
};

export default portfolioMake;
