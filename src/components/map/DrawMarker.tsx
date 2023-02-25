import { useEffect } from "react";
import markerdata from "../../data/markerData";
import { useAppSelector } from "../../store/hooks/configureStore.hook";
import { Link, useLocation, useNavigate } from "react-router-dom";

const markersArr: any = [];

// 마커 기능
export const DrawMarker = () => {
  const kakaomaps = useAppSelector((state) => state.kakaomap);

  const market = useAppSelector((state) => state.market);
  const location = useLocation();
  const marketTitle = location.state?.marketTitle;
  const marketAddress = location.state?.marketAddress;
  const navigate = useNavigate();

  useEffect(() => {
    if (market == [] || kakaomaps.map == undefined) {
      return;
    } else if (
      Object.entries(kakaomaps.map).length !== 0 &&
      Object.entries(market).length !== 0
    ) {
      const marketArr = Object.keys(market).map((item) => market[item]);

      //  마커가 지도 위에 표시
      const makeMarker = () => {
        marketArr.forEach((el) => {
          const mar = new window.kakao.maps.Marker({
            //마커가 표시 될 위치
            position: new window.kakao.maps.LatLng(el.lat, el.lng),
            //카테고리 클릭 시 사용 될 제목
            title: el.category,
          });
          if (markersArr.length <= marketArr.length) {
            markersArr.push(mar);
          }
          // console.log(markersArr);
          const content =
            `<div class='wrap customoverlay info bg-white p-4 border-0'>` +
            `<a href="/detail/${el.title}">` +
            `<div class="title text-xl font-bold text-black mb-1">` +
            `${el.title}` +
            `</div>` +
            `<div class="desc">` +
            `<div class="h-2 bg-lime-700 mb-1" style="width:${
              el.taste * 10
            }%"></div>` +
            `<div class="h-2 bg-amber-500 mb-1" style="width:${
              el.clean * 10
            }%"></div>` +
            `<p>${el.calorie} kal` +
            `</p>` +
            `</a>` +
            `</div>`;
          // 마커 클릭 시 인포
          const infowindow = new window.kakao.maps.CustomOverlay({
            content: content, // 인포윈도우에 표시할 내용
            removable: true,
            yAnchor: 1.4,
            position: mar.getPosition(),
          });

          // 마커 클릭 시 보여줄 내용 생성
          window.kakao.maps.event.addListener(mar, "click", function () {
            // 마커 위에 인포윈도우를 표시
            if (infowindow.getMap()) {
              infowindow.setMap(null);
            } else {
              infowindow.setMap(kakaomaps.map);
            }
          });
        });
        addMarker(kakaomaps.map);
      };
      makeMarker();
    }
  }, [kakaomaps, market]);
};

export const addMarker = (kakaomaps: any) => {
  for (let i = 0; i < markersArr.length; i++) {
    markersArr[i].setMap(kakaomaps);
  }
};

export const removeMarker = () => {
  for (let i = 0; i < markersArr.length; i++) {
    markersArr[i].setMap(null);
  }
};

export const filterMarker = (categoryName: string, kakaomaps: object) => {
  console.log(categoryName);
  const removeInfo = document.querySelectorAll(
    ".customoverlay"
  ) as NodeListOf<Element>;

  // console.log(removeInfo);

  for (let i = 0; i < markersArr.length; i++) {
    markersArr[i].setMap(null);
    if (markersArr[i].Gb == categoryName) {
      markersArr[i].setMap(kakaomaps);
    }
  }
};
