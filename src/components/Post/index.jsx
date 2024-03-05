import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment";
import "moment/locale/tr";
import { auth, db } from "../../firebase/config";
import DropDown from "./DropDown";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  //Tweet'i Sil
  const handleDelete = async () => {
    if (confirm("Silme İşlemini Onaylıyor Musunuz?")) {
      const tweetRef = doc(db, "tweets", tweet.id);

      await deleteDoc(tweetRef);
    }
  };

  //Tweet'i Beğenme
  const handleLike = async () => {
    const ref = doc(db, "tweets", tweet.id);
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user-image"
      />

      <div className="w-full ">
        {/* Kullanıcı Bilgileri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray-400">{date}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* Tweet İçeriği */}
        <div className="my-3">
          {isEditMode && (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          )}

          {!isEditMode && tweet.textContent && (
            <p className="my-2">{tweet.textContent}</p>
          )}

          {!isEditMode && tweet.imageContent && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>

        {/* Etkileşim Butonları */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#0044ffa9]">
            <BiMessageRounded />
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#36ab44a8]">
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className="place-items-center flex items-center gap-3 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#ff0059ce]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#97a5a2c6]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
