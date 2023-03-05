import React from "react";
import { targetReviewsType } from "../../pages/Detail";

interface reviewListProps {
  reviewList: Array<targetReviewsType>;
}

const ReviewList = ({ reviewList }: reviewListProps) => {
  const showStar = (num: number, color: number) => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(
        <img
          key={i}
          src={`../../src/assets/icons/star-${color}.png`}
          alt="score"
          style={{ width: "16px", height: "16px" }}
        ></img>
      );
    }
    return result;
  };

  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden mb-16 shadow-lg">
      <ul className="flex p-4 pt-2 pb-5 flex-col gap-2 bg-gray-100">
        <span className="block text-xl font-bold text-green-4">REVIEW</span>
        <div className="flex flex-col gap-3">
          {reviewList &&
            reviewList.map((item: targetReviewsType, index: number) => {
              return (
                <div
                  key={index}
                  className="flex w-full h-[120px] bg-white rounded-md shadow-sm"
                >
                  <div className="flex flex-col justify-between my-2 mt-3 mx-4">
                    <div className="block w-[280px] font-semibold text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.content}너무너무너무너 맛있고 친절해요
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col w-3/4">
                        <div className="flex gap-3 items-center text-base">
                          웰빙
                          <div className="flex gap-1">
                            {showStar(item.rating.welbeing, 1)}
                          </div>
                          <span className="block text-[14px] text-gray-500">
                            {item.rating.welbeing}
                          </span>
                        </div>
                        <div className="flex gap-3 items-center text-base">
                          맛
                          <div className="flex gap-1">
                            {showStar(item.rating.taste, 2)}
                          </div>
                          <span className="block text-[14px] text-gray-500">
                            {item.rating.taste}
                          </span>
                        </div>
                        <div className="flex gap-3 items-center text-base">
                          위생
                          <div className="flex gap-1">
                            {showStar(item.rating.sanitation, 3)}
                          </div>
                          <span className="block text-[14px] text-gray-500">
                            {item.rating.sanitation}
                          </span>
                        </div>
                      </div>
                      <div className="flex mb-2 items-end whitespace-nowrap text-gray-400 text-sm">
                        {item.userid}님
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </ul>
    </div>
  );
};

export default ReviewList;
