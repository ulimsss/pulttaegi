import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../api/firebase";
import BreadCrumb from "../components/common/BreadCrumb";
import { useAppDispatch, useAppSelector } from "../store/hooks/configureStore.hook";
import { deleteData } from "../store/modules/market";
import trashimg from "../assets/icons/trash.png"
function Second() {
  const favoritesCollectionRef = collection(firestore, "favorites");
  const [favorites, setFavorites] = useState<any[]>([]);
  

  useEffect(() => {
    const localId = localStorage.getItem("id");
    const unsubscribe = onSnapshot(favoritesCollectionRef, (snapshot) => {
      const fetchedData = snapshot.docs
        .filter((doc) => doc.data().id === localId)
        .map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
      setFavorites(fetchedData);
    });
    return () => unsubscribe();
  }, []);

  console.log(favorites);

  return (
    <div className="flex flex-col w-full  px-5 py-10  ">
      <BreadCrumb count={favorites.length}>즐겨찾기</BreadCrumb>
      
      {favorites.map((favorite) => {
        return <Component docData={favorite} key={favorite.id} />;
      })}
      
    </div>
  );
  
}


export default Second;

const Component = ({ docData }: { docData: any }) => {
  


  const onDeleteClick = async () => {
    const ok = window.confirm("즐겨찾기를 취소할까요?");
    if (ok) {
      await firestore.doc(`favorites/${docData.id}`).delete(); 
    }
  };
  
  // const LocalId = localStorage.getItem("id");


  console.log (docData)
  return (
    <div className="text-black bg-white flex flex-col mx-5 mt-8">
      <div className="flex flex-col gap-4">
        
        <div className="flex justify-between w-80 items-center   ">
          <div className="flex items-center   gap-8">
            <img className="rounded-full" src={docData.data.img} width="83" />
            <div>
               {docData.data.title}<div>대표 메뉴: {docData.data.menu[0].menuName}</div>
            </div>
          </div>
          <button
            onClick={onDeleteClick } >
           <img src={trashimg}
           alt="backButton"
           className="w-[22px] h-[22px]" />
            
          </button>
        </div>
      </div>
    </div>
  );
};
